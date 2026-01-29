// API 베이스 URL 설정
// 백엔드 서버 주소를 여기에 설정하세요
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

// API 엔드포인트
export const API_ENDPOINTS = {
  // 리뷰 관련
  RANDOM_NICKNAME: '/api/v1/reviews/nickname',
  SHOP_REVIEWS: (shopId) => `/api/v1/shops/${shopId}/reviews`,
};
