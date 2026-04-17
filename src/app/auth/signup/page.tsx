"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ErrorNotice } from "@/components/error-notice";
import { MobileShell } from "@/components/mobile-shell";
import { TopBar } from "@/components/top-bar";
import { authApi } from "@/features/auth/api/auth-api";
import { ApiError } from "@/lib/errors";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [emailVerificationToken, setEmailVerificationToken] = useState("");

  const sendCodeMutation = useMutation({
    mutationFn: () => authApi.sendSignupEmailCode({ email })
  });

  const verifyCodeMutation = useMutation({
    mutationFn: async () => {
      const result = await authApi.verifySignupEmailCode({ email, code });
      setEmailVerificationToken(result.emailVerificationToken);
      return result;
    }
  });

  const signupMutation = useMutation({
    mutationFn: () => authApi.signup({ email, password, nickname, emailVerificationToken }),
    onSuccess: () => {
      router.push("/auth/login");
    }
  });

  function onSubmitSignup(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    signupMutation.mutate();
  }

  const error =
    (sendCodeMutation.error instanceof ApiError && sendCodeMutation.error) ||
    (verifyCodeMutation.error instanceof ApiError && verifyCodeMutation.error) ||
    (signupMutation.error instanceof ApiError && signupMutation.error) ||
    null;

  return (
    <MobileShell>
      <TopBar title="회원가입" />

      <section className="scroll-area stack">
        <section className="surface stack">
          <p className="subtle">1) 이메일 인증코드 요청 → 2) 코드 검증 → 3) 회원가입</p>
          <label className="stack">
            <span className="label">이메일</span>
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required />
          </label>
          <button className="btn-ghost" type="button" onClick={() => sendCodeMutation.mutate()} disabled={sendCodeMutation.isPending}>
            {sendCodeMutation.isPending ? "전송 중..." : "인증코드 요청"}
          </button>

          <label className="stack">
            <span className="label">인증코드</span>
            <input value={code} onChange={(event) => setCode(event.target.value)} placeholder="데모 코드: 123456" required />
          </label>
          <button className="btn-ghost" type="button" onClick={() => verifyCodeMutation.mutate()} disabled={verifyCodeMutation.isPending}>
            {verifyCodeMutation.isPending ? "검증 중..." : "인증코드 검증"}
          </button>

          <form className="stack" onSubmit={onSubmitSignup}>
            <label className="stack">
              <span className="label">닉네임</span>
              <input value={nickname} onChange={(event) => setNickname(event.target.value)} required />
            </label>
            <label className="stack">
              <span className="label">비밀번호</span>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                minLength={8}
                required
              />
            </label>
            <button
              className="btn-primary"
              type="submit"
              disabled={signupMutation.isPending || !emailVerificationToken}
            >
              {signupMutation.isPending ? "가입 중..." : "회원가입"}
            </button>
          </form>

          {!emailVerificationToken && <p className="tiny">회원가입 버튼은 이메일 인증 완료 후 활성화됩니다.</p>}
          <ErrorNotice code={error?.code} message={error?.message} />
          <Link className="inline-link" href="/auth/login">
            로그인으로 이동
          </Link>
        </section>
      </section>
    </MobileShell>
  );
}
