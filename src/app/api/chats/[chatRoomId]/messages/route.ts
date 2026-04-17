import { NextRequest } from "next/server";
import { requireUserIdFromAuthHeader } from "@/mocks/auth";
import { db } from "@/mocks/db";
import { apiError, success } from "@/mocks/http";

type Context = {
  params: Promise<{ chatRoomId: string }>;
};

export async function GET(request: NextRequest, context: Context): Promise<Response> {
  const { chatRoomId } = await context.params;
  const path = `/api/chats/${chatRoomId}/messages`;

  const userIdOrResponse = requireUserIdFromAuthHeader(request.headers.get("authorization"), path);
  if (userIdOrResponse instanceof Response) {
    return userIdOrResponse;
  }

  const roomId = Number(chatRoomId);
  const room = db.chatRooms.find((candidate) => candidate.id === roomId);
  if (!room) {
    return apiError(404, "CHAT_ROOM_NOT_FOUND", "채팅방을 찾을 수 없습니다.", path);
  }

  if (room.buyerId !== userIdOrResponse && room.sellerId !== userIdOrResponse) {
    return apiError(403, "FORBIDDEN", "채팅방 메시지를 조회할 권한이 없습니다.", path);
  }

  const items = db.chatMessages.filter((message) => message.chatRoomId === roomId);

  return success({
    items,
    meta: {
      page: 1,
      limit: 20,
      total: items.length,
      totalPages: 1
    }
  });
}

export async function POST(request: NextRequest, context: Context): Promise<Response> {
  const { chatRoomId } = await context.params;
  const path = `/api/chats/${chatRoomId}/messages`;

  const userIdOrResponse = requireUserIdFromAuthHeader(request.headers.get("authorization"), path);
  if (userIdOrResponse instanceof Response) {
    return userIdOrResponse;
  }

  const roomId = Number(chatRoomId);
  const room = db.chatRooms.find((candidate) => candidate.id === roomId);
  if (!room) {
    return apiError(404, "CHAT_ROOM_NOT_FOUND", "채팅방을 찾을 수 없습니다.", path);
  }

  if (room.buyerId !== userIdOrResponse && room.sellerId !== userIdOrResponse) {
    return apiError(403, "FORBIDDEN", "채팅방에 메시지를 등록할 권한이 없습니다.", path);
  }

  const body = await request.json().catch(() => null) as { message?: string } | null;
  if (!body?.message?.trim()) {
    return apiError(400, "INVALID_CHAT_MESSAGE", "메시지 내용이 올바르지 않습니다.", path);
  }

  const message = {
    id: db.nextChatMessageId(),
    chatRoomId: roomId,
    senderId: userIdOrResponse,
    message: body.message.trim(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null
  };

  db.chatMessages.push(message);
  room.lastMessage = message.message;
  room.lastMessageAt = message.createdAt;

  return success(message, 201);
}
