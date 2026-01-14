const simulateDelay = (ms = 80) =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

const initialReviews = {
  1: [
    {
      id: 'rv_1',
      shopId: '1',
      nickname: '리뷰왕',
      rating: 5,
      content: '여기는 진짜 환상의 국밥집이에요. 매일 가고 싶어요.',
      createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    },
    {
      id: 'rv_2',
      shopId: '1',
      nickname: '인덕군',
      rating: 4,
      content: '국물이 깊고 밥알도 살아 있어요.',
      createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    },
  ],
  2: [
    {
      id: 'rv_3',
      shopId: '2',
      nickname: '짱맛러',
      rating: 5,
      content: '딤섬부터 볶음밥까지 하나하나 훌륭합니다.',
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
  ],
};

const reviewStore = { ...initialReviews };

const ensureShopReviews = shopId => {
  if (!reviewStore[shopId]) {
    reviewStore[shopId] = [];
  }
  return reviewStore[shopId];
};

const sortByNewest = reviews =>
  [...reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

const sanitizeReview = review => ({
  id: review?.id || `rv_${Date.now().toString(36)}`,
  shopId: review.shopId,
  nickname: review?.nickname || '익명',
  rating: Number(review?.rating) || 0,
  content: (review?.content || '').trim(),
  createdAt: review?.createdAt || new Date().toISOString(),
});

export const fetchReviewsByShop = async shopId => {
  await simulateDelay();

  if (!shopId) return [];

  return sortByNewest(ensureShopReviews(shopId));
};

export const saveReviewForShop = async (shopId, review) => {
  if (!shopId) {
    throw new Error('shopId is required to save a review.');
  }

  const safeReview = sanitizeReview({ ...review, shopId });
  const target = ensureShopReviews(shopId);
  target.unshift(safeReview);

  return safeReview;
};

export const clearReviews = shopId => {
  if (!shopId) return;
  delete reviewStore[shopId];
};
