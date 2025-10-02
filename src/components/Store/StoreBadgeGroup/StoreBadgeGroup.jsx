// --- 라이브러리 ---
import React from 'react';
import styled from '@emotion/styled';

// --- 내부 (부모) ---
import { Badge } from '../../../common';

// --- 스타일 ---
const BadgeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const Category = styled.span(({ theme }) => ({
  fontSize: '14px',
  color: theme.colors.darkGray,
  margin-right: 4px; /* 이름과 간격 */
}));

/**
 * @param {object} props
 * @param {string} props.category - 가게 카테고리
 * @param {boolean} props.isOperating - 현재 영업 중 여부
 * @param {boolean} props.isDelivery - 배달 가능 여부
 */
export function StoreBadgeGroup({ category, isOperating, isDelivery }) {
  return (
    <BadgeContainer>
      <Category>{category}</Category>
      {!isOperating && (
        <Badge variant="secondary" size="small">
          영업 종료
        </Badge>
      )}
      {isDelivery && (
        <Badge variant="light" size="small" color="#27509B">
          배달 가능
        </Badge>
      )}
    </BadgeContainer>
  );
}