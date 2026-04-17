# Skills And Search Plan

## 1) 설치한 Skills

클라이언트 최적화를 위해 아래 스킬을 추가했다.

1. `frontend-skill`
2. `playwright`
3. `security-best-practices`

설치 위치:

- `~/.codex/skills/frontend-skill`
- `~/.codex/skills/playwright`
- `~/.codex/skills/security-best-practices`

주의:

- 새로 설치한 스킬을 Codex 세션에서 100% 반영하려면 Codex 재시작이 필요하다.

## 2) 검색(리서치) 체크리스트

구현 시작 전에 아래를 검색/검증하고 결정 기록을 남긴다.

1. Next.js App Router + React Query 최신 권장 패턴
2. JWT + Refresh Token(RFR) 클라이언트 보관/갱신 보안 패턴
3. REST 에러 코드 매핑 UX 패턴 (401/403/409 우선)
4. Playwright 로그인 세션 유지/격리 베스트 프랙티스
5. 한국어 중고거래 서비스의 검색/필터 UX 패턴

## 3) 결정 로그 템플릿

아래 형식으로 문서 하단에 계속 누적한다.

- 날짜:
- 주제:
- 후보안:
- 선택안:
- 근거:
- 영향 범위:
- 후속 작업:

## 4) 클라이언트 최적 상태(문서 기준)

초기 구현 전에 최소 아래가 준비된 상태를 목표로 한다.

1. 기능 범위와 제외 범위 합의 완료
2. API 에러 코드 분기 정책 합의 완료
3. 화면 라우트/상태 모델 합의 완료
4. 인증 토큰 정책(RFR) 처리 방식 합의 완료
5. E2E 기준 시나리오 1개 이상 정의 완료

## 5) 검색 소스 (2026-04-17 확인)

1. Next.js App Router 데이터 패칭: https://nextjs.org/learn/dashboard-app/fetching-data
2. Playwright 인증 가이드: https://playwright.dev/python/docs/auth
3. OWASP JWT Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html

## 6) 즉시 적용할 운영 규칙

1. 인증 상태 파일/토큰 값은 어떤 형태로도 Git에 커밋하지 않는다.
2. API 에러 처리 분기는 `message`가 아니라 `code` 기준으로 구현한다.
3. 검색/리스트 화면은 Query Key를 명확히 분리해 캐시 오염을 막는다.
4. 스킬 기반 자동화 작업 전후로 결정 로그를 남겨 팀 합의 비용을 줄인다.
