import { API_BASE_URL, API_ENDPOINTS } from '@shared/config/api';

export const fetchRandomNickname = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.RANDOM_NICKNAME}`
    );

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

export const fetchReviewsByShop = async shopId => {
  if (!shopId) {
    throw new Error('shopId is required');
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.SHOP_REVIEWS(shopId)}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch reviews: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

export const saveReviewForShop = async (shopId, reviewData) => {
  if (!shopId) {
    throw new Error('shopId is required to save a review.');
  }

  try {
    const formData = new FormData();
    formData.append('shopId', Number(shopId));
    formData.append('nickname', reviewData.nickname);
    formData.append('rating', reviewData.rating);
    formData.append('content', reviewData.content);

    if (reviewData.images && reviewData.images.length > 0) {
      reviewData.images.forEach(imageObj => {
        if (imageObj.file) {
          formData.append('images', imageObj.file);
        } else if (imageObj instanceof File) {
          // 순수 파일 객체가 올 경우
          formData.append('images', imageObj);
        }
      });
    }

    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.SHOP_REVIEWS(shopId)}`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to submit review: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting review:', error);
    throw error;
  }
};
