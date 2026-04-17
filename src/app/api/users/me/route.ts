import { NextRequest } from "next/server";
import { db } from "@/mocks/db";
import { requireUserIdFromAuthHeader } from "@/mocks/auth";
import { apiError, success } from "@/mocks/http";

export async function GET(request: NextRequest): Promise<Response> {
  const path = "/api/users/me";
  const userIdOrResponse = requireUserIdFromAuthHeader(request.headers.get("authorization"), path);
  if (userIdOrResponse instanceof Response) {
    return userIdOrResponse;
  }

  const user = db.users.find((candidate) => candidate.id === userIdOrResponse);
  if (!user) {
    return apiError(404, "USER_NOT_FOUND", "사용자를 찾을 수 없습니다.", path);
  }

  return success({
    id: user.id,
    email: user.email,
    nickname: user.nickname,
    profileImageUrl: user.profileImageUrl,
    joinedAt: user.joinedAt,
    locationName: user.locationName,
    mannerTemp: user.mannerTemp
  });
}
