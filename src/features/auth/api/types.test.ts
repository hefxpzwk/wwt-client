import { describe, expect, it } from "vitest";
import { loginRequestSchema, signupRequestSchema } from "@/features/auth/api/types";

describe("auth schemas", () => {
  it("validates login payload", () => {
    const parsed = loginRequestSchema.parse({ email: "user@test.com", password: "1234" });
    expect(parsed.email).toBe("user@test.com");
  });

  it("rejects short signup password", () => {
    const result = signupRequestSchema.safeParse({
      email: "user@test.com",
      password: "123",
      nickname: "닉",
      emailVerificationToken: "token"
    });

    expect(result.success).toBe(false);
  });
});
