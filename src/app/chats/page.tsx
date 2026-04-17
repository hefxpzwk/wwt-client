"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { AppTabBar } from "@/components/app-tab-bar";
import { ErrorNotice } from "@/components/error-notice";
import { MobileShell } from "@/components/mobile-shell";
import { TopBar } from "@/components/top-bar";
import { chatsApi } from "@/features/chats/api/chats-api";
import { queryKeys } from "@/features/common/model/query-keys";
import { ApiError } from "@/lib/errors";

export default function ChatsPage() {
  const roomsQuery = useQuery({
    queryKey: queryKeys.chatRooms,
    queryFn: () => chatsApi.getRooms()
  });

  const error = roomsQuery.error instanceof ApiError ? roomsQuery.error : null;

  return (
    <MobileShell>
      <TopBar title="채팅" rightSlot={<Link href="/auth/login">인증</Link>} />

      <section className="scroll-area stack">
        {roomsQuery.isLoading && <p className="subtle">채팅방을 불러오는 중입니다...</p>}

        {roomsQuery.isSuccess && roomsQuery.data.items.length === 0 && (
          <p className="subtle">아직 채팅방이 없습니다.</p>
        )}

        {roomsQuery.isSuccess &&
          roomsQuery.data.items.map((room) => (
            <Link href={`/chats/${room.id}`} className="chat-row" key={room.id}>
              <img
                className="avatar"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop"
                alt="avatar"
              />
              <div className="stack" style={{ gap: "4px" }}>
                <p className="title" style={{ fontSize: "17px" }}>
                  채팅방 #{room.id}
                </p>
                <p>{room.lastMessage || "메시지가 없습니다."}</p>
                <p className="subtle">상품 #{room.productId}</p>
              </div>
            </Link>
          ))}

        <ErrorNotice code={error?.code} message={error?.message} />
      </section>

      <AppTabBar active="chats" />
    </MobileShell>
  );
}
