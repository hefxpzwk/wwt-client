import Link from "next/link";

type AppTabBarProps = {
  active: "home" | "community" | "map" | "chats" | "my";
};

export function AppTabBar({ active }: AppTabBarProps) {
  const tabs = [
    { key: "home", label: "홈", href: "/products" },
    { key: "community", label: "판매", href: "/products/new" },
    { key: "map", label: "요청", href: "/trade-requests/sent" },
    { key: "chats", label: "채팅", href: "/chats" },
    { key: "my", label: "내정보", href: "/mypage" }
  ] as const;

  return (
    <nav className="tab-bar" aria-label="하단 탭 메뉴">
      {tabs.map((tab) => {
        const isActive = tab.key === active;
        return (
          <Link key={tab.key} href={tab.href} className={isActive ? "tab-item tab-item-active" : "tab-item"}>
            <span className="tab-dot" />
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
