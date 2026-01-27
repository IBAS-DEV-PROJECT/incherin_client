# 🏗️ FSD (Feature-Sliced Design) 아키텍처 가이드

## 📖 목차

1. [FSD란?](#fsd란)
2. [프로젝트 구조](#프로젝트-구조)
3. [레이어별 설명](#레이어별-설명)
4. [의존성 규칙](#의존성-규칙)
5. [새 기능 추가하기](#새-기능-추가하기)
6. [실전 예시](#실전-예시)

---

## FSD란?

**Feature-Sliced Design**은 프론트엔드 애플리케이션을 위한 아키텍처 방법론입니다.
코드를 **레이어(Layers)**, **슬라이스(Slices)**, **세그먼트(Segments)**로 구조화하여
확장 가능하고 유지보수하기 쉬운 코드베이스를 만듭니다.

### 핵심 원칙

- 📦 **명확한 책임 분리**: 각 레이어는 명확한 역할을 가짐
- 🔒 **단방향 의존성**: 상위 레이어만 하위 레이어를 import
- 🎯 **높은 응집도**: 관련된 코드를 함께 배치
- 🔌 **낮은 결합도**: 레이어 간 최소한의 의존성

---

## 프로젝트 구조

```
src/
├── app/                    # 📱 애플리케이션 레이어
│   ├── index.js           #    - 진입점
│   ├── App.jsx            #    - 메인 컴포넌트
│   ├── routes/            #    - 라우팅 설정
│   ├── providers/         #    - 전역 프로바이더
│   └── styles/            #    - 전역 스타일
│
├── pages/                  # 📄 페이지 레이어
│   ├── home/              #    - 라우트와 1:1 매칭
│   ├── shop-list/
│   └── shop-detail/
│
├── widgets/                # 🧩 위젯 레이어
│   ├── header/            #    - 독립적인 큰 UI 블록
│   ├── review-board/
│   └── shop-list-view/
│
├── features/               # ⚡ 기능 레이어
│   ├── auth/
│   │   └── generate-nickname/  # - 사용자 시나리오/기능
│   ├── review/write/
│   ├── roulette/play/
│   └── shop/filter-category/
│
├── entities/               # 🎯 엔티티 레이어
│   ├── category/          #    - 비즈니스 엔티티
│   ├── review/
│   ├── shop/
│   └── user/
│
└── shared/                 # 🔧 공유 레이어
    ├── ui/                #    - 재사용 UI 컴포넌트
    ├── api/               #    - HTTP 클라이언트
    ├── lib/               #    - 유틸리티, 훅
    └── assets/            #    - 정적 자원
```

---

## 레이어별 설명

### 1. 📱 App - 애플리케이션 레이어

**역할**: 앱 초기화, 전역 설정, 라우팅

**포함되는 것**:

- 애플리케이션 진입점 (`index.js`)
- 라우트 설정 (`routes/`)
- 전역 프로바이더 (Provider, Router 등)
- 전역 스타일 (reset.css, global styles)

**예시**:

```javascript
// app/routes/index.jsx
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shops" element={<ShopListPage />} />
    </Routes>
  );
};
```

---

### 2. 📄 Pages - 페이지 레이어

**역할**: 라우트와 1:1로 매칭되는 페이지 컴포넌트

**포함되는 것**:

- URL 경로에 대응하는 페이지
- Widgets와 Features를 조합하여 완성된 화면 구성

**구조**:

```
pages/
└── shop-list/
    ├── index.js           # Public API
    └── ui/
        └── ShopListPage.jsx
```

**예시**:

```javascript
// pages/shop-list/ui/ShopListPage.jsx
import { Header } from '@/widgets/header';
import { ShopListView } from '@/widgets/shop-list-view';
import { CategoryFilter } from '@/features/shop/filter-category';

export const ShopListPage = () => {
  return (
    <>
      <Header />
      <CategoryFilter />
      <ShopListView />
    </>
  );
};
```

---

### 3. 🧩 Widgets - 위젯 레이어

**역할**: 독립적으로 동작하는 큰 UI 블록

**포함되는 것**:

- 여러 Entities와 Features를 조합한 복합 컴포넌트
- 헤더, 사이드바, 복잡한 카드 등

**구조**:

```
widgets/
└── header/
    ├── index.js           # Public API
    └── ui/
        └── Header.jsx
```

**예시**:

```javascript
// widgets/header/ui/Header.jsx
import { UserBadge } from '@/entities/user';
import { Button } from '@/shared/ui';

export const Header = () => {
  return (
    <header>
      <Logo />
      <UserBadge />
      <Button>로그인</Button>
    </header>
  );
};
```

---

### 4. ⚡ Features - 기능 레이어

**역할**: 사용자 시나리오와 비즈니스 기능

**포함되는 것**:

- 사용자 인터랙션이 있는 기능
- 비즈니스 로직
- 상태 관리

**구조**:

```
features/
└── review/
    └── write/
        ├── index.js       # Public API
        ├── ui/            # UI 컴포넌트
        │   └── ReviewForm.jsx
        └── model/         # 로직, 상태
            └── submitReview.js
```

**예시**:

```javascript
// features/review/write/ui/ReviewForm.jsx
import { useState } from 'react';
import { Input, TextArea, Button } from '@/shared/ui';
import { submitReview } from '../model/submitReview';

export const ReviewForm = ({ shopId }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    await submitReview({ shopId, content });
  };

  return (
    <form>
      <TextArea value={content} onChange={setContent} />
      <Button onClick={handleSubmit}>리뷰 작성</Button>
    </form>
  );
};
```

---

### 5. 🎯 Entities - 엔티티 레이어

**역할**: 비즈니스 엔티티 (데이터 모델)

**포함되는 것**:

- 도메인 데이터와 관련된 UI
- API 호출 함수
- 상태 관리 (atoms, stores)

**구조**:

```
entities/
└── shop/
    ├── index.js           # Public API
    ├── api/               # API 함수
    │   └── shopApi.js
    ├── model/             # 상태, 타입
    │   └── shopAtom.js
    └── ui/                # UI 컴포넌트
        └── ShopCard.jsx
```

**예시**:

```javascript
// entities/shop/ui/ShopCard.jsx
import { Card, Badge } from '@/shared/ui';

export const ShopCard = ({ shop }) => {
  return (
    <Card>
      <h3>{shop.name}</h3>
      <Badge>{shop.category}</Badge>
      <p>{shop.address}</p>
    </Card>
  );
};

// entities/shop/api/shopApi.js
import { httpClient } from '@/shared/api';

export const fetchShops = async params => {
  const response = await httpClient.get('/shops', { params });
  return response.data;
};
```

---

### 6. 🔧 Shared - 공유 레이어

**역할**: 재사용 가능한 코드

**포함되는 것**:

- UI 컴포넌트 (Button, Input, Modal 등)
- 유틸리티 함수
- 커스텀 훅
- HTTP 클라이언트
- 상수, 설정

**구조**:

```
shared/
├── ui/                    # UI 컴포넌트
│   ├── Button/
│   ├── Input/
│   └── Modal/
├── api/                   # HTTP 클라이언트
│   └── http.js
├── lib/                   # 유틸리티, 훅
│   ├── hooks/
│   └── utils/
├── config/                # 상수, 설정
└── assets/                # 이미지, 아이콘
```

**예시**:

```javascript
// shared/ui/Button/Button.jsx
export const Button = ({ children, variant = 'primary', ...props }) => {
  return (
    <button className={`btn btn-${variant}`} {...props}>
      {children}
    </button>
  );
};

// shared/lib/hooks/useDebounce.js
export const useDebounce = (value, delay) => {
  // 디바운스 로직
};
```

---

## 의존성 규칙

### 🔒 단방향 의존성 (위에서 아래로만)

```
app       (모든 레이어 사용 가능)
  ↓
pages     (widgets, features, entities, shared)
  ↓
widgets   (features, entities, shared)
  ↓
features  (entities, shared)
  ↓
entities  (shared)
  ↓
shared    (외부 라이브러리만)
```

### ✅ 올바른 예시

```javascript
// ✅ pages에서 widgets, features 사용
import { Header } from '@/widgets/header';
import { ReviewForm } from '@/features/review/write';

// ✅ features에서 entities 사용
import { ShopCard } from '@/entities/shop';

// ✅ entities에서 shared 사용
import { Button } from '@/shared/ui';
```

### ❌ 잘못된 예시

```javascript
// ❌ shared에서 entities 사용 불가
import { ShopCard } from '@/entities/shop';

// ❌ entities에서 features 사용 불가
import { ReviewForm } from '@/features/review/write';

// ❌ features에서 pages 사용 불가
import { HomePage } from '@/pages/home';
```

### 🚫 같은 레이어 내 슬라이스 간 의존성 금지

```javascript
// ❌ features/review에서 features/shop 직접 사용 불가
import { CategoryFilter } from '@/features/shop/filter-category';

// ✅ 대신 entities를 통해 공유
import { shopModel } from '@/entities/shop';
```

---

## 새 기능 추가하기

### 1️⃣ 기능 분석

먼저 추가할 기능이 어느 레이어에 속하는지 판단합니다.

**질문**:

- 새로운 페이지인가? → `pages/`
- 사용자 인터랙션이 있는 기능인가? → `features/`
- 재사용 가능한 UI 컴포넌트인가? → `shared/ui/`
- 비즈니스 엔티티 관련인가? → `entities/`

### 2️⃣ 폴더 생성

**Feature 추가 예시**:

```bash
features/
└── shop/
    └── add-to-favorites/        # 새 기능
        ├── index.js             # Public API
        ├── ui/                  # UI 컴포넌트
        │   └── FavoriteButton.jsx
        └── model/               # 비즈니스 로직
            └── toggleFavorite.js
```

### 3️⃣ Public API 작성

```javascript
// features/shop/add-to-favorites/index.js
export { FavoriteButton } from './ui/FavoriteButton';
export { toggleFavorite } from './model/toggleFavorite';
```

### 4️⃣ 구현

```javascript
// features/shop/add-to-favorites/ui/FavoriteButton.jsx
import { Button } from '@/shared/ui';
import { toggleFavorite } from '../model/toggleFavorite';

export const FavoriteButton = ({ shopId }) => {
  const handleClick = () => toggleFavorite(shopId);

  return <Button onClick={handleClick}>⭐ 즐겨찾기</Button>;
};
```

---

## 실전 예시

### 예시 1: 리뷰 작성 기능

**구조**:

```
features/review/write/
├── index.js
├── ui/
│   └── ReviewForm.jsx       # 리뷰 작성 폼
└── model/
    └── submitReview.js      # 제출 로직

entities/review/
├── index.js
├── api/
│   └── reviewApi.js         # API 호출
└── ui/
    └── ReviewItem.jsx       # 리뷰 아이템 표시
```

**코드**:

```javascript
// features/review/write/ui/ReviewForm.jsx
import { useState } from 'react';
import { Input, TextArea, Button, StarRating } from '@/shared/ui';
import { submitReview } from '../model/submitReview';

export const ReviewForm = ({ shopId, onSuccess }) => {
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    await submitReview({ shopId, rating, content });
    onSuccess?.();
  };

  return (
    <form>
      <StarRating value={rating} onChange={setRating} />
      <TextArea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="리뷰를 작성해주세요"
      />
      <Button onClick={handleSubmit}>작성하기</Button>
    </form>
  );
};

// features/review/write/model/submitReview.js
import { createReview } from '@/entities/review';

export const submitReview = async ({ shopId, rating, content }) => {
  try {
    await createReview({ shopId, rating, content });
    alert('리뷰가 작성되었습니다!');
  } catch (error) {
    alert('리뷰 작성에 실패했습니다.');
  }
};

// entities/review/api/reviewApi.js
import { httpClient } from '@/shared/api';

export const createReview = async data => {
  const response = await httpClient.post('/reviews', data);
  return response.data;
};
```

---

### 예시 2: 상점 목록 페이지

```javascript
// pages/shop-list/ui/ShopListPage.jsx
import { useState } from 'react';
import { Header } from '@/widgets/header';
import { ShopListView } from '@/widgets/shop-list-view';
import { CategoryFilter } from '@/features/shop/filter-category';

export const ShopListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div>
      <Header />
      <CategoryFilter value={selectedCategory} onChange={setSelectedCategory} />
      <ShopListView category={selectedCategory} />
    </div>
  );
};

// widgets/shop-list-view/ui/ShopListView.jsx
import { useEffect, useState } from 'react';
import { fetchShops } from '@/entities/shop';
import { ShopCard } from '@/entities/shop';
import { Grid, Spinner } from '@/shared/ui';

export const ShopListView = ({ category }) => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadShops = async () => {
      setLoading(true);
      const data = await fetchShops({ category });
      setShops(data);
      setLoading(false);
    };
    loadShops();
  }, [category]);

  if (loading) return <Spinner />;

  return (
    <Grid>
      {shops.map(shop => (
        <ShopCard key={shop.id} shop={shop} />
      ))}
    </Grid>
  );
};
```

---

## 💡 베스트 프랙티스

### 1. Public API 패턴

각 슬라이스는 `index.js`로 외부에 공개할 것만 export

```javascript
// ✅ Good
// features/review/write/index.js
export { ReviewForm } from './ui/ReviewForm';
export { submitReview } from './model/submitReview';

// ❌ Bad - 내부 구현 노출
export { validateReview } from './model/validateReview';
```

### 2. 명확한 명명

- Features: **동사 + 명사** (`write-review`, `filter-category`)
- Entities: **명사** (`shop`, `user`, `review`)
- Widgets: **UI 블록 이름** (`header`, `sidebar`)

### 3. 세그먼트 구조

```
slice/
├── index.js          # Public API (필수)
├── ui/               # UI 컴포넌트
├── model/            # 비즈니스 로직, 상태
├── api/              # API 호출 (entities에만)
└── lib/              # 내부 유틸리티
```

### 4. Import 경로

절대 경로 사용 권장 (`@/` alias)

```javascript
// ✅ Good
import { Button } from '@/shared/ui';
import { ShopCard } from '@/entities/shop';

// ❌ Bad
import { Button } from '../../../shared/ui';
```

---

## 📚 참고 자료

- [FSD 공식 문서](https://feature-sliced.design/)
- [FSD 예제 프로젝트](https://github.com/feature-sliced/examples)

---

## ❓ FAQ

**Q: Feature와 Entity의 차이는?**

- **Entity**: 데이터 중심 (Shop, User, Review 등)
- **Feature**: 행위 중심 (리뷰 작성하기, 필터링하기 등)

**Q: Widget과 Feature의 차이는?**

- **Widget**: 여러 기능을 조합한 큰 UI 블록
- **Feature**: 하나의 사용자 시나리오

**Q: 같은 레이어 간 의존성이 필요하다면?**

- 공통 로직을 하위 레이어(entities 또는 shared)로 내려서 공유

**Q: 작은 프로젝트에도 적용해야 하나요?**

- 초기에는 과할 수 있지만, 확장을 고려한다면 처음부터 구조를 잡는 것이 좋습니다.
