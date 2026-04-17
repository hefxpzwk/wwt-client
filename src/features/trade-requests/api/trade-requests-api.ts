import { http } from "@/lib/http";
import { tradeRequestSchema, type TradeRequest } from "@/features/trade-requests/model/types";

export const tradeRequestsApi = {
  async create(productId: number): Promise<TradeRequest> {
    const result = await http<TradeRequest>(`/products/${productId}/trade-requests`, {
      method: "POST",
      requiresAuth: true
    });

    return tradeRequestSchema.parse(result);
  },

  async mine(): Promise<{ items: TradeRequest[] }> {
    const result = await http<{ items: TradeRequest[]; meta: unknown }>("/trade-requests/me?page=1&limit=20", {
      requiresAuth: true
    });

    return result;
  }
};
