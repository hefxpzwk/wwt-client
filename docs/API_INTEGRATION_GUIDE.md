# API 연동 가이드 (API.txt 기준)

## 소스 오브 트루스

- 원본 명세: [`docs/API.txt`](/home/hefxpzwk/dev/wwt-client/docs/API.txt)
- Base Path: `/api`
- 인증: `Authorization: Bearer {accessToken}`

## 인증 정책

- 토큰 구조: `accessToken + refreshToken`
- refresh 방식: RFR (사용 시 refreshToken 교체)
- 클라이언트 규칙 1: 401 발생 시 refresh 1회 시도
- 클라이언트 규칙 2: refresh 성공 시 원요청 재시도
- 클라이언트 규칙 3: refresh 실패/재사용 감지(`REFRESH_TOKEN_REUSE_DETECTED`) 시 즉시 로그아웃 처리

## 에러 처리 규칙

- HTTP status와 별개로 `code` 기준 분기 필수
- 사용자 문구는 API `message` 우선 사용
- 공통 에러 타입 예시: 인증/토큰 오류, 권한 오류, 검증 실패, 리소스 없음, 상태 충돌

## 도메인별 엔드포인트 그룹

- Auth
- `POST /api/auth/signup/email-code`
- `POST /api/auth/signup/email-code/verify`
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- Users
- `GET /api/users/me`
- `GET /api/users/me/products`
- Products
- `GET /api/products`
- `GET /api/products/search`
- `GET /api/products/{productId}`
- `POST /api/products`
- `PATCH /api/products/{productId}`
- `DELETE /api/products/{productId}`
- `PATCH /api/products/{productId}/status`
- Trades
- `POST /api/products/{productId}/trade-requests`
- `GET /api/products/{productId}/trade-requests`
- `PATCH /api/trade-requests/{tradeRequestId}/accept`
- `PATCH /api/trade-requests/{tradeRequestId}/reject`
- `GET /api/trade-requests/me`
- Chats
- `POST /api/chats`
- `GET /api/chats`
- `GET /api/chats/{chatRoomId}/messages`
- `POST /api/chats/{chatRoomId}/messages`
- `PATCH /api/chats/{chatRoomId}/messages/{messageId}`
- `DELETE /api/chats/{chatRoomId}/messages/{messageId}`

## 구현 체크포인트

- 숫자 query 파라미터(page/limit/price)는 타입 변환과 경계값 검증을 함께 처리
- 상품 상태값/거래 상태값 enum은 API 정의값과 1:1 매핑
- 이미지 필드는 URL 문자열 배열 정책 유지
- 채팅 v1은 REST만 사용 (WebSocket 미사용)
