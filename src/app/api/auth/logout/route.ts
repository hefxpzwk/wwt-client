import { NextRequest } from "next/server";
import { parseBearerToken } from "@/mocks/auth";
import { db } from "@/mocks/db";
import { apiError, noContent } from "@/mocks/http";

export async function POST(request: NextRequest): Promise<Response> {
  const path = "/api/auth/logout";
  const accessToken = parseBearerToken(request.headers.get("authorization"));
  if (!accessToken) {
    return apiError(401, "UNAUTHORIZED", "로그아웃하려면 인증이 필요합니다.", path);
  }

  const body = await request.json().catch(() => null) as { refreshToken?: string } | null;
  if (!body?.refreshToken) {
    return apiError(401, "INVALID_REFRESH_TOKEN", "refreshToken이 올바르지 않습니다.", path);
  }

  db.revokeRefreshToken(body.refreshToken);
  return noContent();
}
