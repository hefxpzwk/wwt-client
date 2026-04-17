import { NextRequest } from "next/server";
import { requireUserIdFromAuthHeader } from "@/mocks/auth";
import { db } from "@/mocks/db";
import { apiError, success } from "@/mocks/http";

type Context = {
  params: Promise<{ productId: string }>;
};

export async function POST(request: NextRequest, context: Context): Promise<Response> {
  const { productId } = await context.params;
  const path = `/api/products/${productId}/trade-requests`;

  const userIdOrResponse = requireUserIdFromAuthHeader(request.headers.get("authorization"), path);
  if (userIdOrResponse instanceof Response) {
    return userIdOrResponse;
  }

  const numericProductId = Number(productId);
  const product = db.products.find((candidate) => candidate.id === numericProductId);
  if (!product) {
    return apiError(404, "PRODUCT_NOT_FOUND", "상품을 찾을 수 없습니다.", path);
  }

  if (product.sellerId === userIdOrResponse) {
    return apiError(409, "SELF_TRADE_NOT_ALLOWED", "자신의 상품에는 거래 요청할 수 없습니다.", path);
  }

  if (product.status === "SOLD") {
    return apiError(409, "PRODUCT_ALREADY_SOLD", "판매 완료된 상품입니다.", path);
  }

  const duplicate = db.tradeRequests.find(
    (candidate) =>
      candidate.productId === product.id &&
      candidate.requesterId === userIdOrResponse &&
      candidate.status === "PENDING"
  );

  if (duplicate) {
    return apiError(409, "DUPLICATE_PENDING_TRADE_REQUEST", "이미 대기 중인 거래 요청이 있습니다.", path);
  }

  const tradeRequest = {
    id: db.nextTradeRequestId(),
    productId: product.id,
    requesterId: userIdOrResponse,
    sellerId: product.sellerId,
    status: "PENDING" as const,
    createdAt: new Date().toISOString()
  };

  db.tradeRequests.push(tradeRequest);
  return success(tradeRequest, 201);
}
