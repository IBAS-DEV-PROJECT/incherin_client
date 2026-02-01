import React from 'react';
import styled from '@emotion/styled';
import { media } from '@shared/config/media';
import { ShopCard } from '@entities/shop';

/* 빈 화면 */
const EmptyState = styled.div`
  background-color: #f4f6fb;
  border-radius: 20px;
  padding: 60px 24px;
  border: 1px dashed #c7d2fe;
  text-align: center;
  color: #4b5563;
  font-size: 16px;
  font-weight: 500;

  ${media.mobile} {
    padding: 48px 20px;
    font-size: 15px;
  }

  ${media.mobileS} {
    padding: 40px 16px;
    font-size: 14px;
  }
`;

/* Grid Wrapper */
const Grid = styled.div`
  display: grid;
  gap: 28px;

  /* desktop */
  ${media.desktop} {
    grid-template-columns: repeat(3, 1fr);
  }

  /* tablet */
  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  /* mobile */
  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  /* mobileS */
  ${media.mobileS} {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const ShopListView = ({ shops, onSelectShop }) => {
  if (!shops || shops.length === 0) {
    return <EmptyState>아직 등록된 가게가 없어요.</EmptyState>;
  }

  return (
    <Grid>
      {shops.map(shop => (
        <ShopCard key={shop.id} shop={shop} onSelect={onSelectShop} />
      ))}
    </Grid>
  );
};
