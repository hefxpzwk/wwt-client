import { NextRequest } from "next/server";
import { db } from "@/mocks/db";
import { apiError, success } from "@/mocks/http";

type Context = {
  params: Promise<{ productId: string }>;
};

export async function GET(_request: NextRequest, context: Context): Promise<Response> {
  const { productId } = await context.params;
  const numericProductId = Number(productId);

  const product = db.products.find((candidate) => candidate.id === numericProductId);
  if (!product) {
    return apiError(404, "PRODUCT_NOT_FOUND", "상품을 찾을 수 없습니다.", `/api/products/${productId}`);
  }

  return success(product);
}
