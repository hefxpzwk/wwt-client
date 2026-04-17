export const queryKeys = {
  me: ["auth", "me"] as const,
  products: (page: number, limit: number) => ["products", "list", page, limit] as const,
  product: (productId: number) => ["products", "detail", productId] as const,
  myTradeRequests: ["trade-requests", "me"] as const,
  chatRooms: ["chats", "rooms"] as const,
  chatMessages: (chatRoomId: number) => ["chats", "messages", chatRoomId] as const
};
