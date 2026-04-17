# WWT Agents Guide

이 문서는 WWT 클라이언트 레포에서 에이전트(사람/AI)가 같은 방식으로 개발하기 위한 운영 기준이다.

## 1. 목적

- API 명세(`wwt-api-spec.md`)와 구현의 괴리를 줄인다.
- 작업 단위를 작게 나눠 병렬 개발이 가능하게 만든다.
- PR 리뷰 시 확인 기준을 표준화한다.

## 2. 공통 원칙

1. 모든 기능은 명세의 endpoint/에러코드 기준으로 구현한다.
2. 에러 분기는 `message`가 아니라 `code`로 처리한다.
3. 인증 관련 변경은 RFR(refresh token rotation) 규칙을 깨면 안 된다.
4. UI/상태/테스트 변경은 함께 제출한다(코드만 단독 금지).

## 3. 에이전트 역할

- `Product Agent`: 요구사항 정리, 범위/완료조건 확정
- `Client Agent`: 화면/상태/API 연동 구현
- `QA Agent`: 시나리오/회귀 테스트 작성 및 검증
- `Security Agent`: 토큰/민감정보/권한 처리 검토

상황에 따라 1인이 여러 역할을 겸할 수 있다.

## 4. 작업 단위 규칙

1. 한 작업은 하나의 사용자 가치(예: 로그인 완료) 기준으로 자른다.
2. 한 작업의 완료 조건은 문서로 먼저 확정한다.
3. 작업 시작 전 `docs/harness/templates/decision-log.md`에 결정 로그를 남긴다.
4. 작업 완료 전 `docs/harness/templates/test-scenario.md` 기준 시나리오를 업데이트한다.

## 5. PR/리뷰 기준

1. 명세 준수: 요청/응답/에러코드 일치 여부
2. 상태 안정성: 로딩/성공/실패/재시도 동작
3. 보안 준수: 토큰 보관/갱신/폐기, 민감정보 노출 여부
4. 회귀 안정성: 기존 주요 시나리오 깨짐 여부

## 6. 필수 문서

- 하네스 본문: `docs/harness/development-harness.md`
- 운영 런북: `docs/harness/runbook.md`
- 에이전트 워크플로우: `docs/agents/agent-workflow.md`

## 7. 시작 체크

1. 명세 변경 여부 확인
2. 작업 범위/완료조건 확정
3. 테스트 시나리오 정의
4. 구현 후 자체 점검(런북 체크리스트)
