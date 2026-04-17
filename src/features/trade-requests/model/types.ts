import { z } from "zod";

export const tradeRequestSchema = z.object({
  id: z.number(),
  productId: z.number(),
  requesterId: z.number(),
  sellerId: z.number(),
  status: z.enum(["PENDING", "ACCEPTED", "REJECTED"]),
  createdAt: z.string()
});

export type TradeRequest = z.infer<typeof tradeRequestSchema>;
