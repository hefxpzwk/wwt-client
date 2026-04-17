export type ProductStatus = "ON_SALE" | "RESERVED" | "SOLD";

export type User = {
  id: number;
  email: string;
  nickname: string;
  password: string;
  profileImageUrl: string;
  joinedAt: string;
  locationName: string;
  mannerTemp: number;
};

export type Product = {
  id: number;
  sellerId: number;
  title: string;
  description: string;
  price: number;
  status: ProductStatus;
  imageUrls: string[];
  category: string;
  locationName: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  views: number;
};

export type TradeRequestStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export type TradeRequest = {
  id: number;
  productId: number;
  requesterId: number;
  sellerId: number;
  status: TradeRequestStatus;
  createdAt: string;
};

export type ChatRoom = {
  id: number;
  productId: number;
  buyerId: number;
  sellerId: number;
  lastMessage: string;
  lastMessageAt: string;
};

export type ChatMessage = {
  id: number;
  chatRoomId: number;
  senderId: number;
  message: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};
