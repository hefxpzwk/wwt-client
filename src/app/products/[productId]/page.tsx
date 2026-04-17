"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AppTabBar } from "@/components/app-tab-bar";
import { ErrorNotice } from "@/components/error-notice";
import { MobileShell } from "@/components/mobile-shell";
import { TopBar } from "@/components/top-bar";
import { authApi } from "@/features/auth/api/auth-api";
import { queryKeys } from "@/features/common/model/query-keys";
import { productsApi } from "@/features/products/api/products-api";
import { tradeRequestsApi } from "@/features/trade-requests/api/trade-requests-api";
import { ApiError } from "@/lib/errors";

export default function ProductDetailPage() {
  const params = useParams<{ productId: string }>();
  const productId = Number(params.productId);

  const productQuery = useQuery({
    queryKey: queryKeys.product(productId),
    queryFn: () => productsApi.getProduct(productId)
  });

  const tradeMutation = useMutation({
    mutationFn: () => tradeRequestsApi.create(productId)
  });

  const chatMutation = useMutation({
    mutationFn: async () => {
      const me = await authApi.me();
      const product = await productsApi.getProduct(productId);
      const receiverId = me.id === product.sellerId ? 2 : product.sellerId;
      const { chatsApi } = await import("@/features/chats/api/chats-api");
      return chatsApi.createRoom({ productId, receiverId });
    }
  });

  const error =
    (productQuery.error instanceof ApiError && productQuery.error) ||
    (tradeMutation.error instanceof ApiError && tradeMutation.error) ||
    (chatMutation.error instanceof ApiError && chatMutation.error) ||
    null;

  const product = productQuery.data;

  return (
    <MobileShell>
      <TopBar title="상품 상세" rightSlot={<Link href="/products">목록</Link>} />

      <section className="scroll-area stack">
        {product && (
          <>
            <img
              src={product.imageUrls[0]}
              alt={product.title}
              style={{ width: "100%", borderRadius: "18px", height: "284px", objectFit: "cover", border: "1px solid var(--line)" }}
            />

            <section className="surface stack" style={{ gap: "10px" }}>
              <div className="row-start">
                <img
                  className="avatar"
                  src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=200&auto=format&fit=crop"
                  alt="seller"
                />
                <div className="stack" style={{ gap: "2px" }}>
                  <p className="title" style={{ fontSize: "18px" }}>
                    {product.title}
                  </p>
                  <p className="subtle">
                    {product.category} · {product.locationName}
                  </p>
                </div>
              </div>

              <p className="price">{product.price.toLocaleString()}원</p>
              <p className="subtle" style={{ whiteSpace: "pre-wrap" }}>
                {product.description}
              </p>

              <div className="row" style={{ alignItems: "stretch" }}>
                <button className="btn-primary" style={{ flex: 1 }} onClick={() => tradeMutation.mutate()}>
                  거래 요청
                </button>
                <button className="btn-ghost" style={{ flex: 1 }} onClick={() => chatMutation.mutate()}>
                  채팅 시작
                </button>
              </div>

              {tradeMutation.isSuccess && <p className="status-badge">거래 요청이 전송되었습니다.</p>}

              {chatMutation.isSuccess && (
                <Link className="inline-link" href={`/chats/${chatMutation.data.id}`}>
                  생성된 채팅방으로 이동
                </Link>
              )}
            </section>
          </>
        )}

        {productQuery.isLoading && <p className="subtle">상품 상세를 불러오는 중입니다...</p>}
        <ErrorNotice code={error?.code} message={error?.message} />
      </section>

      <AppTabBar active="home" />
    </MobileShell>
  );
}
