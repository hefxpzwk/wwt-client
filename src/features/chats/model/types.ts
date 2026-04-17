import { z } from "zod";

export const chatRoomSchema = z.object({
  id: z.number(),
  productId: z.number(),
  buyerId: z.number(),
  sellerId: z.number(),
  lastMessage: z.string(),
  lastMessageAt: z.string()
});

export const chatMessageSchema = z.object({
  id: z.number(),
  chatRoomId: z.number(),
  senderId: z.number(),
  message: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable()
});

const metaSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  totalPages: z.number()
});

export const chatRoomsResponseSchema = z.object({
  items: z.array(chatRoomSchema),
  meta: metaSchema
});

export const chatMessagesResponseSchema = z.object({
  items: z.array(chatMessageSchema),
  meta: metaSchema
});

export type ChatRoom = z.infer<typeof chatRoomSchema>;
export type ChatMessage = z.infer<typeof chatMessageSchema>;
