"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { AppTabBar } from "@/components/app-tab-bar";
import { ErrorNotice } from "@/components/error-notice";
import { MobileShell } from "@/components/mobile-shell";
import { TopBar } from "@/components/top-bar";
import { queryKeys } from "@/features/common/model/query-keys";
import { productsApi } from "@/features/products/api/products-api";
import { ApiError } from "@/lib/errors";

const PAGE = 1;
const LIMIT = 20;

export default function ProductsPage() {
  const productsQuery = useQuery({
    queryKey: queryKeys.products(PAGE, LIMIT),
    queryFn: () => productsApi.getProducts({ page: PAGE, limit: LIMIT })
  });

  const error = productsQuery.error instanceof ApiError ? productsQuery.error : null;

  return (
    <MobileShell>
      <TopBar title="홈" rightSlot={<Link href="/auth/login">로그인</Link>} />

      <section className="scroll-area stack">
        <section className="product-list">
          {productsQuery.isLoading && <p className="subtle">상품을 불러오는 중입니다...</p>}

          {productsQuery.isSuccess &&
            productsQuery.data.items.map((product, index) => (
              <Link
                href={`/products/${product.id}`}
                key={product.id}
                className="product-item"
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <img className="product-thumb" src={product.imageUrls[0]} alt={product.title} />
                <div className="stack" style={{ gap: "6px" }}>
                  <p className="title" style={{ fontSize: "24px" }}>
                    {product.title}
                  </p>
                  <p className="subtle">
                    {product.locationName} · {new Date(product.createdAt).toLocaleDateString("ko-KR")}
                  </p>
                  <p className="price" style={{ fontSize: "34px" }}>
                    {product.price.toLocaleString()}원
                  </p>
                  <p className="metric">👥 {product.views}  ♡ {product.likes}</p>
                </div>
              </Link>
            ))}
        </section>

        <ErrorNotice code={error?.code} message={error?.message} />

        <Link href="/products/new" className="floating-btn">
          + 글쓰기
        </Link>
      </section>

      <AppTabBar active="home" />
    </MobileShell>
  );
}
