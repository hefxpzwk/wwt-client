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
      <TopBar title="프로필" rightSlot={<Link href="/products">공유</Link>} />

      <section className="scroll-area stack">
        <section className="surface stack">
          <div className="row-start">
            <img
              className="avatar"
              src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=200&auto=format&fit=crop"
              alt="프로필"
            />
            <div className="stack" style={{ gap: "2px" }}>
              <p className="title">{profile?.nickname ?? "bluefish"}</p>
              <p className="subtle">#{profile?.email ?? "GY4385ZN"} · 최근 3일 이내 활동</p>
            </div>
          </div>

          <p>📅 2025년 6월 2일 가입</p>
          <p>🛡 본인인증 완료</p>
          <p>📍 동네 인증 (최근 30일)</p>

          <button className="btn-ghost">프로필 수정</button>
        </section>

        <section className="surface stack">
          <div className="row">
            <p className="title" style={{ fontSize: "20px" }}>
              매너온도
            </p>
            <p style={{ fontSize: "26px" }}>🙂</p>
          </div>

          <p className="price" style={{ fontSize: "41px", color: "#ff9d2a" }}>
            36.5°C
          </p>
          <div style={{ width: "100%", height: "7px", borderRadius: "999px", background: "#2e3a4f" }}>
            <div style={{ width: "37%", height: "100%", borderRadius: "999px", background: "#ff9d2a" }} />
          </div>
          <p className="subtle">표시될 만큼 충분히 거래하지 않았어요.</p>
        </section>

        <Link className="surface row" href="/mypage/products">
          <p className="title" style={{ fontSize: "22px" }}>
            판매물품
          </p>
          <p>›</p>
        </Link>

        <ErrorNotice code={error?.code} message={error?.message} />
      </section>

      <AppTabBar active="my" />
    </MobileShell>
  );
}
