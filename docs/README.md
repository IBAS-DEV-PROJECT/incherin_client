# 📚 프로젝트 문서 가이드

이 폴더에는 프로젝트의 코딩 컨벤션과 아키텍처 가이드가 포함되어 있습니다.

## 📖 필독 문서

### 1. [FSD_ARCHITECTURE.md](./FSD_ARCHITECTURE.md) 🏗️
**가장 먼저 읽어야 할 문서!**

FSD(Feature-Sliced Design) 아키텍처의 전반적인 구조와 원칙을 설명합니다.
- FSD란 무엇인가
- 레이어별 역할과 책임
- 의존성 규칙
- 새 기능 추가 방법
- 실전 예시

👉 **프로젝트에 처음 참여하는 팀원은 이 문서를 먼저 읽으세요!**

---

## 📋 코딩 컨벤션

### 2. [FOLDER_STRUCTURE_NAMING_CONVENTIONS.md](./FOLDER_STRUCTURE_NAMING_CONVENTIONS.md)
- 폴더 구조 규칙
- 파일 및 컴포넌트 네이밍 규칙
- Public API 패턴
- Export 규칙

### 3. [COMPONENT_STRUCTURE_CONVENTIONS.md](./COMPONENT_STRUCTURE_CONVENTIONS.md)
- 컴포넌트 구조 규칙
- Props 정의 방법
- 컴포넌트 분리 원칙

### 4. [COMPONENT_STYLE_CONVENTIONS.md](./COMPONENT_STYLE_CONVENTIONS.md)
- Emotion/Styled Components 사용법
- 스타일 파일 구조
- CSS 네이밍 규칙

### 5. [HOOKS_CONVENTIONS.md](./HOOKS_CONVENTIONS.md)
- 커스텀 훅 작성 규칙
- 훅 네이밍 규칙
- 훅 사용 베스트 프랙티스

### 6. [STATE_MANAGEMENT_ASYNC_CONVENTIONS.md](./STATE_MANAGEMENT_ASYNC_CONVENTIONS.md)
- Jotai를 이용한 상태 관리
- 비동기 상태 처리
- Atom 작성 규칙

### 7. [SERVICE_API_ROUTING_CONVENTIONS.md](./SERVICE_API_ROUTING_CONVENTIONS.md)
- API 호출 규칙
- HTTP 클라이언트 사용법
- 라우팅 설정 방법

### 8. [IMPORT_CONVENTIONS.md](./IMPORT_CONVENTIONS.md)
- Import 순서 규칙
- 절대 경로 vs 상대 경로
- Import 그룹화 방법

---

## 🎯 빠른 시작 가이드

### 신규 팀원 온보딩

1. ✅ **[FSD_ARCHITECTURE.md](./FSD_ARCHITECTURE.md)** 읽기 (필수)
2. ✅ **[FOLDER_STRUCTURE_NAMING_CONVENTIONS.md](./FOLDER_STRUCTURE_NAMING_CONVENTIONS.md)** 읽기
3. ✅ 코드베이스 둘러보기
4. ✅ 나머지 컨벤션 문서들 참고하며 개발

### 새 기능 추가할 때

1. 📖 [FSD_ARCHITECTURE.md - 새 기능 추가하기](./FSD_ARCHITECTURE.md#새-기능-추가하기) 섹션 참고
2. 📁 적절한 레이어에 폴더 생성
3. 🔧 Public API (`index.js`) 작성
4. 💻 구현 시작

### 궁금한 점이 생겼을 때

- 폴더 구조 관련 → [FOLDER_STRUCTURE_NAMING_CONVENTIONS.md](./FOLDER_STRUCTURE_NAMING_CONVENTIONS.md)
- 컴포넌트 작성 → [COMPONENT_STRUCTURE_CONVENTIONS.md](./COMPONENT_STRUCTURE_CONVENTIONS.md)
- 스타일 작성 → [COMPONENT_STYLE_CONVENTIONS.md](./COMPONENT_STYLE_CONVENTIONS.md)
- 상태 관리 → [STATE_MANAGEMENT_ASYNC_CONVENTIONS.md](./STATE_MANAGEMENT_ASYNC_CONVENTIONS.md)
- API 호출 → [SERVICE_API_ROUTING_CONVENTIONS.md](./SERVICE_API_ROUTING_CONVENTIONS.md)

---

## 💡 프로젝트 구조 한눈에 보기

```
src/
├── app/          → 애플리케이션 초기화
├── pages/        → 라우트별 페이지
├── widgets/      → 큰 UI 블록
├── features/     → 사용자 기능
├── entities/     → 비즈니스 엔티티
└── shared/       → 공유 코드
```

의존성 방향: `app → pages → widgets → features → entities → shared`

---

## 🤝 컨벤션 개선 제안

컨벤션이나 문서에 개선이 필요하다고 생각되면 팀에 제안해주세요!

