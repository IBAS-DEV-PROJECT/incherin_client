// --- 라이브러리 ---
import React from 'react';
import styled from '@emotion/styled';
import { Heart, MarkerPin01 } from '@untitledui/icons';

// --- 스타일 ---
const SummaryContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const MetaInfo = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '14px',
  color: theme.colors.black,
}));

const StyledIcon = styled.span`
  display: flex;
  align-items: center;
  transform: translateY(1px);
`;

/**
 * @param {object} props
 * @param {number} props.rating - 평점
 * @param {number} props.reviewCount - 리뷰 수
 * @param {number} props.likeCount - 찜하기 수
 * @param {string} props.distance - 거리 (예: '451m')
 */
export function StoreSummary({
  rating = 4.9,
  reviewCount = 21,
  likeCount = 231,
  distance = '451m',
}) {
  return (
    <SummaryContainer>
      <MetaInfo>
        <span role="img" aria-label="rating">
          ⭐
        </span>
        <strong>{rating}</strong>
      </MetaInfo>
      <MetaInfo>리뷰 {reviewCount}</MetaInfo>
      <MetaInfo>
        <StyledIcon>
          <Heart size={14} />
        </StyledIcon>
        {likeCount}
      </MetaInfo>
      <MetaInfo>
        <StyledIcon>
          <MarkerPin01 size={14} />
        </StyledIcon>
        {distance}
      </MetaInfo>
    </SummaryContainer>
  );
}
