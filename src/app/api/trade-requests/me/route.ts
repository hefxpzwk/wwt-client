import { NextRequest } from "next/server";
import { requireUserIdFromAuthHeader } from "@/mocks/auth";
import { db } from "@/mocks/db";
import { success } from "@/mocks/http";

export async function GET(request: NextRequest): Promise<Response> {
  const path = "/api/trade-requests/me";
  const userIdOrResponse = requireUserIdFromAuthHeader(request.headers.get("authorization"), path);
  if (userIdOrResponse instanceof Response) {
    return userIdOrResponse;
  }

  const items = db.tradeRequests.filter((tradeRequest) => tradeRequest.requesterId === userIdOrResponse);

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
