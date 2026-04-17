"use client";

import { useQuery } from "@tanstack/react-query";
import { AppTabBar } from "@/components/app-tab-bar";
import { ErrorNotice } from "@/components/error-notice";
import { MobileShell } from "@/components/mobile-shell";
import { TopBar } from "@/components/top-bar";
import { queryKeys } from "@/features/common/model/query-keys";
import { tradeRequestsApi } from "@/features/trade-requests/api/trade-requests-api";
import { ApiError } from "@/lib/errors";

export default function SentTradeRequestsPage() {
  const requestsQuery = useQuery({
    queryKey: queryKeys.myTradeRequests,
    queryFn: () => tradeRequestsApi.mine()
  });

  const error = requestsQuery.error instanceof ApiError ? requestsQuery.error : null;

  return (
    <MobileShell>
      <TopBar title="내 거래 요청" />

      <section className="scroll-area stack">
        {requestsQuery.isLoading && <p className="subtle">요청 목록 로딩 중...</p>}

        {requestsQuery.isSuccess && requestsQuery.data.items.length === 0 && (
          <section className="surface stack" style={{ gap: "8px" }}>
            <p className="title" style={{ fontSize: "16px" }}>보낸 거래 요청이 없습니다.</p>
            <p className="subtle">관심 있는 상품에서 거래 요청을 보내보세요.</p>
          </section>
        )}

        {requestsQuery.isSuccess &&
          requestsQuery.data.items.map((item) => (
            <article className="surface stack" key={item.id} style={{ gap: "8px" }}>
              <div className="row">
                <p className="title" style={{ fontSize: "16px" }}>요청 #{item.id}</p>
                <span className="status-badge">{item.status}</span>
              </div>
              <p className="subtle">상품 #{item.productId}</p>
              <p className="tiny">{new Date(item.createdAt).toLocaleString("ko-KR")}</p>
            </article>
          ))}

        <ErrorNotice code={error?.code} message={error?.message} />
      </section>

      <AppTabBar active="map" />
    </MobileShell>
  );
}
