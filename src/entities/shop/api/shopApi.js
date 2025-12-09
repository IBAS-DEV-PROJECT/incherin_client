import { SHOPS } from '../data/shops';

export const fetchShops = async () => {
  // Simulate API delay
  await new Promise((res) => setTimeout(res, 300));
  return [...SHOPS];
};
