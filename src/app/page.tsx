import Link from "next/link";
import { MobileShell } from "@/components/mobile-shell";

export default function HomePage() {
  return (
    <MobileShell>
      <header className="top-bar">
        <h1>WWT</h1>
      </header>

      <section className="scroll-area stack">
        <section className="surface stack">
          <p className="subtle">중고거래 클라이언트 데모</p>
          <p className="title">초기 세팅 + UI + API + 테스트 구성 완료</p>
          <p className="subtle">아래 흐름으로 바로 기능을 확인할 수 있습니다.</p>
        </section>

        <section className="surface stack">
          <Link className="btn-primary" href="/auth/login">
            1) 로그인
          </Link>
          <Link className="btn-ghost" href="/products">
            2) 상품 탐색
          </Link>
          <Link className="btn-ghost" href="/chats">
            3) 채팅 목록
          </Link>
          <Link className="btn-ghost" href="/mypage">
            4) 프로필
          </Link>
        </section>
      </section>
    </MobileShell>
  );
}
