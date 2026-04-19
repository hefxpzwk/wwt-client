"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { MobileShell } from "@/components/mobile-shell";
import { queryKeys } from "@/features/common/model/query-keys";
import { productsApi } from "@/features/products/api/products-api";

const PAGE = 1;
const LIMIT = 20;

function formatRelativeTime(value: string): string {
  const createdAt = new Date(value).getTime();
  const diffMinutes = Math.max(1, Math.floor((Date.now() - createdAt) / 60000));

  if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours}시간 전`;
  }

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}일 전`;
}

export default function ProductsPage() {
  const productsQuery = useQuery({
    queryKey: queryKeys.products(PAGE, LIMIT),
    queryFn: () => productsApi.getProducts({ page: PAGE, limit: LIMIT })
  });

  const items = productsQuery.data?.items ?? [];

  return (
    <MobileShell>
      <section className="market-home">
        <header className="market-header">
          <h1 className="market-brand" aria-label="WWT">
            <span className="market-brand-main">WWT</span>
          </h1>

          <div className="market-actions">
            <button className="icon-btn" type="button" aria-label="검색">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M11 4.75a6.25 6.25 0 1 0 3.886 11.148l4.108 4.11 1.06-1.061-4.109-4.11A6.25 6.25 0 0 0 11 4.75ZM6.25 11a4.75 4.75 0 1 1 9.5 0 4.75 4.75 0 0 1-9.5 0Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </header>

        <section className="market-feed" aria-label="홈 상품 목록">
          {productsQuery.isLoading && <p className="market-status">상품을 불러오는 중입니다...</p>}

          {productsQuery.isError && <p className="market-status">상품 목록을 불러오지 못했습니다.</p>}

          {productsQuery.isSuccess && items.length === 0 && <p className="market-status">등록된 상품이 없습니다.</p>}

          {productsQuery.isSuccess &&
            items.map((product) => (
              <Link className="market-item" href={`/products/${product.id}`} key={product.id}>
                <img className="market-thumb" src={product.imageUrls[0]} alt={product.title} />
                <div className="market-content">
                  <p className="market-title">{product.title}</p>
                  <p className="market-meta">
                    {product.locationName} · {formatRelativeTime(product.createdAt)}
                  </p>
                  <p className="market-price">{product.price.toLocaleString()}원</p>
                  <p className="market-reaction">
                    <span aria-hidden="true">♡</span>
                    <span className="market-reaction-count">{product.likes}</span>
                  </p>
                </div>
              </Link>
            ))}
        </section>

        <Link href="/products/new" className="market-write-btn" aria-label="판매 글쓰기">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </Link>

        <nav className="market-nav" aria-label="하단 메뉴">
          <Link href="/products" className="market-nav-item market-nav-item-active">
            <span className="market-nav-icon">⌂</span>
            <span>홈</span>
          </Link>
          <Link href="/products/new" className="market-nav-item">
            <span className="market-nav-icon">▦</span>
            <span>등록</span>
          </Link>
          <Link href="/trade-requests/sent" className="market-nav-item">
            <span className="market-nav-icon">⌖</span>
            <span>내 근처</span>
          </Link>
          <Link href="/chats" className="market-nav-item">
            <span className="market-nav-icon">◌</span>
            <span>채팅</span>
          </Link>
          <Link href="/mypage" className="market-nav-item">
            <span className="market-nav-icon">◔</span>
            <span>나의 당근</span>
          </Link>
        </nav>
      </section>
    </MobileShell>
  );
}
