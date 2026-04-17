"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { AppTabBar } from "@/components/app-tab-bar";
import { ErrorNotice } from "@/components/error-notice";
import { MobileShell } from "@/components/mobile-shell";
import { TopBar } from "@/components/top-bar";
import { authApi } from "@/features/auth/api/auth-api";
import { queryKeys } from "@/features/common/model/query-keys";
import { useAuthStore } from "@/features/auth/model/use-auth-store";
import { ApiError } from "@/lib/errors";

export default function MyPage() {
  const user = useAuthStore((state) => state.user);

  const meQuery = useQuery({
    queryKey: queryKeys.me,
    queryFn: () => authApi.me(),
    enabled: !user
  });

  const profile = user ?? meQuery.data;
  const error = meQuery.error instanceof ApiError ? meQuery.error : null;

  return (
    <MobileShell>
      <TopBar title="내 정보" rightSlot={<Link href="/products">마켓</Link>} />

      <section className="scroll-area stack">
        <section className="surface stack" style={{ gap: "10px" }}>
          <div className="row-start">
            <img
              className="avatar"
              src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=200&auto=format&fit=crop"
              alt="프로필"
            />
            <div className="stack" style={{ gap: "2px" }}>
              <p className="title" style={{ fontSize: "18px" }}>{profile?.nickname ?? "bluefish"}</p>
              <p className="subtle">{profile?.email ?? "bluefish@wwt.dev"}</p>
            </div>
          </div>

          <div className="row" style={{ justifyContent: "flex-start", gap: "8px", flexWrap: "wrap" }}>
            <span className="status-badge">학생 인증 완료</span>
            <span className="status-badge">최근 3일 활동</span>
          </div>

          <button className="btn-ghost">프로필 수정</button>
        </section>

        <section className="surface stack" style={{ gap: "8px" }}>
          <p className="title" style={{ fontSize: "17px" }}>신뢰 지수</p>
          <p className="price" style={{ margin: 0 }}>36.5°C</p>
          <div style={{ width: "100%", height: "8px", borderRadius: "999px", background: "#dce8fb" }}>
            <div style={{ width: "37%", height: "100%", borderRadius: "999px", background: "#1a72e8" }} />
          </div>
          <p className="subtle">거래가 쌓일수록 신뢰 지수가 더 정확해집니다.</p>
        </section>

        <Link className="surface row" href="/mypage/products">
          <p className="title" style={{ fontSize: "17px" }}>내 판매물품 관리</p>
          <p className="top-bar-action">이동</p>
        </Link>

        <ErrorNotice code={error?.code} message={error?.message} />
      </section>

      <AppTabBar active="my" />
    </MobileShell>
  );
}
