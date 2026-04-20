# 레퍼런스 이미지 운영 가이드

## 입력 자산

- 경로: `referenceImage/`
- 파일 수: 8개
- 공통 해상도: `469 x 965` (mobile portrait)

## 현재 파일 목록

- `referenceImage/image.png`
- `referenceImage/image copy.png`
- `referenceImage/image copy 2.png`
- `referenceImage/image copy 3.png`
- `referenceImage/image copy 4.png`
- `referenceImage/image copy 5.png`
- `referenceImage/image copy 6.png`
- `referenceImage/image copy 7.png`

## 화면 매핑 규칙

- 구현 전 반드시 아래 포맷으로 화면 이름을 고정한다.
- 권장 파일명 포맷: `{order}-{domain}-{screen}.png`
- 예시: `01-auth-login.png`, `02-products-list.png`
- 원본은 유지하고, `referenceImage/mapped/`에 복사본으로 관리한다.
- 레퍼런스가 없는 API 화면은 `generated` 상태로 관리하고 신규 시안을 만든다.

## 매핑 템플릿 (초기)

| Ref 파일 | 가설 화면명 | 연동 API 도메인 | 상태 |
| --- | --- | --- | --- |
| image.png | TBD | TBD | `unmapped` |
| image copy.png | TBD | TBD | `unmapped` |
| image copy 2.png | TBD | TBD | `unmapped` |
| image copy 3.png | TBD | TBD | `unmapped` |
| image copy 4.png | TBD | TBD | `unmapped` |
| image copy 5.png | TBD | TBD | `unmapped` |
| image copy 6.png | TBD | TBD | `unmapped` |
| image copy 7.png | TBD | TBD | `unmapped` |

## 레퍼런스 미존재 화면 생성 규칙

- 대상: `docs/API.txt`에는 존재하지만 `referenceImage/`에 대응 화면이 없는 경우
- 생성 원칙 1: 기존 레퍼런스의 타이포 스케일, 컬러, 여백, 버튼 스타일을 그대로 상속
- 생성 원칙 2: 동일 도메인 화면을 우선 템플릿으로 사용
- 생성 원칙 3: 신규 컴포넌트가 필요하면 공통 컴포넌트로 먼저 추출 후 화면에 적용
- 매핑 상태값: `unmapped | mapped | generated | implemented`

## 구현 시 체크 항목

- 화면별 핵심 컴포넌트(리스트, 카드, 폼, 탭, CTA)를 레퍼런스에서 추출
- 간격/타이포/컬러 토큰을 화면 공통 규칙으로 환원
- API 요청/응답 데이터 구조를 화면 요소와 1:1로 매칭
