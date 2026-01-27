# INCHERIN

INCHERIN(인슐랭) 웹 클라이언트 애플리케이션입니다. Vite + React 기반으로 라우팅, 전역 테마, 공통 컴포넌트 컨벤션을 적용했습니다.

## 기술 스택

- React 19, React Router v6
- Vite 7
- Emotion (@emotion/react, @emotion/styled)
- ESLint + Prettier

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:5173)
npm run dev

# 빌드
npm run build

# 빌드 미리보기
npm run preview

# 린트 검사 / 자동 수정
npm run lint
npm run lint:fix

# 포맷팅
npm run format
```

## 아키텍처

이 프로젝트는 **FSD (Feature-Sliced Design)** 아키텍처를 따릅니다.

### 프로젝트 구조

```
src/
├── app/          애플리케이션 레이어 (초기화, 라우팅)
├── pages/        페이지 레이어 (라우트별 페이지)
├── widgets/      위젯 레이어 (독립적인 큰 UI 블록)
├── features/     기능 레이어 (사용자 시나리오, 비즈니스 기능)
├── entities/     엔티티 레이어 (비즈니스 엔티티)
└── shared/       공유 레이어 (UI, API, 유틸리티)
```

의존성 방향: `app → pages → widgets → features → entities → shared`

### 📚 FSD 아키텍처 가이드

프로젝트에 처음 참여하시나요? 아래 문서를 읽어보세요!

**👉 [FSD 아키텍처 가이드](docs/FSD_ARCHITECTURE.md) (필독!)**

이 문서에서 다루는 내용:

- FSD 아키텍처란?
- 각 레이어의 역할과 책임
- 의존성 규칙
- 새 기능 추가하는 방법
- 실전 예시

## 컨벤션 문서

모든 컨벤션 문서는 `docs/` 폴더에 있습니다.

### 📖 필독

- **[FSD_ARCHITECTURE.md](docs/FSD_ARCHITECTURE.md)** - FSD 아키텍처 전반 설명 ⭐
- [FOLDER_STRUCTURE_NAMING_CONVENTIONS.md](docs/FOLDER_STRUCTURE_NAMING_CONVENTIONS.md) - 폴더 구조 및 네이밍

### 📋 코딩 컨벤션

- [COMPONENT_STRUCTURE_CONVENTIONS.md](docs/COMPONENT_STRUCTURE_CONVENTIONS.md) - 컴포넌트 구조
- [COMPONENT_STYLE_CONVENTIONS.md](docs/COMPONENT_STYLE_CONVENTIONS.md) - 스타일 작성
- [HOOKS_CONVENTIONS.md](docs/HOOKS_CONVENTIONS.md) - 커스텀 훅
- [STATE_MANAGEMENT_ASYNC_CONVENTIONS.md](docs/STATE_MANAGEMENT_ASYNC_CONVENTIONS.md) - 상태 관리
- [SERVICE_API_ROUTING_CONVENTIONS.md](docs/SERVICE_API_ROUTING_CONVENTIONS.md) - API 호출
- [IMPORT_CONVENTIONS.md](docs/IMPORT_CONVENTIONS.md) - Import 규칙

더 자세한 내용은 [docs/README.md](docs/README.md)를 참고하세요.

## 빌드 결과물

- `dist/`에 산출됩니다. `dist/index.html`로 정적 서빙 가능합니다.

## 새 기능 추가하기

1. [FSD 아키텍처 가이드](docs/FSD_ARCHITECTURE.md)의 "새 기능 추가하기" 섹션 읽기
2. 적절한 레이어에 슬라이스 폴더 생성
3. Public API (`index.js`) 작성
4. 세그먼트별로 구현 (`ui/`, `model/`, `api/` 등)

## 참고 사항

- 상태 관리: Jotai 사용
- 스타일링: Emotion (@emotion/react, @emotion/styled)
- 공통 UI 컴포넌트는 `src/shared/ui/`에 위치
