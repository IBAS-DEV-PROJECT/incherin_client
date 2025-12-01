// --- 라우트 테이블 ---
export const ROUTES = {
  HOME: '/', // 랜딩
  AUTH: '/auth', // 구글 OAuth 진입
  MAP: '/map',
  STORES: '/stores',
  STORE_DETAIL: (id = ':id') => `/stores/${id}`,
  MY: '/my',
  ADMIN: '/admin',
  NOT_FOUND: '*',
};
