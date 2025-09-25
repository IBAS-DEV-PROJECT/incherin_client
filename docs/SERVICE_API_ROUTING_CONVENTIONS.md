# 서비스/API 레이어 & 라우팅 컨벤션

> **서비스(API)**는 services/에서 표준화하고, **라우팅**은 `routes/`에서 중앙집중 관리합니다.
페이지 엔트리(`pages/<RouteName>/index.jsx`)는 **default export 허용**(진입점).
> 

---

### **1) 서비스(API) 레이어 표준**

**디렉터리**

```
services/
  api.js               # 공통 axios 인스턴스 + 에러 정규화
  users.js             # 피처별 서비스 (예: 사용자)
  auth.js              # 인증
```

**공통 클라이언트 (axios)**

> **services/api.js**
> 

```jsx
import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta?.env?.VITE_API_BASE_URL || process.env.API_BASE_URL || '/api',
  withCredentials: true,
  timeout: 15000, // 15s
});

// 공통 에러 포맷: { message, status, code, details }
function normalizeError(error) {
  const status = error?.response?.status || 0;
  const data = error?.response?.data || {};
  return {
    message: data.message || error.message || 'Unknown error',
    status,
    code: data.code || null,
    details: data.details || null,
    raw: error,
  };
}

api.interceptors.response.use(
  (res) => res.data, // 성공 시 data만 반환
  (err) => Promise.reject(normalizeError(err))
);

// 선택: 요청 인터셉터 (토큰)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

**피처 서비스 예시**

> **services/users.js**
> 

```jsx
import { api } from './api';

export function listUsers(params) {
  return api.get('/users', { params });
}

export function getUser(id) {
  return api.get(`/users/${id}`);
}

export function createUser(payload) {
  return api.post('/users', payload);
}
```

> 권장: **서비스 레이어에서만 I/O**(HTTP)를 수행하고, 컴포넌트에서는 서비스 호출 결과를 **훅**으로 감싼 뒤(예: ``useUsers``) 3분기(로딩/에러/빈) 처리.
> 

### 2) 라우팅 표준 (React Router v6+)

```jsx
**//** 디렉터리
routes/
	routeTable.js      # 경로 상수
	appRouter.jsx      # 라우터 구성 (코드 스플리팅)
```

```jsx
### 경로 상수
`routes/routeTable.js`
```js
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  USERS: '/users',
  USER_DETAIL: (id = ':id') => `/users/${id}`,
  NOT_FOUND: '*',
};
```

### **3) 코드 스플리팅 + 보호 라우트**

**routes/appRouter.jsx**

```jsx
import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { ROUTES } from './routeTable';
import { useAtom } from 'jotai';
import { userAtom } from '../contexts/authAtoms';

// Lazy pages
const HomePage = lazy(() => import('../pages/Home'));
const LoginPage = lazy(() => import('../pages/Login'));
const UsersPage = lazy(() => import('../pages/Users'));
const UserDetailPage = lazy(() => import('../pages/UserDetail'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

function Protected({ children }) {
  const [user] = useAtom(userAtom);
  if (!user) return <Navigate to={ROUTES.LOGIN} replace />;
  return children;
}

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: (
      <Suspense fallback={<div>로딩…</div>}>
        <HomePage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.LOGIN,
    element: (
      <Suspense fallback={<div>로딩…</div>}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.USERS,
    element: (
      <Protected>
        <Suspense fallback={<div>로딩…</div>}>
          <UsersPage />
        </Suspense>
      </Protected>
    ),
  },
  {
    path: ROUTES.USER_DETAIL(),
    element: (
      <Protected>
        <Suspense fallback={<div>로딩…</div>}>
          <UserDetailPage />
        </Suspense>
      </Protected>
    ),
  },
  { path: ROUTES.NOT_FOUND, element: <NotFoundPage /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
```

### **4) 페이지 엔트리 예시**

**pages/Users/index.jsx**

```jsx
import { useUsers } from '../../hooks/useUsers';

export default function UsersPage() {
  const { data, isLoading, error, refetch } = useUsers();

  if (isLoading) return <div>로딩…</div>;
  if (error) return <div>에러: {error.message}</div>;
  if (!data || data.length === 0) return <div>비어 있음</div>;

  return (
    <ul>
      {data.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
      <button onClick={refetch}>다시 불러오기</button>
    </ul>
  );
}
```

### **5) 루트 연결**

**App.jsx**

```jsx
import AppRouter from './routes/appRouter';

export default function App() {
  return <AppRouter />;
}
```

---

### **6) 규칙 요약**

- **서비스는 services/** 에서만 I/O 수행, **에러 포맷 통일**.
- **페이지는 default export**, 그 외는 **named export**.
- **라우트 테이블 단일화**(ROUTES)로 경로 하드코딩 금지.
- **코드 스플리팅**: 페이지/피처 단위 lazy + Suspense.
- **보호 라우트**: Jotai 전역 상태(userAtom) 기반 Protected 컴포넌트로 가드.