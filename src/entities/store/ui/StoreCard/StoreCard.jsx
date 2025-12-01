// --- 라이브러리 ---
import React from 'react';
import styled from '@emotion/styled';

// --- 내부 (부모) ---
import { Card, Img } from '@shared/ui';
import { StoreBadgeGroup } from '../StoreBadgeGroup';
import { StoreSummary } from '../StoreSummary';
import FoodImg from '@shared/assets/image/food.webp'; // 이미지 경로 수정

// --- 기본 더미 데이터 ---
const defaultStoreData = {
  imageUrl: FoodImg,
  name: '백소정 인하대후문점',
  category: '일식당',
  isOperating: true,
  isDelivery: true,
  rating: 4.9,
  reviewCount: 21,
  likeCount: 231,
  distance: '451m',
};

// --- 스타일 ---
const StyledStoreCard = styled(Card)`
  cursor: pointer;
  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  }
`;

const ImageContainer = styled.div`
  position: relative;
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
export function StoreCard({ store = defaultStoreData }) {
  const {
    imageUrl,
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
    <StyledStoreCard padding="0">
      <ImageContainer>
        <Img
          src={imageUrl}
          alt={name}
          height="200px"
          borderRadius="12px 12px 0 0"
        />
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
    </StyledStoreCard>
  );
}
