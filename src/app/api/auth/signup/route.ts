import { NextRequest } from "next/server";
import { db } from "@/mocks/db";
import { apiError, success } from "@/mocks/http";
import { consumeEmailVerificationToken } from "@/mocks/signup";

function isValidEmail(email: string): boolean {
  return /.+@.+\..+/.test(email);
}

export async function POST(request: NextRequest): Promise<Response> {
  const path = "/api/auth/signup";
  const body = (await request.json().catch(() => null)) as {
    email?: string;
    password?: string;
    nickname?: string;
    emailVerificationToken?: string;
  } | null;

  if (!body?.email || !isValidEmail(body.email)) {
    return apiError(400, "INVALID_SIGNUP_EMAIL", "이메일 형식이 올바르지 않습니다.", path);
  }

  if (!body.password || body.password.length < 8) {
    return apiError(400, "INVALID_SIGNUP_PASSWORD", "비밀번호는 최소 8자 이상이어야 합니다.", path);
  }

  if (!body.nickname || body.nickname.trim().length === 0) {
    return apiError(400, "INVALID_SIGNUP_NICKNAME", "닉네임은 필수입니다.", path);
  }

  if (!body.emailVerificationToken) {
    return apiError(400, "MISSING_EMAIL_VERIFICATION_TOKEN", "이메일 인증 토큰은 필수입니다.", path);
  }

  const alreadyExists = db.users.some((user) => user.email === body.email);
  if (alreadyExists) {
    return apiError(409, "EMAIL_ALREADY_EXISTS", "이미 가입된 이메일입니다.", path);
  }

  const consumeResult = consumeEmailVerificationToken(body.emailVerificationToken, body.email);
  if (!consumeResult.ok) {
    if (consumeResult.code === "EXPIRED_EMAIL_VERIFICATION_TOKEN") {
      return apiError(400, consumeResult.code, "이메일 인증 토큰이 만료되었습니다.", path);
    }

    if (consumeResult.code === "USED_EMAIL_VERIFICATION_TOKEN") {
      return apiError(400, consumeResult.code, "이미 사용된 이메일 인증 토큰입니다.", path);
    }

    if (consumeResult.code === "EMAIL_VERIFICATION_EMAIL_MISMATCH") {
      return apiError(400, consumeResult.code, "이메일 인증 토큰의 이메일과 요청 이메일이 일치하지 않습니다.", path);
    }

    return apiError(400, consumeResult.code, "이메일 인증 토큰이 올바르지 않습니다.", path);
  }

  const user = db.addUser({
    email: body.email,
    nickname: body.nickname.trim(),
    password: body.password
  });

  return success(
    {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      emailVerifiedAt: new Date().toISOString()
    },
    201
  );
}
