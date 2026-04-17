import Link from "next/link";
import { MobileShell } from "@/components/mobile-shell";

export default function HomePage() {
  return (
    <MobileShell>
      <header className="top-bar">
        <h1>WWT</h1>
      </header>

      <section className="scroll-area stack">
        <section className="surface stack" style={{ gap: "10px" }}>
          <p className="subtle">대덕소프트웨어마이스터고 학생 전용 서비스</p>
          <p className="title">학교 안에서 안전하게 사고파는 WWT 마켓</p>
          <p className="subtle">
            우리 학교 학생만 가입할 수 있고, 교내에서 필요한 물건을 빠르게 거래할 수 있습니다.
          </p>
        </section>

        <section className="surface stack">
          <Link className="btn-primary" href="/products">
            물건 둘러보기
          </Link>
          <Link className="btn-ghost" href="/products/new">
            판매 글 작성
          </Link>
          <Link className="btn-ghost" href="/chats">
            채팅 확인
          </Link>
          <Link className="btn-ghost" href="/auth/login">
            로그인
          </Link>
        </section>
      </section>
    </MobileShell>
  );
}
