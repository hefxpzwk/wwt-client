import { NextRequest } from "next/server";
import { db } from "@/mocks/db";
import { apiError, success } from "@/mocks/http";
import { issueEmailCode } from "@/mocks/signup";

function isValidEmail(email: string): boolean {
  return /.+@.+\..+/.test(email);
}

export async function POST(request: NextRequest): Promise<Response> {
  const path = "/api/auth/signup/email-code";
  const body = (await request.json().catch(() => null)) as { email?: string } | null;

  if (!body?.email || !isValidEmail(body.email)) {
    return apiError(400, "INVALID_EMAIL_CODE_REQUEST_EMAIL", "이메일 형식이 올바르지 않습니다.", path);
  }

  const alreadyExists = db.users.some((user) => user.email === body.email);
  if (alreadyExists) {
    return apiError(409, "EMAIL_ALREADY_EXISTS", "이미 가입된 이메일입니다.", path);
  }

  issueEmailCode(body.email);
  return success({ message: "인증 코드가 발송되었습니다." }, 201);
}
