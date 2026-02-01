# 폴더구조/네이밍 컨벤션

> ⚠️ **이 프로젝트는 FSD (Feature-Sliced Design) 아키텍처를 따릅니다.**  
> 자세한 설명은 [FSD_ARCHITECTURE.md](./FSD_ARCHITECTURE.md)를 참고하세요.

### **📂 폴더 구조 (FSD 기반)**

```
src/
├── app/                   # 애플리케이션 레이어
│   ├── index.js          #   - 진입점
│   ├── App.jsx           #   - 메인 컴포넌트
│   ├── routes/           #   - 라우팅 설정
│   ├── providers/        #   - 전역 프로바이더
│   └── styles/           #   - 전역 스타일
│
├── pages/                 # 페이지 레이어
│   └── <page-name>/      #   - 라우트와 1:1 매칭
│       ├── index.js      #   - Public API
│       └── ui/           #   - 페이지 컴포넌트
│
├── widgets/               # 위젯 레이어
│   └── <widget-name>/    #   - 큰 독립적인 UI 블록
│       ├── index.js      #   - Public API
│       └── ui/           #   - 위젯 컴포넌트
│
├── features/              # 기능 레이어
│   └── <domain>/         #   - 사용자 시나리오/기능
│       └── <feature-name>/
│           ├── index.js  #   - Public API
│           ├── ui/       #   - UI 컴포넌트
│           └── model/    #   - 비즈니스 로직
│
├── entities/              # 엔티티 레이어
│   └── <entity-name>/    #   - 비즈니스 엔티티
│       ├── index.js      #   - Public API
│       ├── api/          #   - API 함수
│       ├── model/        #   - 상태 관리
│       └── ui/           #   - UI 컴포넌트
│
└── shared/                # 공유 레이어
    ├── ui/               #   - 재사용 UI 컴포넌트
    ├── api/              #   - HTTP 클라이언트
    ├── lib/              #   - 유틸리티, 훅
    ├── config/           #   - 상수, 설정
    └── assets/           #   - 정적 자원
```

> **슬라이스(Slice) 구조 예시**

각 레이어는 슬라이스(기능 단위)로 구성되고, 각 슬라이스는 세그먼트로 구성됩니다.

```
entities/shop/
├── index.js              # Public API (외부 노출용)
├── api/                  # API 호출
│   └── shopApi.js
├── model/                # 상태 관리, 비즈니스 로직
│   └── shopAtom.js
└── ui/                   # UI 컴포넌트
    └── ShopCard.jsx
```

> **페이지 구조 예시**

```
pages/shop-list/
├── index.js              # Public API
└── ui/
    └── ShopListPage.jsx  # 페이지 컴포넌트
```

---

### **📌 Assets 위치 가이드**

- **public/**: 번들러가 관리하지 않고 그대로 복사됨 → URL로 직접 접근 (/logo.png)
  - favicon, manifest.json, robots.txt
  - 외부에서 절대 경로 접근이 필요한 파일
- **src/shared/assets/**: import해서 사용하는 정적 자원 → 빌드시 해시 처리, 캐싱 관리
  - 컴포넌트 안에서 사용하는 이미지, 아이콘, SVG, 폰트
  - 코드와 함께 버전 관리되어야 하는 리소스

> **결론: UI에 쓰이는 대부분의 이미지/아이콘은 `shared/assets/`에 두고, SEO/메타데이터용은 `public/` 유지**

---

### **📦 Public API 패턴 (Barrel File)**

FSD에서는 각 슬라이스마다 **index.js**를 Public API로 사용합니다.

> **목적**

- 슬라이스 내부 구현을 캡슐화
- 외부에서 사용할 것만 명시적으로 export
- import 경로를 간결하게 유지

> **예시**

```
entities/shop/
├── index.js              # Public API
├── api/
│   └── shopApi.js
└── ui/
    └── ShopCard.jsx
```

```javascript
// entities/shop/index.js
export { fetchShops, fetchShopById } from './api/shopApi';
export { ShopCard } from './ui/ShopCard';
```

```javascript
// 사용하는 곳에서
import { fetchShops, ShopCard } from '@/entities/shop';
```

> **규칙**

- ✅ **허용**: 각 슬라이스의 Public API (`entities/shop/index.js`)
- ✅ **허용**: Shared UI의 배럴 파일 (`shared/ui/index.js`)
- ❌ **금지**: 레이어 전체를 모으는 배럴 파일 (`entities/index.js`)

---

### **📝 네이밍 규칙**

<aside>

- **컴포넌트/훅/Provider/Context/파일명**: PascalCase
  - 예) Button.jsx, UserCard.jsx, useToggle.js, AuthProvider.js
- **함수/유틸**: camelCase
  - 예) formatDate, parseQueryString
- **상수**: UPPER_SNAKE_CASE - 예) API_BASE_URL
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
- **루트 엔트리(App.jsx, main.jsx)** - 앱 전체를 감싸는 단일 컴포넌트. - 역시 default export가 자연스럽고 명확함.
</aside>

> **결론: 여러 개 export될 수 있는 파일에서는 named export만 사용해 추적성과 일관성을 유지하고, “이 파일은 무조건 하나만 내보낸다”가 보장되는 진입점에서는 default export를 허용한다.**
