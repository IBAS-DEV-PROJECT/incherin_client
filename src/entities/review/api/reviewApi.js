import { API_BASE_URL, API_ENDPOINTS } from '@shared/config/api';

/**
 * [GET] 랜덤 닉네임 조회
 * 엔드포인트: /api/v1/reviews/nickname
 * 설명: "다른 닉네임 받기" 버튼 또는 페이지 진입 시 랜덤 닉네임 가져오기
 */
export const fetchRandomNickname = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.RANDOM_NICKNAME}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch random nickname: ${response.status}`);
    }
    
    const data = await response.json();
    return data.nickname;
  } catch (error) {
    console.error('Error fetching random nickname:', error);
    throw error;
  }
};

/**
 * [GET] 리뷰 목록 조회
 * 엔드포인트: /api/v1/shops/{shopId}/reviews
 * 설명: 특정 상점의 리뷰 목록을 가져오기 (최신순 정렬)
 */
export const fetchReviewsByShop = async (shopId) => {
  if (!shopId) {
    throw new Error('shopId is required');
  }

  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.SHOP_REVIEWS(shopId)}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch reviews: ${response.status}`);
    }
    
    const data = await response.json();
    return data; // 백엔드에서 이미 최신순으로 정렬되어 옴
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

/**
 * [POST] 리뷰 등록 (백엔드 구현 시 추가 예정)
 * 임시로 로컬 저장 로직 유지
 */
export const saveReviewForShop = async (shopId, review) => {
  if (!shopId) {
    throw new Error('shopId is required to save a review.');
  }

  // TODO: 백엔드 POST API 구현되면 연동 필요
  console.log('saveReviewForShop - received review:', review);
  
  // 임시: 리뷰 작성 기능은 백엔드 API 완성 후 구현
  throw new Error('Review submission API is not yet implemented');
};
