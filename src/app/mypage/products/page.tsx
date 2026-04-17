import Link from "next/link";
import { MobileShell } from "@/components/mobile-shell";
import { TopBar } from "@/components/top-bar";

export default function MyProductsPage() {
  return (
    <MobileShell>
      <TopBar title="내 상품 목록" rightSlot={<Link href="/products/new">작성</Link>} />

      <section className="scroll-area stack">
        <section className="surface stack">
          <p className="subtle">초기 세팅 단계에서는 목록 연동 범위를 최소화했습니다.</p>
          <Link href="/products" className="inline-link">
            전체 상품 목록으로 이동
          </Link>
        </section>
      </section>
    </MobileShell>
  );
}
