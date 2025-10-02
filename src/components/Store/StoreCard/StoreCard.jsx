// --- 라이브러리 ---
import React from 'react';
import styled from '@emotion/styled';

// --- 내부 (부모) ---
import { Card, Img, Badge } from '../../../common';
import { StoreBadgeGroup } from '../StoreBadgeGroup/StoreBadgeGroup';
import { StoreSummary } from '../StoreSummary/StoreSummary';

// --- 스타일 ---
const ImageContainer = styled.div`
  position: relative;
`;

const ColdBadge = styled(Badge)`
  position: absolute;
  top: 12px;
  right: 12px;
`;

const InfoContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StoreName = styled.h3(({ theme }) => ({
  margin: 0,
  fontSize: '18px',
  fontWeight: 700,
  color: theme.colors.black,
}));

/**
 * @param {object} props - 가게 데이터 객체
 */
export function StoreCard({ store }) {
  const {
    imageUrl,
    isCold,
    name,
    category,
    isOperating,
    isDelivery,
    rating,
    reviewCount,
    likeCount,
    distance,
  } = store;

  return (
    <Card padding="0" shadow="0 4px 12px rgba(0,0,0,0.08)">
      <ImageContainer>
        <Img src={imageUrl} alt={name} height="200px" borderRadius="12px 12px 0 0" />
        {isCold && (
          <ColdBadge variant="primary" size="small">
            COLD
          </ColdBadge>
        )}
      </ImageContainer>

      <InfoContainer>
        <StoreName>{name}</StoreName>
        <StoreBadgeGroup
          category={category}
          isOperating={isOperating}
          isDelivery={isDelivery}
        />
        <StoreSummary
          rating={rating}
          reviewCount={reviewCount}
          likeCount={likeCount}
          distance={distance}
        />
      </InfoContainer>
    </Card>
  );
}