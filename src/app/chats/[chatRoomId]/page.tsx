"use client";

import { FormEvent, useState } from "react";
import { useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ErrorNotice } from "@/components/error-notice";
import { MobileShell } from "@/components/mobile-shell";
import { TopBar } from "@/components/top-bar";
import { chatsApi } from "@/features/chats/api/chats-api";
import { queryKeys } from "@/features/common/model/query-keys";
import { useAuthStore } from "@/features/auth/model/use-auth-store";
import { ApiError } from "@/lib/errors";

export default function ChatRoomPage() {
  const params = useParams<{ chatRoomId: string }>();
  const chatRoomId = Number(params.chatRoomId);
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");
  const me = useAuthStore((state) => state.user);

  const messagesQuery = useQuery({
    queryKey: queryKeys.chatMessages(chatRoomId),
    queryFn: () => chatsApi.getMessages(chatRoomId)
  });

  const sendMutation = useMutation({
    mutationFn: () => chatsApi.sendMessage(chatRoomId, message),
    onSuccess: () => {
      setMessage("");
      queryClient.invalidateQueries({ queryKey: queryKeys.chatMessages(chatRoomId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.chatRooms });
    }
  });

  const error =
    (messagesQuery.error instanceof ApiError && messagesQuery.error) ||
    (sendMutation.error instanceof ApiError && sendMutation.error) ||
    null;

  function onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    sendMutation.mutate();
  }

  return (
    <MobileShell>
      <TopBar title={`채팅방 #${chatRoomId}`} />

      <section className="scroll-area stack">
        {messagesQuery.isSuccess &&
          messagesQuery.data.items.map((item) => {
            const isMine = me ? item.senderId === me.id : item.senderId === 1;
            return (
              <div key={item.id} className="stack" style={{ gap: "6px" }}>
                <div className={isMine ? "chat-bubble chat-bubble-me" : "chat-bubble chat-bubble-you"}>{item.message}</div>
                <p className="tiny">{new Date(item.createdAt).toLocaleTimeString("ko-KR")}</p>
              </div>
            );
          })}

        {messagesQuery.isLoading && <p className="subtle">메시지를 불러오는 중입니다...</p>}
        <ErrorNotice code={error?.code} message={error?.message} />
      </section>

      <form className="message-input-wrap" onSubmit={onSubmit}>
        <input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="메시지 보내기" />
        <button className="btn-primary" type="submit" disabled={sendMutation.isPending || !message.trim()}>
          전송
        </button>
      </form>
    </MobileShell>
  );
}
