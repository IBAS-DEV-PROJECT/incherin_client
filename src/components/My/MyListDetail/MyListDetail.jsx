// --- 라이브러리 ---
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';

// --- 스타일 ---
const StyledContainer = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledTitle = styled.h2`
  font-size: 22px;
  font-weight: bold;
  color: #27509b;
  margin-bottom: 12px;
`;

const StyledStoreCard = styled.div`
  background: #fff;
  border: 1px solid #e9e9e9;
  border-radius: 12px;
  padding: 20px;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b1b1b1;
  font-size: 14px;
`;

export default function MyListDetail() {
  // --- 내부 상태/훅 ---
  const { id } = useParams();

  // --- 렌더링 ---
  return (
    <StyledContainer>
      <StyledTitle>리스트 상세 (ID: {id})</StyledTitle>

      <StyledStoreCard>여기에 가게 정보가 표시될 예정입니다.</StyledStoreCard>
      <StyledStoreCard>여기에 가게 정보가 표시될 예정입니다.</StyledStoreCard>
      <StyledStoreCard>여기에 가게 정보가 표시될 예정입니다.</StyledStoreCard>
    </StyledContainer>
  );
}
