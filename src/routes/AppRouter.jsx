// --- 라이브러리 ---
import { Suspense, lazy } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from 'react-router-dom';
// --- 내부 (현재) ---
import { ROUTES } from './routeTable';
import { Header } from '../layouts/Header';
import { Footer } from '../layouts/Footer';

// --- 인증 상태 (문서: 서비스/API & 라우팅 컨벤션) ---
// TODO: auth 전역 상태(Jotai 등) 연동 시 교체
const user = null;

// --- 공통 Suspense 래퍼 (문서: 코드 스플리팅 + Suspense) ---
const withSuspense = element => (
  <Suspense fallback={<div>로딩…</div>}>{element}</Suspense>
);

// --- Lazy pages (문서: 라우팅 표준, 코드 스플리팅) ---
const HomePage = lazy(() => import('../pages/Landing'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));
const AuthPage = lazy(() => import('../pages/Auth'));
const MapPage = lazy(() => import('../pages/Map'));
const StoresPage = lazy(() => import('../pages/Stores'));
const StoreDetailPage = lazy(() => import('../pages/StoreDetail'));
const MyPage = lazy(() => import('../pages/My'));
const AdminPage = lazy(() => import('../pages/Admin'));

// --- My 내부 섹션 ---
const UserInfoSection = lazy(() => import('../components/My/UserInfoSection/UserInfoSection'));
const MyList = lazy(() => import('../components/My/MyListSection/MyListSection'));
const MyListDetail = lazy(() => import('../components/My/MyListDetail/MyListDetail'));
const MyReview = lazy(() => import('../components/My/MyReview/MyReview'));

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
  {
    // 기본 레이아웃: Header/Footer 고정
    element: (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    ),
    children: [
      { path: ROUTES.HOME, element: withSuspense(<HomePage />) },
      { path: ROUTES.AUTH, element: withSuspense(<AuthPage />) },
      { path: ROUTES.STORES, element: withSuspense(<StoresPage />) },
      {
        path: ROUTES.STORE_DETAIL(),
        element: withSuspense(<StoreDetailPage />),
      },
      {
        path: ROUTES.MY,
        element: withSuspense(
          //<Protected>
          <MyPage />
          //</Protected>
        ),
        children: [
        { index: true, element: <Navigate to="info" replace /> },
        { path: "info", element: withSuspense(<UserInfoSection />) },
        { path: "lists", element: withSuspense(<MyList />) },
        { path: "lists/:id", element: withSuspense(<MyListDetail />) },
        { path: "review", element: withSuspense(<MyReview />) },
]
      },
      { path: ROUTES.ADMIN, element: withSuspense(<AdminPage />) },
      { path: ROUTES.NOT_FOUND, element: withSuspense(<NotFoundPage />) },
    ],
  },
  // Map은 레이아웃 제외 (Header/Footer 없음)
  { path: ROUTES.MAP, element: withSuspense(<MapPage />) },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
