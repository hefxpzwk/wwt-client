import { http } from "@/lib/http";
import {
  authTokenSchema,
  loginRequestSchema,
  meResponseSchema,
  signupEmailCodeRequestSchema,
  signupRequestSchema,
  tokenRefreshRequestSchema,
  verifyEmailCodeRequestSchema,
  type LoginRequest,
  type MeResponse,
  type SignupEmailCodeRequest,
  type SignupRequest,
  type TokenRefreshRequest,
  type VerifyEmailCodeRequest,
  type AuthTokens
} from "@/features/auth/api/types";

export const authApi = {
  async sendSignupEmailCode(input: SignupEmailCodeRequest): Promise<{ message: string }> {
    const body = signupEmailCodeRequestSchema.parse(input);
    return http<{ message: string }>("/auth/signup/email-code", { method: "POST", body });
  },

  async verifySignupEmailCode(input: VerifyEmailCodeRequest): Promise<{ emailVerificationToken: string }> {
    const body = verifyEmailCodeRequestSchema.parse(input);
    return http<{ emailVerificationToken: string }>("/auth/signup/email-code/verify", { method: "POST", body });
  },

  async signup(input: SignupRequest): Promise<{ id: number; email: string; nickname: string }> {
    const body = signupRequestSchema.parse(input);
    return http<{ id: number; email: string; nickname: string }>("/auth/signup", { method: "POST", body });
  },

  async login(input: LoginRequest): Promise<AuthTokens> {
    const body = loginRequestSchema.parse(input);
    const result = await http<AuthTokens>("/auth/login", { method: "POST", body });
    return authTokenSchema.parse(result);
  },

  async refresh(input: TokenRefreshRequest): Promise<AuthTokens> {
    const body = tokenRefreshRequestSchema.parse(input);
    const result = await http<AuthTokens>("/auth/refresh", { method: "POST", body, skipRefresh: true });
    return authTokenSchema.parse(result);
  },

  async logout(refreshToken: string): Promise<void> {
    await http<void>("/auth/logout", {
      method: "POST",
      body: { refreshToken },
      requiresAuth: true,
      skipRefresh: true
    });
  },

  async me(): Promise<MeResponse> {
    const result = await http<MeResponse>("/users/me", { requiresAuth: true });
    return meResponseSchema.parse(result);
  }
};
