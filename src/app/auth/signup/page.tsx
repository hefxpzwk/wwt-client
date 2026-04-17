import Link from "next/link";
import { MobileShell } from "@/components/mobile-shell";
import { TopBar } from "@/components/top-bar";

export default function SignupPage() {
  return (
    <MobileShell>
      <TopBar title="회원가입" />

      <section className="scroll-area stack">
        <section className="surface stack">
          <p className="subtle">초기 세팅에서는 로그인/인증 체인을 우선 구성했습니다.</p>
          <Link className="inline-link" href="/auth/login">
            로그인으로 이동
          </Link>
        </section>
      </section>
    </MobileShell>
  );
}
