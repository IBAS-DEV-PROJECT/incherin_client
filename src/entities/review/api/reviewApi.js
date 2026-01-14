import { storage } from '@shared/lib/local-storage';

export const REVIEW_STORAGE_KEY = 'incherin.reviews.v1';

const readAll = () => {
  const fallback = {};
  const stored = storage.get(REVIEW_STORAGE_KEY);
  return stored && typeof stored === 'object' ? stored : fallback;
};

const writeAll = data => {
  storage.set(REVIEW_STORAGE_KEY, data);
};

const createReviewId = () => {
  const entropy = Math.random().toString(36).slice(2, 6);
  return `rv_${Date.now().toString(36)}${entropy}`;
};

const sanitizeContent = content => content?.trim() || '';

export const fetchReviewsByShop = async shopId => {
  if (!shopId) return [];

  const all = readAll();
  const list = Array.isArray(all[shopId]) ? all[shopId] : [];

  return [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const saveReviewForShop = async (shopId, review) => {
  if (!shopId) throw new Error('shopId is required to save a review.');

  const safeReview = {
    id: review?.id || createReviewId(),
    shopId,
    nickname: review?.nickname || '익명',
    rating: Number(review?.rating) || 0,
    content: sanitizeContent(review?.content),
    createdAt: review?.createdAt || new Date().toISOString(),
  };

  const all = readAll();
  const list = Array.isArray(all[shopId]) ? all[shopId] : [];
  const updated = [safeReview, ...list];

  writeAll({
    ...all,
    [shopId]: updated,
  });

  return safeReview;
};

export const clearReviews = shopId => {
  if (!shopId) return;
  const all = readAll();
  if (!all[shopId]) return;

  const { [shopId]: _removed, ...rest } = all;
  writeAll(rest);
};
