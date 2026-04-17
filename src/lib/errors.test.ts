import { describe, expect, it } from "vitest";
import { messageForCode, shouldAttemptRefresh, shouldLogoutOnRefreshError } from "@/lib/errors";

describe("error helpers", () => {
  it("returns predefined message by code", () => {
    expect(messageForCode("FORBIDDEN", "fallback")).toBe("권한이 없습니다.");
  });

  it("falls back when code map is missing", () => {
    expect(messageForCode("SOME_UNKNOWN_CODE", "fallback")).toBe("fallback");
  });

  it("attempts refresh only for 401 unauthorized", () => {
    expect(shouldAttemptRefresh(401, "UNAUTHORIZED")).toBe(true);
    expect(shouldAttemptRefresh(401, "INVALID_CREDENTIALS")).toBe(false);
    expect(shouldAttemptRefresh(403, "FORBIDDEN")).toBe(false);
  });

  it("forces logout on refresh-token terminal errors", () => {
    expect(shouldLogoutOnRefreshError("INVALID_REFRESH_TOKEN")).toBe(true);
    expect(shouldLogoutOnRefreshError("EXPIRED_REFRESH_TOKEN")).toBe(true);
    expect(shouldLogoutOnRefreshError("REFRESH_TOKEN_REUSE_DETECTED")).toBe(true);
    expect(shouldLogoutOnRefreshError("UNAUTHORIZED")).toBe(false);
  });
});
