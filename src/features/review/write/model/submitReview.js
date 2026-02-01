import { saveReviewForShop } from '@entities/review/api/reviewApi';

const isValidRating = rating => {
  const value = Number(rating);
  return Number.isFinite(value) && value > 0 && value <= 5;
};

export const submitReview = async reviewData => {
  const { shopId, nickname, content, rating, images } = reviewData || {};

  console.log('submitReview - received images:', images); // 디버깅

  if (!shopId) {
    throw new Error('shopId가 필요해요.');
  }

  if (!isValidRating(rating)) {
    throw new Error('평점을 선택해주세요.');
  }

  const trimmedContent = content?.trim();
  if (!trimmedContent) {
    throw new Error('리뷰 내용을 입력해주세요.');
  }

  return saveReviewForShop(shopId, {
    nickname,
    rating: Number(rating),
    content: trimmedContent,
    images: images || [],
  });
};
