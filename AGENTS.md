# AGENTS.md

## 1) 프로젝트 목표

- 이 저장소는 **중고거래 모바일 앱 클라이언트**를 개발한다.
- 백엔드는 [`docs/API.txt`](/home/hefxpzwk/dev/wwt-client/docs/API.txt) 기준 REST API를 사용한다.
- 디자인은 `referenceImage/` 폴더의 레퍼런스를 우선 반영한다.
- 현재 단계는 **초기 하네스(문서/원칙/구조) 고정**이며, 실제 화면 구현은 다음 단계에서 진행한다.

## 2) 고정 기술 스택 (v1)

- Runtime: React Native + Expo (managed)
- Language: TypeScript (strict)
- Navigation: React Navigation
- State (서버): TanStack Query
- State (로컬 UI): Zustand
- Networking: Axios (단일 API 클라이언트 계층)
- Validation: Zod
- Form: React Hook Form
- Storage (accessToken): 메모리 + 안전 스토리지
- Storage (refreshToken): 안전 스토리지 (`expo-secure-store`)
- Env: `EXPO_PUBLIC_API_BASE_URL`
- Date/Format: dayjs
- Test: Jest + React Native Testing Library
- E2E(추후): Detox

## 3) 코드/폴더 원칙

- API 계약 단일 출처: `docs/API.txt`
- 디자인 단일 출처: `referenceImage/*`
- 화면 구현 시 아래 구조를 기본으로 사용한다.

```txt
src/
  app/               # 엔트리, 네비게이션 루트
  screens/           # 화면 단위
  features/          # 도메인 단위(auth, products, trades, chats)
  entities/          # 타입/모델
  shared/
    api/             # axios client, interceptors, endpoint modules
    ui/              # 공통 컴포넌트
    lib/             # utils, constants
    store/           # zustand stores
```

## 4) 에이전트 실행 규칙

- API 스펙 임의 변경 금지. 불일치 발견 시 문서에 기록 후 확인 요청.
- 인증 API는 RFR(refresh-token rotation) 정책을 반드시 반영.
- 에러 처리 분기는 `code` 필드 기준으로 구현.
- WebSocket 채팅은 v1 제외. 메시지 API는 REST로 구현.
- 화면 착수 전 `docs/REFERENCE_ASSETS.md`의 매핑을 먼저 갱신한다.
- API에 존재하지만 레퍼런스 이미지가 없는 화면은 기존 레퍼런스의 레이아웃/컴포넌트/토큰을 재사용해 신규 설계한다.
- 임시 결정 사항은 `docs/DECISIONS.md`에 기록한다.

## 5) 작업 순서 (초기 표준)

1. API 명세를 도메인별(Auth/Users/Products/Trades/Chats)로 확인한다.
2. 레퍼런스 이미지를 화면 단위로 분류/이름 고정한다.
3. 도메인 타입/DTO를 먼저 작성한다.
4. API 클라이언트 + 에러 코드 매퍼를 만든다.
5. 화면 구현은 인증 > 상품 > 거래 > 채팅 순으로 진행한다.
6. 각 화면 완료 시 체크리스트를 업데이트한다.

## 6) 완료 기준 (Definition of Done)

- API 명세에 있는 필수 요청/응답 필드를 누락 없이 사용한다.
- 인증/권한/에러 코드 분기가 명세와 일치한다.
- 레퍼런스 이미지 대비 레이아웃/타이포/간격 규칙이 일관된다.
- 기본 테스트(렌더/핵심 훅/API 실패 케이스)가 통과한다.
