export const filterByCategory = (shops, category) => {
  if (!category) return shops;
  return shops.filter(shop => shop.category === category);
};
