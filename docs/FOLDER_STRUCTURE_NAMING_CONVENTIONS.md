# 폴더구조/네이밍 컨벤션

### **📂 폴더 구조**

```
src/
  assets/                # 이미지, 아이콘, 폰트 등 정적 자원 (컴포넌트와 함께 관리)
  components/
    common/              # 재사용 가능한 원자/분자 컴포넌트
    domain/<Feature>/    # 피처 단위 컴포넌트
  contexts/              # 전역 상태 관리 Context
  hooks/                 # 재사용 가능한 커스텀 훅
  layouts/               # 레이아웃 컴포넌트
  pages/
    <RouteName>/index.jsx # 페이지 단위 엔트리 (코드 스플리팅 단위)
  routes/                # 라우트 테이블 정의
  services/              # API 서비스 계층
  styles/                # 글로벌 스타일, 테마 토큰
  utils/                 # 유틸리티 함수 모음
```

> **피처 단위 컴포넌트 폴더 구조 예시**
> 
- 특정 기능(Feature)에 종속적인 UI 컴포넌트를 모아둠
- 보통은 index.js를 배럴 파일로 둬서 import를 간결하게

```jsx
components/
  domain/
    User/
      UserCard.jsx
      UserProfile.jsx
      UserList.jsx
      index.js
```

> **페이지 단위 엔트리 폴더 구조 예시**
> 
- 라우트와 1:1 매칭되는 화면
- 보통은 해당 페이지에서 사용하는 domain 컴포넌트들을 조립해서 완성된 UI를 구성
- export default 허용되는 대표적인 파일.

```jsx
pages/
  Users/
    index.jsx
```

---

### **📌 assets 위치 가이드**

<aside>

- public/: 번들러가 관리하지 않고 그대로 복사됨 → URL로 직접 접근 (/logo.png).
    - favicon, manifest.json, robots.txt
    - 외부에서 절대 경로 접근이 필요한 파일
- src/assets/: import해서 사용하는 정적 자원 → 빌드시 해시 처리, 캐싱 관리 가능.
    - 컴포넌트 안에서 사용하는 이미지, 아이콘, SVG, 폰트
    - 코드와 함께 버전 관리되어야 하는 리소스
</aside>

> **결론: UI에 쓰이는 대부분의 이미지/아이콘은 src/assets/에 두고, SEO/메타데이터용은 public/ 유지**
> 

---

### **📦 배럴 파일 규칙**

- **배럴 파일(Barrel file)**은 index.js를 두고 해당 폴더의 export를 한 번에 모아주는 패턴

> **예시:**
> 

```
components/domain/User/
  UserCard.jsx
  UserProfile.jsx
  index.js
```

```jsx
// index.js
export { default as UserCard } from './UserCard';
export { default as UserProfile } from './UserProfile';
```

> import를 간결하게 만들지만, 전역으로 쓰면 추적이 어려움
> 
- **허용**: 특정 도메인/피처 단위(components/domain/<Feature>/index.js)
- **금지**: 전역(components/index.js 등)

---

### **📝 네이밍 규칙**

<aside>

- **컴포넌트/훅/Provider/Context/파일명**: PascalCase
    - 예) Button.jsx, UserCard.jsx, useToggle.js, AuthProvider.js
- **함수/유틸**: camelCase
    - 예) formatDate, parseQueryString
- **상수**: UPPER_SNAKE_CASE
    - 예) API_BASE_URL
</aside>

---

### **🔄 Export 규칙**

**기본 원칙**

- **기본**: named export 사용.
- **예외**: 페이지 엔트리(pages/<RouteName>/index.jsx)나 루트 엔트리(App.jsx, main.jsx) 같은 **진입점 파일**에서만 default export 허용.

**Named Export 예시**

```
// Button.jsx
export function Button() {
  return <button>Click</button>;
}

export const BUTTON_SIZE = 'large';

// 사용
import { Button, BUTTON_SIZE } from './Button';
```

**Default Export 예시 (진입점 전용)**

```
// pages/Home/index.jsx
export default function HomePage() {
  return <div>홈</div>;
}

// App.jsx
export default function App() {
  return <RouterProvider router={router} />;
}

// 사용
import HomePage from './pages/Home';
import App from './App';
```

### **왜 이런 규칙을 두는가?**

<aside>

**Named Export의 장점**

- 여러 개 export 가능 → 관리 유연함.
- import 시 이름 강제 → 추적이 쉬움, IDE 자동완성 지원.
- 리팩토링 시 이름 변경 추적이 확실함.

**Default Export의 단점**

- 파일당 하나만 export 가능.
- import 시 이름을 마음대로 바꿀 수 있어 추적이 어려움.
- 리팩토링 시 불일치 문제 발생 가능 (Button을 PrimaryButton으로 바꿔도 import Foo from './Button'은 그대로 동작).
</aside>

### **그런데 왜 진입점만 허용할까?**

<aside>

- **페이지 엔트리(pages/<RouteName>/index.jsx)**
    - 라우터와 바로 연결되는 파일은 무조건 1개 컴포넌트만 내보냄.
    - export default Page가 직관적이고 관례적임.
- **루트 엔트리(App.jsx, main.jsx)**
    - 앱 전체를 감싸는 단일 컴포넌트.
    - 역시 default export가 자연스럽고 명확함.
</aside>

> **결론: 여러 개 export될 수 있는 파일에서는 named export만 사용해 추적성과 일관성을 유지하고, “이 파일은 무조건 하나만 내보낸다”가 보장되는 진입점에서는 default export를 허용한다.**
>