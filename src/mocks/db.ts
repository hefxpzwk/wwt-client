import type { ChatMessage, ChatRoom, Product, TradeRequest, User } from "@/mocks/types";

const now = new Date().toISOString();

const users: User[] = [
  {
    id: 1,
    email: "bluefish@wwt.dev",
    nickname: "bluefish",
    password: "password123",
    profileImageUrl: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=400&auto=format&fit=crop",
    joinedAt: "2025-06-02T09:00:00.000Z",
    locationName: "구성동",
    mannerTemp: 36.5
  },
  {
    id: 2,
    email: "buyer@wwt.dev",
    nickname: "정현맘",
    password: "password123",
    profileImageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop",
    joinedAt: "2025-01-11T09:00:00.000Z",
    locationName: "청당동",
    mannerTemp: 36.5
  }
];

const products: Product[] = [
  {
    id: 1,
    sellerId: 1,
    title: "블론 가디건 팔아요",
    description: "데일리 아우터로 예쁜 가디건입니다. 총장 60, 어깨 57",
    price: 7000,
    status: "ON_SALE",
    imageUrls: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop"],
    category: "여성의류",
    locationName: "구성동",
    createdAt: now,
    updatedAt: now,
    likes: 8,
    views: 42
  },
  {
    id: 2,
    sellerId: 2,
    title: "아이폰 6 거래할 분",
    description: "정상 작동, 생활기스 약간",
    price: 1,
    status: "RESERVED",
    imageUrls: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop"],
    category: "디지털기기",
    locationName: "청당동",
    createdAt: now,
    updatedAt: now,
    likes: 4,
    views: 27
  },
  {
    id: 3,
    sellerId: 1,
    title: "가족처럼 함께 일 하실 분 연락주세요",
    description: "시급 10,500원 알바 구인",
    price: 10500,
    status: "ON_SALE",
    imageUrls: ["https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop"],
    category: "알바",
    locationName: "구성동",
    createdAt: now,
    updatedAt: now,
    likes: 8,
    views: 8
  }
];

const tradeRequests: TradeRequest[] = [];
const chatRooms: ChatRoom[] = [
  {
    id: 1,
    productId: 3,
    buyerId: 1,
    sellerId: 2,
    lastMessage: "010 3807 1136입니다!",
    lastMessageAt: now
  }
];

const chatMessages: ChatMessage[] = [
  {
    id: 1,
    chatRoomId: 1,
    senderId: 2,
    message: "전화번호 남기시면 연락드릴게요",
    createdAt: now,
    updatedAt: now,
    deletedAt: null
  },
  {
    id: 2,
    chatRoomId: 1,
    senderId: 1,
    message: "010 3807 1136입니다!",
    createdAt: now,
    updatedAt: now,
    deletedAt: null
  }
];

const refreshToUserId = new Map<string, number>();
const revokedRefreshTokens = new Set<string>();

let tradeRequestIdSequence = 1;
let chatRoomIdSequence = 2;
let chatMessageIdSequence = 3;
let userIdSequence = 2;

function randomToken(prefix: string, userId: number): string {
  const randomPart = Math.random().toString(36).slice(2);
  return `${prefix}-${userId}-${Date.now()}-${randomPart}`;
}

export const db = {
  users,
  products,
  tradeRequests,
  chatRooms,
  chatMessages,
  addUser(input: { email: string; nickname: string; password: string }) {
    userIdSequence += 1;

    const user = {
      id: userIdSequence,
      email: input.email,
      nickname: input.nickname,
      password: input.password,
      profileImageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop",
      joinedAt: new Date().toISOString(),
      locationName: "미설정",
      mannerTemp: 36.5
    };

    users.push(user);
    return user;
  },
  issueTokens(userId: number): { accessToken: string; refreshToken: string } {
    const accessToken = randomToken("access", userId);
    const refreshToken = randomToken("refresh", userId);
    refreshToUserId.set(refreshToken, userId);
    return { accessToken, refreshToken };
  },
  rotateRefreshToken(refreshToken: string): { accessToken: string; refreshToken: string; userId: number } | null {
    if (revokedRefreshTokens.has(refreshToken)) {
      return null;
    }

    const userId = refreshToUserId.get(refreshToken);
    if (!userId) {
      return null;
    }

    refreshToUserId.delete(refreshToken);
    revokedRefreshTokens.add(refreshToken);
    const newTokens = this.issueTokens(userId);

    return { ...newTokens, userId };
  },
  revokeRefreshToken(refreshToken: string): boolean {
    const existed = refreshToUserId.delete(refreshToken);
    revokedRefreshTokens.add(refreshToken);
    return existed;
  },
  isRevokedRefreshToken(refreshToken: string): boolean {
    return revokedRefreshTokens.has(refreshToken);
  },
  nextTradeRequestId(): number {
    tradeRequestIdSequence += 1;
    return tradeRequestIdSequence;
  },
  nextChatRoomId(): number {
    chatRoomIdSequence += 1;
    return chatRoomIdSequence;
  },
  nextChatMessageId(): number {
    chatMessageIdSequence += 1;
    return chatMessageIdSequence;
  }
};
