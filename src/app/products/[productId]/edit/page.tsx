import Link from "next/link";
import { MobileShell } from "@/components/mobile-shell";
import { TopBar } from "@/components/top-bar";

export default function EditProductPage() {
  return (
    <MobileShell>
      <TopBar title="상품 수정" />

      <section className="scroll-area stack">
        <section className="surface stack">
          <p className="subtle">상품 수정 플로우는 후속 작업에서 확장됩니다.</p>
          <Link className="inline-link" href="/products">
            상품 목록으로 돌아가기
          </Link>
        </section>
      </section>
    </MobileShell>
  );
}
