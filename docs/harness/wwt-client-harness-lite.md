# WWT Client Lite Harness (v0)

## 1) 문서 목적

이 문서는 `wwt-api-spec.md`를 기반으로, 실제 구현 전에 클라이언트 팀이 같은 기준으로 개발하도록 만드는 라이트 하네스다.

완전한 테스트 하네스/CI 파이프라인이 아니라 아래를 먼저 고정한다.

- 제품 목표
- 사용자 흐름
- API 연동 규칙
- 클라이언트 상태/에러 처리 규칙
- 구현 우선순위와 완료 기준(DoD)

## 2) 서비스 목표

WWT v1은 "중고거래의 탐색-거래요청-채팅"을 하나의 흐름으로 연결하는 클라이언트를 만든다.

핵심 목표:

1. 신규 사용자가 이메일 인증 후 회원가입/로그인을 완료할 수 있어야 한다.
2. 사용자가 상품을 탐색/검색하고 상세를 확인할 수 있어야 한다.
3. 구매자가 거래 요청을 보내고, 판매자가 수락/거절할 수 있어야 한다.
4. 거래 대상 사용자끼리 채팅방을 열고 메시지를 주고받을 수 있어야 한다.
5. API 에러 코드를 기준으로 사용자에게 상황별 안내를 정확히 보여줘야 한다.

## 3) v1 범위

포함:

- 인증: signup/login/refresh/logout/me
- 상품: 목록/검색/상세/등록/수정/삭제/상태변경
- 거래요청: 생성/목록/수락/거절/내 요청
- 채팅: 방 생성, 목록, 메시지 CRUD

제외:

- WebSocket 실시간 채팅 (명세상 v1 제외)
- 결제/정산
- 추천/개인화

## 4) 사용자 흐름 (Happy Path)

1. 회원가입: 이메일 코드 발송 -> 코드 검증 -> 회원가입 완료
2. 로그인: accessToken + refreshToken 획득
3. 탐색: 상품 목록/검색 -> 상품 상세
4. 거래: 거래 요청 생성 -> 판매자 수락/거절
5. 채팅: 채팅방 생성(또는 기존 반환) -> 메시지 조회/등록

## 5) 클라이언트 라우트 제안

- `/auth/signup`
- `/auth/login`
- `/products`
- `/products/:productId`
- `/products/new`
- `/products/:productId/edit`
- `/trade-requests/sent`
- `/chats`
- `/chats/:chatRoomId`
- `/mypage`
- `/mypage/products`

## 6) 상태 모델

### 인증 상태

- `accessToken`은 메모리 우선, 새로고침 복구 전략은 보안정책에 맞게 제한
- `refreshToken`은 서버 정책(RFR) 준수
- `POST /api/auth/refresh` 성공 시 이전 refreshToken은 즉시 폐기 전제
- 재사용 탐지(`REFRESH_TOKEN_REUSE_DETECTED`) 시 강제 로그아웃

### 도메인 상태

- products: list/search/detail + pagination cache 분리
- tradeRequests: byProduct / sentList 분리
- chats: roomList / messageList(chatRoomId key)

## 7) API 연동 규칙

1. Base URL은 `/api`로 고정
2. 인증 필요 API는 `Authorization: Bearer {accessToken}` 필수
3. 페이지네이션 쿼리(`page`, `limit`)를 모든 리스트 화면에서 일관 적용
4. 서버 `code`를 1급 분기 키로 사용 (`message`는 표시 문구)
5. 401 처리 정책:
   - access 만료: refresh 시도
   - refresh 실패/재사용 탐지: 세션 초기화 + 로그인 화면 이동

## 8) 비즈니스 규칙 (클라이언트에서 반드시 반영)

1. 본인 상품에는 거래 요청 불가 (`SELF_TRADE_NOT_ALLOWED`)
2. 중복 대기 요청 불가 (`DUPLICATE_PENDING_TRADE_REQUEST`)
3. 상품 판매 완료 상태면 요청 불가 (`PRODUCT_ALREADY_SOLD`)
4. 거래 수락/거절은 `PENDING` 상태만 가능
5. 채팅 메시지 삭제 후 수정 불가 (`INVALID_CHAT_MESSAGE` 케이스)
6. 권한 없음(`FORBIDDEN`)은 동일한 UX 패턴으로 처리 (행동 차단 + 안내)

## 9) 에러 UX 규칙

- 필드 유효성(400): 인라인 에러 표시
- 인증(401): 재인증/로그인 유도
- 권한(403): 액션 버튼 비활성 + 이유 안내
- 없음(404): 빈 상태/뒤로가기 CTA
- 충돌(409): 현재 상태 반영 후 재시도 유도
- 서버(5xx): 공통 장애 토스트 + 재시도

## 10) 구현 우선순위

1. 인증 체인 (signup/login/refresh/logout)
2. 상품 조회 체인 (목록/검색/상세)
3. 거래요청 체인 (생성/수락/거절)
4. 채팅 체인 (방 생성/목록/메시지)
5. 상품 작성/수정/삭제 + 마이페이지

## 11) Definition of Done (Lite)

각 기능은 아래를 만족해야 완료로 본다.

1. 명세 endpoint와 동일한 요청/응답 필드 사용
2. 명세 `code` 단위 에러 분기 구현
3. 로딩/성공/실패 상태 UI가 존재
4. 페이지 새로고침 후 세션/캐시 정책이 의도대로 동작
5. 최소 E2E 시나리오 통과 (로그인 -> 상품조회 -> 거래요청 -> 채팅)

## 12) 다음 단계

1. 실제 프레임워크 선택 (예: Next.js + React Query + Zod)
2. API client/타입 생성 전략 확정 (수동 vs 코드생성)
3. Playwright 기반 핵심 유저 시나리오 자동화
4. CI에서 lint/typecheck/test 하네스 완성

## 13) 검색 기반 권장값 (2026-04-17 기준)

1. Next.js App Router에서는 서버 컴포넌트 우선 데이터 패칭을 기본으로 하고, 클라이언트 상호작용이 필요한 부분만 Client Component로 분리한다.
2. TanStack Query 기본값이 공격적으로 refetch하므로 `staleTime`/`gcTime`을 명시해 화면 깜빡임과 과도한 네트워크 요청을 줄인다.
3. Playwright 인증 상태는 `playwright/.auth`에 저장하고 `.gitignore`에 반드시 제외해 민감정보 유출을 방지한다.
4. JWT는 저장 위치/재발급/폐기 정책을 함께 다뤄야 하며, 본 명세의 RFR 정책을 기준으로 토큰 재사용 탐지 시 즉시 로그아웃 처리한다.
