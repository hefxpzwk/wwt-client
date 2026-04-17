"use client";

import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { MobileShell } from "@/components/mobile-shell";
import { ErrorNotice } from "@/components/error-notice";
import { authApi } from "@/features/auth/api/auth-api";
import { setTokens } from "@/features/auth/model/token-store";
import { useAuthStore } from "@/features/auth/model/use-auth-store";
import { ApiError } from "@/lib/errors";

const demoAccount = {
  email: "bluefish@wwt.dev",
  password: "password123"
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(demoAccount.email);
  const [password, setPassword] = useState(demoAccount.password);
  const setUser = useAuthStore((state) => state.setUser);
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  const loginMutation = useMutation({
    mutationFn: async () => {
      const tokens = await authApi.login({ email, password });
      setTokens(tokens);

      const me = await authApi.me();
      setUser(me);
      setAuthenticated(true);
    },
    onSuccess: () => {
      router.push("/products");
    }
  });

  function onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    loginMutation.mutate();
  }

  const error = loginMutation.error instanceof ApiError ? loginMutation.error : null;

  return (
    <MobileShell>
      <header className="top-bar">
        <h1>로그인</h1>
      </header>

      <section className="scroll-area stack">
        <section className="surface stack">
          <p className="subtle">데모 계정이 기본 입력되어 있습니다.</p>
          <form className="stack" onSubmit={onSubmit}>
            <label className="stack">
              <span className="label">이메일</span>
              <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required />
            </label>

            <label className="stack">
              <span className="label">비밀번호</span>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                required
              />
            </label>

            <button className="btn-primary" type="submit" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? "로그인 중..." : "로그인"}
            </button>
          </form>

          <ErrorNotice code={error?.code} message={error?.message} />
        </section>
      </section>
    </MobileShell>
  );
}
