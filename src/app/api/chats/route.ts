import { NextRequest } from "next/server";
import { requireUserIdFromAuthHeader } from "@/mocks/auth";
import { db } from "@/mocks/db";
import { apiError, success } from "@/mocks/http";

export async function GET(request: NextRequest): Promise<Response> {
  const path = "/api/chats";
  const userIdOrResponse = requireUserIdFromAuthHeader(request.headers.get("authorization"), path);
  if (userIdOrResponse instanceof Response) {
    return userIdOrResponse;
  }

  const items = db.chatRooms.filter(
    (chatRoom) => chatRoom.buyerId === userIdOrResponse || chatRoom.sellerId === userIdOrResponse
  );

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

export async function POST(request: NextRequest): Promise<Response> {
  const path = "/api/chats";
  const userIdOrResponse = requireUserIdFromAuthHeader(request.headers.get("authorization"), path);
  if (userIdOrResponse instanceof Response) {
    return userIdOrResponse;
  }

  const body = await request.json().catch(() => null) as { productId?: number; receiverId?: number } | null;

  if (!body?.productId) {
    return apiError(400, "MISSING_CHAT_PRODUCT_ID", "productId는 필수입니다.", path);
  }

  if (!body.receiverId) {
    return apiError(400, "MISSING_CHAT_RECEIVER_ID", "receiverId는 필수입니다.", path);
  }

  const product = db.products.find((candidate) => candidate.id === body.productId);
  if (!product) {
    return apiError(404, "PRODUCT_NOT_FOUND", "상품을 찾을 수 없습니다.", path);
  }

  if (body.receiverId === userIdOrResponse) {
    return apiError(409, "SELF_TRADE_NOT_ALLOWED", "자기 자신과 채팅방을 만들 수 없습니다.", path);
  }

  const existing = db.chatRooms.find(
    (candidate) =>
      candidate.productId === body.productId &&
      ((candidate.buyerId === userIdOrResponse && candidate.sellerId === body.receiverId) ||
        (candidate.buyerId === body.receiverId && candidate.sellerId === userIdOrResponse))
  );

  if (existing) {
    return success(existing);
  }

  const newRoom = {
    id: db.nextChatRoomId(),
    productId: body.productId,
    buyerId: userIdOrResponse,
    sellerId: body.receiverId,
    lastMessage: "",
    lastMessageAt: new Date().toISOString()
  };

  db.chatRooms.push(newRoom);
  return success(newRoom, 201);
}
