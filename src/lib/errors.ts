export type ApiErrorCode =
  | "INVALID_EMAIL_CODE_REQUEST_EMAIL"
  | "INVALID_SIGNUP_EMAIL"
  | "INVALID_SIGNUP_PASSWORD"
  | "INVALID_SIGNUP_NICKNAME"
  | "INVALID_LOGIN_EMAIL"
  | "MISSING_LOGIN_PASSWORD"
  | "MISSING_EMAIL_VERIFICATION_TOKEN"
  | "INVALID_EMAIL_CODE"
  | "EXPIRED_EMAIL_CODE"
  | "INVALID_EMAIL_VERIFICATION_TOKEN"
  | "EXPIRED_EMAIL_VERIFICATION_TOKEN"
  | "USED_EMAIL_VERIFICATION_TOKEN"
  | "EMAIL_VERIFICATION_EMAIL_MISMATCH"
  | "INVALID_PRODUCTS_PAGE"
  | "INVALID_PRODUCTS_LIMIT"
  | "INVALID_SEARCH_STATUS"
  | "INVALID_SEARCH_MIN_PRICE"
  | "INVALID_SEARCH_MAX_PRICE"
  | "INVALID_SEARCH_PRICE_RANGE"
  | "MISSING_PRODUCT_TITLE"
  | "INVALID_PRODUCT_PRICE"
  | "INVALID_PRODUCT_IMAGE_URLS"
  | "MISSING_CHAT_PRODUCT_ID"
  | "MISSING_CHAT_RECEIVER_ID"
  | "INVALID_CHAT_RECEIVER_ID"
  | "INVALID_PRODUCT_STATUS"
  | "INVALID_TRADE_REQUEST_STATUS"
  | "INVALID_CHAT_MESSAGE"
  | "UNAUTHORIZED"
  | "INVALID_CREDENTIALS"
  | "INVALID_REFRESH_TOKEN"
  | "EXPIRED_REFRESH_TOKEN"
  | "REFRESH_TOKEN_REUSE_DETECTED"
  | "FORBIDDEN"
  | "USER_NOT_FOUND"
  | "PRODUCT_NOT_FOUND"
  | "TRADE_REQUEST_NOT_FOUND"
  | "CHAT_ROOM_NOT_FOUND"
  | "CHAT_MESSAGE_NOT_FOUND"
  | "EMAIL_ALREADY_EXISTS"
  | "DUPLICATE_PENDING_TRADE_REQUEST"
  | "SELF_TRADE_NOT_ALLOWED"
  | "PRODUCT_ALREADY_SOLD"
  | "INTERNAL_SERVER_ERROR"
  | "BAD_GATEWAY"
  | "SERVICE_UNAVAILABLE"
  | "GATEWAY_TIMEOUT";

export type ApiErrorPayload = {
  statusCode: number;
  code: ApiErrorCode | string;
  message: string;
  timestamp: string;
  path: string;
};

export class ApiError extends Error {
  readonly statusCode: number;
  readonly code: string;
  readonly path: string;
  readonly timestamp: string;

  constructor(payload: ApiErrorPayload) {
    super(payload.message);
    this.name = "ApiError";
    this.statusCode = payload.statusCode;
    this.code = payload.code;
    this.path = payload.path;
    this.timestamp = payload.timestamp;
  }
}

const defaultErrorMessages: Record<string, string> = {
  UNAUTHORIZED: "인증이 필요합니다.",
  FORBIDDEN: "권한이 없습니다.",
  PRODUCT_NOT_FOUND: "상품을 찾을 수 없습니다.",
  CHAT_ROOM_NOT_FOUND: "채팅방을 찾을 수 없습니다.",
  INVALID_CREDENTIALS: "이메일 또는 비밀번호가 올바르지 않습니다.",
  REFRESH_TOKEN_REUSE_DETECTED: "세션이 만료되었습니다. 다시 로그인해주세요.",
  INTERNAL_SERVER_ERROR: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
  BAD_GATEWAY: "게이트웨이 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
  SERVICE_UNAVAILABLE: "일시적으로 서비스를 사용할 수 없습니다.",
  GATEWAY_TIMEOUT: "요청 시간이 초과되었습니다. 다시 시도해주세요."
};

export function messageForCode(code: string, fallback: string): string {
  return defaultErrorMessages[code] ?? fallback;
}

export function shouldAttemptRefresh(statusCode: number, code: string): boolean {
  return statusCode === 401 && code === "UNAUTHORIZED";
}

export function shouldLogoutOnRefreshError(code: string): boolean {
  return (
    code === "INVALID_REFRESH_TOKEN" ||
    code === "EXPIRED_REFRESH_TOKEN" ||
    code === "REFRESH_TOKEN_REUSE_DETECTED"
  );
}
