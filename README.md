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

## 프로젝트 구조(요약)

```
src/
  components/common/      공통 UI 컴포넌트
  layouts/                레이아웃(Header, Footer 등)
  pages/                  페이지 엔트리
  routes/                 라우터 구성(AppRouter, routeTable)
  styles/                 전역 테마(theme.js)
  utils/, hooks/, services/ 유틸/훅/서비스
```

## 라우팅

- `src/routes/routeTable.js`에서 경로 상수 관리
- `src/routes/AppRouter.jsx`에서 라우터 생성
- 기본 레이아웃(`Header`, `Footer`)은 라우터의 루트 레이아웃에 고정되어 대부분 페이지에 노출됩니다.
- 예외: `MAP(/map)` 페이지는 레이아웃 밖에서 렌더되어 `Header`/`Footer`가 표시되지 않습니다.

## 스타일/테마

- `src/styles/theme.js`에서 색상, 타이포 등 토큰 정의
- 전역 스타일은 `src/App.jsx`에서 Emotion `Global`을 통해 적용합니다.
  - 기본 적용: `body { margin: 0 }`, `html, body, #root { height: 100% }`

## 컨벤션 문서

`docs/` 폴더에 컴포넌트/스타일/폴더/라우팅/상태관리/훅/임포트 컨벤션이 정리되어 있습니다.

- [COMPONENT_STRUCTURE_CONVENTIONS.md](docs/COMPONENT_STRUCTURE_CONVENTIONS.md)
- [COMPONENT_STYLE_CONVENTIONS.md](docs/COMPONENT_STYLE_CONVENTIONS.md)
- [FOLDER_STRUCTURE_NAMING_CONVENTIONS.md](docs/FOLDER_STRUCTURE_NAMING_CONVENTIONS.md)
- [IMPORT_CONVENTIONS.md](docs/IMPORT_CONVENTIONS.md)
- [SERVICE_API_ROUTING_CONVENTIONS.md](docs/SERVICE_API_ROUTING_CONVENTIONS.md)
- [STATE_MANAGEMENT_ASYNC_CONVENTIONS.md](docs/STATE_MANAGEMENT_ASYNC_CONVENTIONS.md)
- [HOOKS_CONVENTIONS.md](docs/HOOKS_CONVENTIONS.md)

## 빌드 결과물

- `dist/`에 산출됩니다. `dist/index.html`로 정적 서빙 가능합니다.

## 참고 사항

- 인증 보호 라우트는 추후 전역 상태(Jotai 등) 연동 예정입니다.
- 공통 컴포넌트는 `src/components/common/` 하위에 위치하며, 스타일은 Emotion을 사용합니다.
