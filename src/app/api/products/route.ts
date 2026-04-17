import { NextRequest } from "next/server";
import { db } from "@/mocks/db";
import { apiError, success } from "@/mocks/http";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;

export async function GET(request: NextRequest): Promise<Response> {
  const path = "/api/products";
  const pageParam = request.nextUrl.searchParams.get("page");
  const limitParam = request.nextUrl.searchParams.get("limit");

  const page = pageParam ? Number(pageParam) : DEFAULT_PAGE;
  const limit = limitParam ? Number(limitParam) : DEFAULT_LIMIT;

  if (!Number.isInteger(page) || page < 1) {
    return apiError(400, "INVALID_PRODUCTS_PAGE", "page는 1 이상의 숫자여야 합니다.", path);
  }

  if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
    return apiError(400, "INVALID_PRODUCTS_LIMIT", "상품 개수는 1 이상 100 이하의 숫자여야 합니다.", path);
  }

  const offset = (page - 1) * limit;
  const items = db.products.slice(offset, offset + limit);

  return success({
    items,
    meta: {
      page,
      limit,
      total: db.products.length,
      totalPages: Math.max(1, Math.ceil(db.products.length / limit))
    }
  });
}
