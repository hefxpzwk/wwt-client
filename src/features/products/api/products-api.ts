import { http } from "@/lib/http";
import { productSchema, productsResponseSchema, type Product, type ProductsResponse } from "@/features/products/model/types";

type ProductsQuery = {
  page?: number;
  limit?: number;
};

function toQueryString(params: ProductsQuery): string {
  const query = new URLSearchParams();
  if (params.page) {
    query.set("page", String(params.page));
  }

  if (params.limit) {
    query.set("limit", String(params.limit));
  }

  return query.toString();
}

export const productsApi = {
  async getProducts(params: ProductsQuery = {}): Promise<ProductsResponse> {
    const queryString = toQueryString(params);
    const path = queryString ? `/products?${queryString}` : "/products";
    const result = await http<ProductsResponse>(path);
    return productsResponseSchema.parse(result);
  },

  async getProduct(productId: number): Promise<Product> {
    const result = await http<Product>(`/products/${productId}`);
    return productSchema.parse(result);
  }
};
