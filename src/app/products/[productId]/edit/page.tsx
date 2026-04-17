import Link from "next/link";
import { MobileShell } from "@/components/mobile-shell";
import { TopBar } from "@/components/top-bar";

export default function EditProductPage() {
  return (
    <MobileShell>
      <TopBar title="상품 수정" />

      <section className="scroll-area stack">
        <section className="surface stack" style={{ gap: "8px" }}>
          <p className="title" style={{ fontSize: "17px" }}>
            판매 정보 수정
          </p>
          <p className="subtle">가격, 설명, 거래 장소를 수정하고 다시 게시할 수 있습니다.</p>
          <Link className="inline-link" href="/products">
            상품 목록으로 돌아가기
          </Link>
        </section>
      </section>
    </MobileShell>
  );
}
