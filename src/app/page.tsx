import Link from "next/link";
import { MobileShell } from "@/components/mobile-shell";

export default function HomePage() {
  return (
    <MobileShell>
      <header className="top-bar">
        <h1>WWT</h1>
      </header>

      <section className="scroll-area stack">
        <section className="brand-hero">
          <p className="brand-chip">DSM 학생 전용</p>
          <h2 className="hero-title">우리 학교 중고거래, WWT에서 빠르게</h2>
          <p className="hero-copy">
            대덕소프트웨어마이스터고 학생만 가입 가능한 안전한 거래 공간입니다.
            수업에 필요한 장비부터 생활용품까지 같은 학교 안에서 쉽게 사고팔 수 있습니다.
          </p>
        </section>

        <section className="surface stack" style={{ gap: "10px" }}>
          <p className="title" style={{ fontSize: "18px" }}>
            바로 시작하기
          </p>
          <div className="quick-grid">
            <Link className="quick-link" href="/products">
              <p className="quick-title">물건 둘러보기</p>
              <p className="quick-desc">최신 판매글을 확인하고 원하는 물건을 찾아보세요.</p>
            </Link>
            <Link className="quick-link" href="/products/new">
              <p className="quick-title">판매 글 작성</p>
              <p className="quick-desc">가격, 거래 장소, 제안 여부를 입력해 바로 등록합니다.</p>
            </Link>
            <Link className="quick-link" href="/chats">
              <p className="quick-title">채팅 확인</p>
              <p className="quick-desc">거래 상대와 실시간으로 약속을 조율할 수 있습니다.</p>
            </Link>
            <Link className="quick-link" href="/auth/login">
              <p className="quick-title">로그인 / 회원가입</p>
              <p className="quick-desc">학생 인증 후 모든 거래 기능을 이용할 수 있습니다.</p>
            </Link>
          </div>
        </section>
      </section>
    </MobileShell>
  );
}
