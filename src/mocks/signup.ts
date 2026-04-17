type EmailCodeRecord = {
  code: string;
  expiresAt: number;
};

type VerificationTokenRecord = {
  email: string;
  expiresAt: number;
  used: boolean;
};

type ConsumeResultCode =
  | "INVALID_EMAIL_VERIFICATION_TOKEN"
  | "EXPIRED_EMAIL_VERIFICATION_TOKEN"
  | "USED_EMAIL_VERIFICATION_TOKEN"
  | "EMAIL_VERIFICATION_EMAIL_MISMATCH";

const emailCodeRecords = new Map<string, EmailCodeRecord>();
const verificationTokenRecords = new Map<string, VerificationTokenRecord>();

const EMAIL_CODE_TTL_MS = 5 * 60 * 1000;
const EMAIL_VERIFICATION_TOKEN_TTL_MS = 10 * 60 * 1000;

function randomToken(prefix: string): string {
  const randomPart = Math.random().toString(36).slice(2);
  return `${prefix}-${Date.now()}-${randomPart}`;
}

export function issueEmailCode(email: string): string {
  // Mock API에서는 고정 코드로 동작시켜 테스트 흐름을 단순화한다.
  const code = "123456";
  emailCodeRecords.set(email, { code, expiresAt: Date.now() + EMAIL_CODE_TTL_MS });
  return code;
}

export function verifyEmailCode(
  email: string,
  code: string
): { ok: true; emailVerificationToken: string } | { ok: false; code: "INVALID_EMAIL_CODE" | "EXPIRED_EMAIL_CODE" } {
  const record = emailCodeRecords.get(email);
  if (!record || record.code !== code) {
    return { ok: false, code: "INVALID_EMAIL_CODE" };
  }

  if (record.expiresAt < Date.now()) {
    emailCodeRecords.delete(email);
    return { ok: false, code: "EXPIRED_EMAIL_CODE" };
  }

  const emailVerificationToken = randomToken("email-verify");
  verificationTokenRecords.set(emailVerificationToken, {
    email,
    expiresAt: Date.now() + EMAIL_VERIFICATION_TOKEN_TTL_MS,
    used: false
  });

  return { ok: true, emailVerificationToken };
}

export function consumeEmailVerificationToken(
  token: string,
  email: string
): { ok: true } | { ok: false; code: ConsumeResultCode } {
  const record = verificationTokenRecords.get(token);
  if (!record) {
    return { ok: false, code: "INVALID_EMAIL_VERIFICATION_TOKEN" };
  }

  if (record.used) {
    return { ok: false, code: "USED_EMAIL_VERIFICATION_TOKEN" };
  }

  if (record.expiresAt < Date.now()) {
    return { ok: false, code: "EXPIRED_EMAIL_VERIFICATION_TOKEN" };
  }

  if (record.email !== email) {
    return { ok: false, code: "EMAIL_VERIFICATION_EMAIL_MISMATCH" };
  }

  record.used = true;
  return { ok: true };
}
