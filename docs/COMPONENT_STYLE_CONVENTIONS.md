# 컴포넌트/스타일 컨벤션

> 팀 공통 규칙을 아래와 같이 정의합니다. 새 컴포넌트 추가/수정 시 본 문서를 기준으로 반영해 주세요.

### 1) 컴포넌트명 네이밍

- 파일 기본 컴포넌트: PascalCase 사용 `(예: `Badge`, `Button`, `SelectBox`)`
- styled 컴포넌트: `StyledXxx` 접두어 사용
- `예: `StyledBadge`, `StyledButton`, `StyledBadgeIcon`, `StyledBadgeContainer``
- 변형이 여러 개일 때 의미를 담아 구체화 `(예: `StyledBadgeContainer`, `StyledBadgeLabel`)`

### 2) 스타일 적용 규칙 (styled vs css)

- 기본 원칙: 재사용 가능한 “컴포넌트 단위 스타일”은 `@emotion/styled` 사용
  - props 기반 변형, 의사클래스`(:hover, :focus)`, 미디어쿼리, 복합 스타일에 적합
- 국소적/일회성 스타일은 `css` prop에 “객체”를 직접 전달 (템플릿 리터럴보다 객체 권장)
- TS 사용 시 속성명/값 타입체킹으로 오타를 줄일 수 있음
- 템플릿 리터럴`(`css\``)`은 순수 CSS 문법을 길게 쓰고 싶을 때만 선택적으로 사용

> **예시 (styled 권장):**

```jsx
import styled from '@emotion/styled';

const StyledBadge = styled.span(({ theme, $clickable }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'opacity 0.2s ease',
  cursor: $clickable ? 'pointer' : 'default',
  '&:hover': $clickable ? { opacity: 0.8 } : undefined,
}));
```

> **예시 (국소 스타일, css 객체):**

```jsx
const boxStyle = {
  display: 'flex',
  gap: 8,
};

<div css={boxStyle} />;
```

### 3) props 전달은 항상 ...rest

- 컴포넌트 인자에서 내부에서 소비하는 props를 먼저 구조 분해하고, 나머지를 `...rest`로 DOM에 전달
- DOM 유효 prop만 내려가므로 경고/누수를 방지 `(`id`, `className`, `aria-_`, `data-_`, `title` 등)`

> **예시:**

```jsx
const Badge = ({
  children,
  variant = 'primary',
  size = 'medium',
  color,
  backgroundColor,
  onClick,
  rounded = true,
  ...rest
}) => {
  return (
    <StyledBadge
      $variant={variant}
      $size={size}
      $rounded={rounded}
      $clickable={Boolean(onClick)}
      $bgOverride={backgroundColor}
      $colorOverride={color}
      onClick={onClick}
      {...rest}
    >
      {children}
    </StyledBadge>
  );
};
```

### 4) 스타일 전용 prop에는 $ 접두사

- DOM으로 전달되면 안 되는 스타일 전용 prop은 `$` 접두사 사용
- `styled` 내부에서만 소비하고 실제 DOM에는 내려가지 않도록 함

> **예시:**

```jsx
const StyledBadge = styled.span(({ theme, $variant, $size, $rounded }) => ({
  borderRadius: $rounded ? 12 : 4,
  // ...
}));
```

### 5) 디자인 토큰/공통 스타일

- 색상은 `theme.colors`를 기준으로 사용. 중복 색상 정의 금지
- 사이즈/간격/컴포넌트 토큰이 필요해지면 `theme.components.<컴포넌트>.sizes` 등으로 승격하여 관리
- 공용 스타일은 유틸로 분리 가능 `(예: `src/styles/mixins.ts`또는`utils`)` 후 `css`로 합성

### 6) 접근성/상호작용 가이드

- 표시용 컴포넌트는 기본적으로 비인터랙션. 버튼 역할일 때만 hover/active/포커스 스타일 적용
- 키보드 접근성 고려: 버튼 역할일 경우 ``role="button"`, `tabIndex=0`` 등 명시 또는 실제 버튼 사용 권장

### 7) 우선순위/합성 규칙

- 명시 `prop → `{...rest}`` 순으로 전달해 의도치 않은 덮어쓰기 방지
- 조건부 스타일은 `styled`에서 props 기반으로 분기. 복잡한 계산은 별도 함수로 분리하여 테스트 가능하게 유지

### 8) 파일 구조 제안

- 소규모: 단일 파일`(`Badge.jsx`)` 내 `StyledBadge`, 보조 스타일 함수 동거
- 재사용 증가 시: ``Badge.jsx`, `Badge.styles.js``로 분리
- 더 확장 시: `theme.components.badge`에 토큰 추가 후 스타일 함수는 토큰 조합에 집중

---

문의/수정 제안은 PR에 본 문서 링크와 함께 근거를 남겨주세요.
