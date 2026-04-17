import { NextRequest } from "next/server";
import { apiError, success } from "@/mocks/http";
import { verifyEmailCode } from "@/mocks/signup";

export async function POST(request: NextRequest): Promise<Response> {
  const path = "/api/auth/signup/email-code/verify";
  const body = (await request.json().catch(() => null)) as { email?: string; code?: string } | null;

  const result = verifyEmailCode(body?.email ?? "", body?.code ?? "");
  if (!result.ok) {
    if (result.code === "EXPIRED_EMAIL_CODE") {
      return apiError(400, "EXPIRED_EMAIL_CODE", "이메일 인증 코드가 만료되었습니다.", path);
    }

    return apiError(400, "INVALID_EMAIL_CODE", "이메일 인증 코드가 올바르지 않습니다.", path);
  }

  return success({ emailVerificationToken: result.emailVerificationToken });
}
