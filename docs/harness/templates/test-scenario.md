# Test Scenario Template

## 시나리오 이름

- 목적:
- 사전 조건:
- 입력 데이터:

## 절차

1. 
2. 
3. 

## 기대 결과

- 

## 에러 케이스

- 401:
- 403:
- 404:
- 409:
- 5xx:

---

## 시나리오 이름

- 목적: 초기 세팅 이후 기본 라우팅/조회 UI 및 테스트 하네스가 정상 동작하는지 검증한다.
- 사전 조건:
  - `npm install` 완료
  - `.env.local` 미설정 시 기본 API Base URL(`/api`) 사용
- 입력 데이터:
  - 로그인 입력값(유효/무효 이메일)
  - 상품 목록 API 응답(성공/실패)

## 절차

1. `npm run test`를 실행해 단위 테스트를 통과한다.
2. `npm run dev` 실행 후 `/`에서 `상품 목록` 링크 이동을 확인한다.
3. `/auth/login`에서 이메일/비밀번호 입력 후 로그인 요청을 시도한다.
4. `/products`에서 로딩/성공/실패 UI 중 하나가 정상 렌더링되는지 확인한다.
5. `npm run test:e2e`로 홈->상품목록 스모크 시나리오를 실행한다.

## 기대 결과

- Vitest 테스트가 모두 통과한다.
- Playwright 스모크 테스트가 통과한다.
- 로그인/상품 목록 화면에서 오류 발생 시 `code` 기준으로 에러 메시지가 노출된다.
- API 401 응답 시 refresh 시도 로직이 동작하고, refresh 실패 코드에 따라 세션이 정리된다.

## 에러 케이스

- 401:
  - `UNAUTHORIZED` 시 refresh 재시도
  - `INVALID_REFRESH_TOKEN`, `EXPIRED_REFRESH_TOKEN`, `REFRESH_TOKEN_REUSE_DETECTED` 시 세션 정리
- 403:
  - 공통 `FORBIDDEN` 메시지 노출
- 404:
  - `PRODUCT_NOT_FOUND`, `CHAT_ROOM_NOT_FOUND` 등 코드 기반 메시지 처리
- 409:
  - `DUPLICATE_PENDING_TRADE_REQUEST`, `SELF_TRADE_NOT_ALLOWED` 분기 기반 재시도 안내
- 5xx:
  - 공통 서버 장애 메시지 및 재시도 유도
