export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const API_ENDPOINTS = {
  // 가게 목록, 상세 정보 조회
  SHOPS: '/api/v1/shops',
  SHOP_DETAIL: id => `/api/v1/shops/${id}`,

  RANDOM_NICKNAME: '/api/v1/reviews/nickname',
  SHOP_REVIEWS: shopId => `/api/v1/shops/${shopId}/reviews`,

  ROULETTE_OPTIONS: '/api/v1/roulette/options',
};
