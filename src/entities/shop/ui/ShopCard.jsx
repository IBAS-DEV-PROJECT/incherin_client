import React from 'react';

export const ShopCard = ({ shop }) => {
  return <div>{shop.name}</div>;
};

export const ShopDetailInfo = ({ shop }) => {
  return <div>{shop.description}</div>;
};
