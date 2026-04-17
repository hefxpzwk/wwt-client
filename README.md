# WWT Client

WWT 중고거래 서비스 클라이언트 레포입니다.

## 빠른 시작

```bash
npm install
npm run dev
```

- 기본 URL: `http://localhost:3000`
- 기본 API Base URL: `/api` (Next.js Route Handler mock API 내장)
- 데모 로그인 계정:
  - 이메일: `bluefish@wwt.dev`
  - 비밀번호: `password123`

## 기술 스택(초기 세팅 확정)

- Next.js (App Router) + TypeScript
- TanStack Query
- Zustand (인증 상태)
- Zod (요청/응답 검증)
- Vitest + Testing Library
- Playwright (E2E 스모크)

## 구현 범위 (2026-04-17)

- 모바일 프레임형 UI 레이아웃 (디자인 레퍼런스 반영)
- 인증/상품/거래요청/채팅 mock API route handler
- 공통 HTTP 클라이언트 (`code` 기반 에러 분기 + 401 refresh 재시도)
- 주요 화면:
  - `/auth/login`
  - `/products`, `/products/:productId`
  - `/trade-requests/sent`
  - `/chats`, `/chats/:chatRoomId`
  - `/mypage`

## 테스트

```bash
npm run typecheck
npm run lint
npm run test
npm run test:e2e
```

## 핵심 문서

- API 명세: [wwt-api-spec.md](./wwt-api-spec.md)
- 에이전트 운영 기준: [AGENTS.md](./AGENTS.md)
- 에이전트 워크플로우: [docs/agents/agent-workflow.md](./docs/agents/agent-workflow.md)
- 개발 하네스 본문: [docs/harness/development-harness.md](./docs/harness/development-harness.md)
- 하네스 런북: [docs/harness/runbook.md](./docs/harness/runbook.md)
- 기존 라이트 하네스: [docs/harness/wwt-client-harness-lite.md](./docs/harness/wwt-client-harness-lite.md)
- 스킬/검색 운영: [docs/harness/skills-and-search-plan.md](./docs/harness/skills-and-search-plan.md)

## 템플릿

- 결정 로그: [docs/harness/templates/decision-log.md](./docs/harness/templates/decision-log.md)
- 테스트 시나리오: [docs/harness/templates/test-scenario.md](./docs/harness/templates/test-scenario.md)

## 현재 상태

- 하네스 운영 문서 세팅 완료
- 에이전트 문서 세팅 완료
- 구현 시작 전 표준 체크리스트/템플릿 준비 완료
