import React from 'react';
import { ShopCard } from '@entities/shop';

export const ShopListView = ({ shops, onSelectShop }) => {
  if (!shops || shops.length === 0) {
    return (
      <div
        style={{
          backgroundColor: '#f4f6fb',
          borderRadius: '20px',
          padding: '60px 24px',
          border: '1px dashed #c7d2fe',
          textAlign: 'center',
          color: '#4b5563',
          fontSize: '16px',
          fontWeight: 500,
        }}
      >
        아직 등록된 가게가 없어요. 첫 번째 리뷰어가 되어주세요!
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gap: '28px',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
      }}
    >
      {shops.map(shop => (
        <ShopCard key={shop.id} shop={shop} onSelect={onSelectShop} />
      ))}
    </div>
  );
};
