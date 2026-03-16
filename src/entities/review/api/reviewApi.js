import imageCompression from 'browser-image-compression';
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

    // 이미지 압축 옵션 설정
    const compressionOptions = {
      maxWidthOrHeight: 1280, // 가로/세로 최대 1280px
      maxSizeMB: 1, // 최대 1MB
      useWebWorker: true,
    };

    if (reviewData.images && reviewData.images.length > 0) {
      for (const imageObj of reviewData.images) {
        const fileToUpload =
          imageObj.file || (imageObj instanceof File ? imageObj : null);

        if (fileToUpload) {
          try {
            // 이미지 리사이징 및 압축
            const compressedBlob = await imageCompression(
              fileToUpload,
              compressionOptions
            );

            const finalFile = new File([compressedBlob], fileToUpload.name, {
              type: fileToUpload.type,
            });

            formData.append('images', finalFile);
            console.log(`${fileToUpload.name} 리사이징 완료!`);
          } catch (err) {
            console.error('압축 실패, 원본 전송:', err);
            formData.append('images', fileToUpload);
          }
        }
      }
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
