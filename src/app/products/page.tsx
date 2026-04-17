"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
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
  const [keyword, setKeyword] = useState("");

  const productsQuery = useQuery({
    queryKey: queryKeys.products(PAGE, LIMIT),
    queryFn: () => productsApi.getProducts({ page: PAGE, limit: LIMIT })
  });

  const error = productsQuery.error instanceof ApiError ? productsQuery.error : null;

  const filteredItems = useMemo(() => {
    const items = productsQuery.data?.items ?? [];
    if (!keyword.trim()) {
      return items;
    }

    const lower = keyword.toLowerCase();
    return items.filter((item) => item.title.toLowerCase().includes(lower));
  }, [productsQuery.data?.items, keyword]);

  return (
    <MobileShell>
      <TopBar title="홈" rightSlot={<Link href="/auth/login">계정</Link>} />

      <section className="scroll-area stack">
        <section className="surface stack" style={{ gap: "10px" }}>
          <p className="title" style={{ fontSize: "18px" }}>
            WWT 마켓
          </p>
          <p className="subtle">교내 학생이 올린 판매글만 표시됩니다.</p>
          <div className="toolbar">
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="물건명 검색"
              aria-label="상품 검색"
            />
            <select aria-label="정렬 기준">
              <option>최신순</option>
              <option>낮은 가격순</option>
              <option>높은 가격순</option>
            </select>
          </div>
        </section>

        <section className="product-list">
          {productsQuery.isLoading && <p className="subtle">상품을 불러오는 중입니다...</p>}

          {productsQuery.isSuccess && filteredItems.length === 0 && (
            <section className="surface stack" style={{ gap: "8px" }}>
              <p className="title" style={{ fontSize: "16px" }}>
                검색 결과가 없습니다.
              </p>
              <p className="subtle">다른 키워드로 다시 검색해 보세요.</p>
            </section>
          )}

          {productsQuery.isSuccess &&
            filteredItems.map((product, index) => (
              <Link
                href={`/products/${product.id}`}
                key={product.id}
                className="product-item"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <img className="product-thumb" src={product.imageUrls[0]} alt={product.title} />
                <div className="stack" style={{ gap: "4px" }}>
                  <p className="product-name">{product.title}</p>
                  <p className="subtle">
                    {product.locationName} · {new Date(product.createdAt).toLocaleDateString("ko-KR")}
                  </p>
                  <p className="price">{product.price.toLocaleString()}원</p>
                  <p className="metric">조회 {product.views} · 관심 {product.likes}</p>
                </div>
              </Link>
            ))}
        </section>

        <ErrorNotice code={error?.code} message={error?.message} />

        <Link href="/products/new" className="floating-btn">
          판매 글쓰기
        </Link>
      </section>

      <AppTabBar active="home" />
    </MobileShell>
  );
}
