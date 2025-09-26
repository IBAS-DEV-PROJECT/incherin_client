// --- 라이브러리 ---
import { Suspense, lazy } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
// --- 내부 (현재) ---
import { ROUTES } from './routeTable';

// --- 인증 상태 (문서: 서비스/API & 라우팅 컨벤션) ---
// TODO: auth 전역 상태(Jotai 등) 연동 시 교체
const user = null;

// --- 공통 Suspense 래퍼 (문서: 코드 스플리팅 + Suspense) ---
const withSuspense = element => (
  <Suspense fallback={<div>로딩…</div>}>{element}</Suspense>
);

// --- Lazy pages (문서: 라우팅 표준, 코드 스플리팅) ---
const HomePage = lazy(() => import('../pages/Home'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));
const AuthPage = lazy(() => import('../pages/Auth'));
const MapPage = lazy(() => import('../pages/Map'));
const StoresPage = lazy(() => import('../pages/Stores'));
const StoreDetailPage = lazy(() => import('../pages/StoreDetail'));
const MyPage = lazy(() => import('../pages/My'));
const AdminPage = lazy(() => import('../pages/Admin'));

// --- 보호 라우트 (문서: 보호 라우트) ---
// - 인증이 필요한 경로에서 사용
// - 인증되지 않은 경우 AUTH 경로로 리다이렉트
function Protected({ children }) {
  if (!user) return <Navigate to={ROUTES.AUTH} replace />;
  return children;
}

// --- 라우터 구성 (문서: 라우팅 표준) ---
// - 모든 페이지 lazy 로딩 + Suspense
// - MY는 Protected로 보호
const router = createBrowserRouter([
  { path: ROUTES.HOME, element: withSuspense(<HomePage />) },
  { path: ROUTES.AUTH, element: withSuspense(<AuthPage />) },
  { path: ROUTES.MAP, element: withSuspense(<MapPage />) },
  { path: ROUTES.STORES, element: withSuspense(<StoresPage />) },
  { path: ROUTES.STORE_DETAIL(), element: withSuspense(<StoreDetailPage />) },
  {
    path: ROUTES.MY,
    element: withSuspense(
      <Protected>
        <MyPage />
      </Protected>
    ),
  },
  { path: ROUTES.ADMIN, element: withSuspense(<AdminPage />) },
  { path: ROUTES.NOT_FOUND, element: withSuspense(<NotFoundPage />) },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
