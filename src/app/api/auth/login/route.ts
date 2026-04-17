import { NextRequest } from "next/server";
import { db } from "@/mocks/db";
import { apiError, success } from "@/mocks/http";

export async function POST(request: NextRequest): Promise<Response> {
  const path = "/api/auth/login";
  const body = await request.json().catch(() => null) as { email?: string; password?: string } | null;

  if (!body?.email || !body.email.includes("@")) {
    return apiError(400, "INVALID_LOGIN_EMAIL", "이메일 형식이 올바르지 않습니다.", path);
  }

  if (!body.password) {
    return apiError(400, "MISSING_LOGIN_PASSWORD", "비밀번호는 필수입니다.", path);
  }

  const user = db.users.find((candidate) => candidate.email === body.email && candidate.password === body.password);
  if (!user) {
    return apiError(401, "INVALID_CREDENTIALS", "이메일 또는 비밀번호가 올바르지 않습니다.", path);
  }

  return success(db.issueTokens(user.id));
}
