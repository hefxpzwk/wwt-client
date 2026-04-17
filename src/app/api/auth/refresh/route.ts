import { NextRequest } from "next/server";
import { db } from "@/mocks/db";
import { apiError, success } from "@/mocks/http";

export async function POST(request: NextRequest): Promise<Response> {
  const path = "/api/auth/refresh";
  const body = await request.json().catch(() => null) as { refreshToken?: string } | null;

  if (!body?.refreshToken) {
    return apiError(401, "INVALID_REFRESH_TOKEN", "refreshToken이 올바르지 않습니다.", path);
  }

  if (db.isRevokedRefreshToken(body.refreshToken)) {
    return apiError(401, "REFRESH_TOKEN_REUSE_DETECTED", "폐기된 refreshToken입니다. 다시 로그인해주세요.", path);
  }

  const rotated = db.rotateRefreshToken(body.refreshToken);
  if (!rotated) {
    return apiError(401, "INVALID_REFRESH_TOKEN", "refreshToken이 올바르지 않습니다.", path);
  }

  return success({ accessToken: rotated.accessToken, refreshToken: rotated.refreshToken });
}
