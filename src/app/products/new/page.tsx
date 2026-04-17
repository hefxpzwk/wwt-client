"use client";

import { useState } from "react";
import { MobileShell } from "@/components/mobile-shell";
import { TopBar } from "@/components/top-bar";

export default function NewProductPage() {
  const [priceMode, setPriceMode] = useState<"sell" | "share">("sell");
  const [acceptOffer, setAcceptOffer] = useState(false);
  const [sameTownPost, setSameTownPost] = useState(false);

  return (
    <MobileShell>
      <TopBar title="판매 글 작성" rightSlot={<span>임시저장</span>} />

      <section className="scroll-area stack">
        <section className="surface stack">
          <p className="title" style={{ fontSize: "18px" }}>거래 유형과 가격</p>

          <div className="row-start">
            <button className={priceMode === "sell" ? "btn-primary" : "btn-ghost"} onClick={() => setPriceMode("sell")}>
              판매하기
            </button>
            <button className={priceMode === "share" ? "btn-primary" : "btn-ghost"} onClick={() => setPriceMode("share")}>
              나눔하기
            </button>
          </div>

          <input placeholder="가격을 입력하세요" />

          <label className="row-start" style={{ justifyContent: "flex-start" }}>
            <input
              type="checkbox"
              checked={acceptOffer}
              onChange={(event) => setAcceptOffer(event.target.checked)}
              style={{ width: "18px", height: "18px" }}
            />
            <span className="subtle">가격 제안 받기</span>
          </label>
        </section>

        <section className="surface stack">
          <p className="title" style={{ fontSize: "18px" }}>거래 정보</p>
          <input placeholder="거래 희망 장소" />
          <textarea placeholder="상품 설명을 입력하세요" />
        </section>

        <section className="surface stack">
          <div className="row">
            <p className="title" style={{ fontSize: "17px" }}>다른 교내 구역 노출</p>
            <label>
              <input
                type="checkbox"
                checked={sameTownPost}
                onChange={(event) => setSameTownPost(event.target.checked)}
                style={{ width: "20px", height: "20px" }}
              />
            </label>
          </div>
          <p className="subtle">인증 상태에 따라 게시글 노출 가능 범위가 달라집니다.</p>
        </section>

        <button className="btn-primary" style={{ height: "54px" }}>
          작성 완료
        </button>
      </section>
    </MobileShell>
  );
}
