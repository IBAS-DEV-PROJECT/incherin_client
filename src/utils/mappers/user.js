import { toCamel, normalizeNulls } from './_common';

export const mapUser = dto => {
  if (!dto) return null;
  const c = toCamel(dto);
  const n = normalizeNulls(c, { imageUrl: '/images/default-profile.png' });

  return {
    id: n.userId,
    name: n.userName,
    imageUrl: n.imageUrl,
    createdAt: n.createdAt ? new Date(n.createdAt) : null,
    isNew: n.createdAt
      ? Date.now() - new Date(n.createdAt).getTime() < 1000 * 60 * 60 * 24 * 7
      : false,
  };
};
