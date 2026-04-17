import Link from "next/link";
import { MobileShell } from "@/components/mobile-shell";
import { TopBar } from "@/components/top-bar";

export default function MyProductsPage() {
  return (
    <MobileShell>
      <TopBar title="내 상품 목록" rightSlot={<Link href="/products/new">작성</Link>} />

      <section className="scroll-area stack">
        <section className="surface stack">
          <p className="subtle">내가 올린 판매 글을 여기서 관리할 수 있습니다.</p>
          <Link href="/products" className="inline-link">
            전체 상품 목록으로 이동
          </Link>
        </section>
      </section>
    </MobileShell>
  );
}
