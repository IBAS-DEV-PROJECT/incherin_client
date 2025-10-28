import React, { useState } from 'react';
import styled from '@emotion/styled';

import heartOutline from '../../../assets/image/heart.png';
import heartFill from '../../../assets/image/heart-fill.png';
import food from '../../../assets/image/food.webp';

// --- 더미 데이터 ---
const dummyData = {
  imageUrl: food,
  tags: [
    { type: 'rank', text: '7월 찜 1위' },
    { type: 'sponsor', text: '후원의 집' },
  ],
  name: '백소정 인하대후문점',
  category: '일식집',
  description: '분위기가 좋은 가게',
  reviewCount: 21,
  rating: 4.5,
  avgPrice: 8000,
  isLiked: false,
};

// --- 메인 컴포넌트 ---
function RecommendStore() {
  const [isLiked, setIsLiked] = useState(dummyData.isLiked);

  const handleLikeClick = e => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <StoreCard>
      <CardImageContainer>
        <CardImage src={dummyData.imageUrl} alt={dummyData.name} />
      </CardImageContainer>

      <CardInfoContainer>
        <CardHeader>
          <TitleGroup>
            <StoreName>{dummyData.name}</StoreName>
            <StoreCategory>{dummyData.category}</StoreCategory>
          </TitleGroup>
          <LikeButton onClick={handleLikeClick}>
            {/* ❗ [수정] isLiked 상태에 따라 다른 이미지를 보여줍니다. */}
            <HeartIcon
              src={isLiked ? heartFill : heartOutline}
              alt="찜하기"
              isLiked={isLiked}
            />
          </LikeButton>
        </CardHeader>
        <StoreDescription>{dummyData.description}</StoreDescription>
        <StoreStats>
          리뷰 {dummyData.reviewCount}개 / 별점 {dummyData.rating} / 평균{' '}
          {dummyData.avgPrice.toLocaleString()}원
        </StoreStats>
      </CardInfoContainer>
    </StoreCard>
  );
}

// --- 스타일 컴포넌트 ---

const HeartIcon = styled.img`
  width: 20px;
  height: 20px;

  /* isLiked가 false일 때만 grayscale 필터와 opacity를 적용해서 회색으로 보이게 만듦. */
  filter: ${({ isLiked }) => (isLiked ? 'none' : 'grayscale(1) opacity(0.6)')};
`;

const LikeButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StoreCard = styled.div`
  width: 328px;
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  margin: 16px;
  transition: transform 0.2s ease-in-out;
  }
`;

const CardImageContainer = styled.div`
  position: relative;
  height: 180px;
`;
const CardImage = styled.img`
  border-radius: 6px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: ${({ theme }) => theme.colors.gray};
`;

const CardInfoContainer = styled.div`
  padding: 16px 16px 12px 16px;
`;
const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;
const TitleGroup = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
`;
const StoreName = styled.h2`
  font-size: 20px;
  font-weight: 500;
  line-height: 1.5;
  margin: 0;
`;
const StoreCategory = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.darkGray};
`;
const StoreDescription = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.black};
  margin: 0 0 0 0;
`;
const StoreStats = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.darkGray};
  margin: 0;
`;

export default RecommendStore;
