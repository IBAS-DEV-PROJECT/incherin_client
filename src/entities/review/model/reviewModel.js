export const createReviewModel = (overrides = {}) => ({
  id: '',
  shopId: '',
  nickname: '',
  content: '',
  rating: 0,
  createdAt: '',
  ...overrides,
});
