import { db } from "@/mocks/db";
import { apiError } from "@/mocks/http";

export function parseBearerToken(authorizationHeader: string | null): string | null {
  if (!authorizationHeader) {
    return null;
  }

  if (!authorizationHeader.startsWith("Bearer ")) {
    return null;
  }

  return authorizationHeader.slice("Bearer ".length);
}

export function accessTokenToUserId(accessToken: string | null): number | null {
  if (!accessToken) {
    return null;
  }

  const segments = accessToken.split("-");
  const parsed = Number(segments[1]);
  if (Number.isNaN(parsed)) {
    return null;
  }

  const exists = db.users.some((user) => user.id === parsed);
  return exists ? parsed : null;
}

export function requireUserIdFromAuthHeader(authorizationHeader: string | null, path: string): number | Response {
  const token = parseBearerToken(authorizationHeader);
  const userId = accessTokenToUserId(token);
  if (!userId) {
    return apiError(401, "UNAUTHORIZED", "인증이 필요합니다.", path);
  }

  return userId;
}
