import Link from "next/link";
import { MobileShell } from "@/components/mobile-shell";
import { TopBar } from "@/components/top-bar";

export default function MyProductsPage() {
  return (
    <MobileShell>
      <TopBar title="내 상품 목록" rightSlot={<Link href="/products/new">작성</Link>} />

      <section className="scroll-area stack">
        <section className="surface stack" style={{ gap: "8px" }}>
          <p className="title" style={{ fontSize: "17px" }}>내 판매글 관리</p>
          <p className="subtle">판매 상태를 확인하고 수정/삭제 작업을 이어갈 수 있습니다.</p>
          <Link href="/products" className="inline-link">
            전체 상품 목록으로 이동
          </Link>
        </section>
      </section>
    </MobileShell>
  );
}
