import { http } from "@/lib/http";
import {
  chatMessageSchema,
  chatMessagesResponseSchema,
  chatRoomSchema,
  chatRoomsResponseSchema,
  type ChatMessage,
  type ChatRoom
} from "@/features/chats/model/types";

export const chatsApi = {
  async getRooms(): Promise<{ items: ChatRoom[] }> {
    const result = await http<{ items: ChatRoom[]; meta: unknown }>("/chats?page=1&limit=20", {
      requiresAuth: true
    });

    return chatRoomsResponseSchema.parse(result);
  },

  async createRoom(payload: { productId: number; receiverId: number }): Promise<ChatRoom> {
    const result = await http<ChatRoom>("/chats", {
      method: "POST",
      body: payload,
      requiresAuth: true
    });

    return chatRoomSchema.parse(result);
  },

  async getMessages(chatRoomId: number): Promise<{ items: ChatMessage[] }> {
    const result = await http<{ items: ChatMessage[]; meta: unknown }>(`/chats/${chatRoomId}/messages?page=1&limit=20`, {
      requiresAuth: true
    });

    return chatMessagesResponseSchema.parse(result);
  },

  async sendMessage(chatRoomId: number, message: string): Promise<ChatMessage> {
    const result = await http<ChatMessage>(`/chats/${chatRoomId}/messages`, {
      method: "POST",
      body: { message },
      requiresAuth: true
    });

    return chatMessageSchema.parse(result);
  }
};
