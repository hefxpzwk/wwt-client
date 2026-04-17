import { API_BASE_URL } from "@/lib/config";
import { ApiError, type ApiErrorPayload, shouldAttemptRefresh, shouldLogoutOnRefreshError } from "@/lib/errors";
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from "@/features/auth/model/token-store";

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

type RequestOptions = {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  requiresAuth?: boolean;
  skipRefresh?: boolean;
};

async function parseJsonSafely(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

function toApiError(payload: unknown, response: Response, path: string): ApiError {
  const fallback: ApiErrorPayload = {
    statusCode: response.status,
    code: response.status === 401 ? "UNAUTHORIZED" : "INTERNAL_SERVER_ERROR",
    message: "요청 처리 중 오류가 발생했습니다.",
    timestamp: new Date().toISOString(),
    path
  };

  if (payload && typeof payload === "object") {
    const parsed = payload as Partial<ApiErrorPayload>;
    return new ApiError({
      statusCode: parsed.statusCode ?? fallback.statusCode,
      code: parsed.code ?? fallback.code,
      message: parsed.message ?? fallback.message,
      timestamp: parsed.timestamp ?? fallback.timestamp,
      path: parsed.path ?? fallback.path
    });
  }

  return new ApiError(fallback);
}

async function refreshTokens(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    clearTokens();
    return false;
  }

  const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ refreshToken })
  });

  const payload = await parseJsonSafely(response);

  if (!response.ok) {
    const error = toApiError(payload, response, "/auth/refresh");
    if (shouldLogoutOnRefreshError(error.code)) {
      clearTokens();
    }

    return false;
  }

  const parsed = payload as { accessToken: string; refreshToken: string };
  if (!parsed?.accessToken || !parsed?.refreshToken) {
    clearTokens();
    return false;
  }

  setTokens({ accessToken: parsed.accessToken, refreshToken: parsed.refreshToken });
  return true;
}

export async function http<TResponse>(path: string, options: RequestOptions = {}): Promise<TResponse> {
  const method = options.method ?? "GET";
  const headers: Record<string, string> = {
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...options.headers
  };

  if (options.requiresAuth) {
    const accessToken = getAccessToken();
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  const payload = await parseJsonSafely(response);

  if (response.ok) {
    return payload as TResponse;
  }

  const error = toApiError(payload, response, path);

  if (!options.skipRefresh && shouldAttemptRefresh(error.statusCode, error.code)) {
    const refreshed = await refreshTokens();
    if (refreshed) {
      return http<TResponse>(path, { ...options, skipRefresh: true });
    }
  }

  throw error;
}
