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
      <TopBar title="내 물건 팔기" rightSlot={<span className="subtle">임시저장</span>} />

      <section className="scroll-area stack">
        <section className="stack">
          <p className="title" style={{ fontSize: "25px" }}>
            가격
          </p>

          <div className="row-start">
            <button className={priceMode === "sell" ? "btn-primary" : "btn-ghost"} onClick={() => setPriceMode("sell")}>
              판매하기
            </button>
            <button className={priceMode === "share" ? "btn-primary" : "btn-ghost"} onClick={() => setPriceMode("share")}>
              나눔하기
            </button>
          </div>

          <input placeholder="₩ 가격을 입력해주세요." />

          <label className="row-start" style={{ justifyContent: "flex-start" }}>
            <input
              type="checkbox"
              checked={acceptOffer}
              onChange={(event) => setAcceptOffer(event.target.checked)}
              style={{ width: "18px", height: "18px" }}
            />
            <span>가격 제안 받기</span>
          </label>
        </section>

        <section className="stack">
          <p className="title" style={{ fontSize: "25px" }}>
            거래 정보
          </p>
          <input placeholder="거래 희망 장소" />
          <p className="subtle">보여줄 동네 설정</p>
        </section>

        <section className="surface stack">
          <div className="row">
            <p className="title" style={{ fontSize: "22px" }}>
              다른 교내 구역에도 노출
            </p>
            <label>
              <input
                type="checkbox"
                checked={sameTownPost}
                onChange={(event) => setSameTownPost(event.target.checked)}
                style={{ width: "20px", height: "20px" }}
              />
            </label>
          </div>
          <p className="subtle">학생 인증 상태와 위치 기준에 따라 게시글 노출 범위가 제한될 수 있습니다.</p>
        </section>

        <button className="btn-primary" style={{ height: "56px", fontSize: "22px" }}>
          작성 완료
        </button>
      </section>
    </MobileShell>
  );
}
