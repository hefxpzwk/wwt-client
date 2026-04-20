# 프로젝트 초기 세팅 문서 (App v1)

## 목적

- API 명세 기반으로 모바일 앱 클라이언트를 구현하기 위한 초기 기준을 고정한다.
- 이 문서는 실제 코드 작업 전, 팀/에이전트가 동일한 전제를 공유하기 위한 기준 문서다.

## 범위

- 포함: 기술 스택 고정, 폴더 구조/도메인 경계, 구현 우선순위
- 제외: 실제 UI 코드 작성, 실제 API 호출 코드 작성

## 최종 결정 기술 스택

- Framework: React Native + Expo (managed workflow)
- Language: TypeScript strict mode
- Routing/Navigation: React Navigation
- Data Fetching: TanStack Query
- HTTP Client: Axios
- Validation: Zod
- Form: React Hook Form
- Global UI State: Zustand
- Secure Token Storage: `expo-secure-store`
- Testing (Unit/Integration): Jest + RNTL
- Testing (E2E, 추후): Detox

## 환경변수 정책

- `EXPO_PUBLIC_API_BASE_URL`: 백엔드 베이스 URL (`/api` prefix 포함 서버 URL)
- `EXPO_PUBLIC_APP_ENV`: `local | dev | prod`

## 도메인 경계

- `auth`: 회원가입, 로그인, 토큰 재발급, 로그아웃
- `users`: 내 정보, 내 상품 목록
- `products`: 상품 목록/검색/상세/등록/수정/삭제/상태변경
- `trades`: 거래요청 생성/조회/수락/거절/내 거래요청
- `chats`: 채팅방 생성/목록/메시지 CRUD(REST)

## 구현 순서 (v1)

1. 인증 흐름 (`auth`, `users/me`)
2. 상품 목록/검색/상세
3. 상품 등록/수정/삭제/상태 변경
4. 거래 요청/수락/거절
5. 채팅방 및 메시지 REST

## 레퍼런스 누락 화면 처리

- API 명세에 있고 레퍼런스 이미지가 없는 화면은 신규로 설계/구현한다.
- 신규 화면은 기존 레퍼런스에서 추출한 디자인 토큰(간격, 타이포, 컬러, 컴포넌트 규칙)을 반드시 따른다.
- 해당 화면은 `docs/REFERENCE_ASSETS.md`에서 상태를 `generated`로 기록 후 구현한다.

## 의사결정 로그 파일

- 추후 합의/변경 사항은 `docs/DECISIONS.md`에 추가한다.
