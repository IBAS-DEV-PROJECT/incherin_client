import { SHOPS } from '../data/shops';

const delay = (ms = 200) => new Promise(resolve => setTimeout(resolve, ms));

const normalizeShops = () => SHOPS.map(shop => ({ ...shop }));

export const fetchShops = async ({ category } = {}) => {
  await delay();
  const shops = normalizeShops();

  if (category && category !== '전체') {
    return shops.filter(shop => shop.category === category);
  }

  return shops;
};

export const fetchShopById = async id => {
  if (!id) {
    throw new Error('가게 ID가 필요합니다.');
  }

  await delay(120);
  const shop = normalizeShops().find(item => item.id === id);

  if (!shop) {
    throw new Error('해당 가게를 찾을 수 없어요.');
  }

  return shop;
};
