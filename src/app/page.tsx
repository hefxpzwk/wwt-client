import Link from "next/link";
import { MobileShell } from "@/components/mobile-shell";

const homeItems = [
  {
    id: 1,
    title: "페라리 브라이트 네롤리 입니다.",
    meta: "서초5동 · 끌올 1분 전",
    price: "30,000원",
    reaction: "💬 1",
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 2,
    title: "마사지건",
    meta: "삼성2동 · 1분 전",
    price: "13,000원",
    reaction: "💬 0",
    image:
      "https://images.unsplash.com/photo-1620052582780-6743720a8bca?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 3,
    title: "캐스키드슨 운동화",
    meta: "삼성2동 · 3분 전",
    price: "10,000원",
    reaction: "💬 1",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 4,
    title: "클랍앰플",
    meta: "역삼동 · 끌올 4분 전",
    price: "45,000원",
    reaction: "♡ 7",
    image:
      "https://images.unsplash.com/photo-1556229010-aa3f7ff66b24?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 5,
    title: "애플펜슬 정품 펜촉 2개",
    meta: "역삼2동 · 4일 전",
    price: "10,000원",
    reaction: "♡ 4",
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=300&q=80"
  }
];

export default function HomePage() {
  return (
    <MobileShell>
      <section className="market-home">
        <header className="market-header">
          <button className="market-location" type="button" aria-label="지역 선택">
            대덕소마고
            <span>▾</span>
          </button>

          <div className="market-actions">
            <button className="icon-btn" type="button" aria-label="검색">
              ⌕
            </button>
            <button className="icon-btn" type="button" aria-label="필터">
              ☰
            </button>
            <button className="icon-btn" type="button" aria-label="알림">
              ◌
            </button>
          </div>
        </header>

        <section className="market-feed" aria-label="홈 상품 목록">
          {homeItems.map((item) => (
            <Link className="market-item" href={`/products/${item.id}`} key={item.id}>
              <img className="market-thumb" src={item.image} alt={item.title} />
              <div className="market-content">
                <p className="market-title">{item.title}</p>
                <p className="market-meta">{item.meta}</p>
                <p className="market-price">{item.price}</p>
                <p className="market-reaction">{item.reaction}</p>
              </div>
            </Link>
          ))}
        </section>

        <button className="market-write-btn" type="button" aria-label="글쓰기">
          +
        </button>

        <nav className="market-nav" aria-label="하단 메뉴">
          <Link href="/" className="market-nav-item market-nav-item-active">
            홈
          </Link>
          <Link href="/products" className="market-nav-item">
            둘러보기
          </Link>
          <Link href="/trade-requests/sent" className="market-nav-item">
            내 근처
          </Link>
          <Link href="/chats" className="market-nav-item">
            채팅
          </Link>
          <Link href="/mypage" className="market-nav-item">
            나의 WWT
          </Link>
        </nav>
      </section>
    </MobileShell>
  );
}
