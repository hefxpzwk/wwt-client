# Decision Log Template

- 날짜:
- 담당:
- 주제:
- 후보안:
- 선택안:
- 선택 이유:
- 영향 범위:
- 롤백 전략:
- 후속 작업:

---

- 날짜: 2026-04-17
- 담당: Codex(Client Agent 겸 QA Agent)
- 주제: WWT 클라이언트 초기 세팅(프로젝트/상태/API/테스트 하네스)
- 후보안:
  - Vite + React SPA
  - Next.js App Router + React Query
- 선택안: Next.js App Router + TypeScript + TanStack Query + Zod + Zustand + Vitest + Playwright
- 선택 이유:
  - 하네스 문서의 권장 방향(Next.js App Router)과 일치
  - API 명세 기반 코드 분기(`code`)와 상태 모델(auth/products) 뼈대 구성에 유리
  - 초기 단계에서 단위 테스트 + E2E 스모크 테스트를 함께 구성하기 적합
- 영향 범위:
  - 루트 실행 환경(`package.json`, `tsconfig`, `next.config`)
  - 기본 라우트 및 플레이스홀더 페이지
  - 공통 HTTP 클라이언트/에러 모델/인증 토큰 스토어
  - 테스트 실행 기반(Vitest, Playwright)
- 롤백 전략:
  - 초기 세팅 커밋 단위로 롤백 가능
  - 도메인 API 모듈은 독립 파일로 분리해 프레임워크 교체 시 점진 마이그레이션 가능
- 후속 작업:
  - 인증 체인(회원가입/로그인/리프레시/로그아웃) 화면 완성
  - 상품 상세/검색/거래 요청/채팅 API 및 UI 단계 구현

---

- 날짜: 2026-04-17
- 담당: Codex(Client Agent 겸 QA Agent)
- 주제: `docs/order.md` 기준 구현 점검 후 회원가입 체인 누락 보완
- 후보안:
  - 현재 상태 유지(회원가입 페이지 안내문만 제공)
  - 회원가입 UI + signup API mock 엔드포인트까지 구현
- 선택안: 회원가입 UI + `/api/auth/signup/*` 엔드포인트 추가
- 선택 이유:
  - `order.md` 3단계의 "UI 이후 로직/API 연결" 요구 충족
  - API 명세의 인증 endpoint 범위를 클라이언트에서 직접 검증 가능
- 영향 범위:
  - `src/app/auth/signup/page.tsx`
  - `src/app/api/auth/signup/**`
  - `src/mocks/db.ts`, `src/mocks/signup.ts`
- 롤백 전략:
  - 신규 파일(`src/mocks/signup.ts`, signup route) 단위로 개별 롤백 가능
  - 기존 로그인/리프레시/로그아웃 체인과 파일 경로 분리되어 영향 최소
- 후속 작업:
  - 회원가입 성공/실패 케이스(API route) 단위 테스트 추가
