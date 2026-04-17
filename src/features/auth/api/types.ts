import { z } from "zod";

export const signupEmailCodeRequestSchema = z.object({
  email: z.email()
});

export const verifyEmailCodeRequestSchema = z.object({
  email: z.email(),
  code: z.string().min(1)
});

export const signupRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  nickname: z.string().min(1),
  emailVerificationToken: z.string().min(1)
});

export const loginRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(1)
});

export const tokenRefreshRequestSchema = z.object({
  refreshToken: z.string().min(1)
});

export const authTokenSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1)
});

export const userSchema = z.object({
  id: z.number(),
  email: z.email(),
  nickname: z.string()
});

export const meResponseSchema = z.object({
  id: z.number(),
  email: z.email(),
  nickname: z.string()
});

export type SignupEmailCodeRequest = z.infer<typeof signupEmailCodeRequestSchema>;
export type VerifyEmailCodeRequest = z.infer<typeof verifyEmailCodeRequestSchema>;
export type SignupRequest = z.infer<typeof signupRequestSchema>;
export type LoginRequest = z.infer<typeof loginRequestSchema>;
export type AuthTokens = z.infer<typeof authTokenSchema>;
export type TokenRefreshRequest = z.infer<typeof tokenRefreshRequestSchema>;
export type MeResponse = z.infer<typeof meResponseSchema>;
