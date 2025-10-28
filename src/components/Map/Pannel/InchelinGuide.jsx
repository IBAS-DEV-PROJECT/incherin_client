/** @jsxImportSource @emotion/react */
// --- 라이브러리 ---
import React from 'react';
import styled from '@emotion/styled';

// --- 내부 모듈 ---
import RecommendStore from './RecommendStore.jsx';
import SearchBar from './SearchBar.jsx';

//인슐랭 가이드 패널 전체 틀
const PannelContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

// 패널 상단 콘텐츠 영역
const StyledContentHeader = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-shrink: 0;
  padding-bottom: 24px;
`;

// 패널 하단 콘텐츠 영역
const StyledContentWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center; 
  flex-direction: column; 
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 16px;

   &::-webkit-scrollbar {
    width: 4px;  /* 스크롤바의 너비 */
  }

  &::-webkit-scrollbar-thumb {
    height: 17%; /* 스크롤바의 길이 */
    background: #B1B1B1; 
    border-radius: 10px;
`;

// 텍스트

const StyledTextContainer = styled.div`
  width: 328px;
  display: flex;
  justify-content: flex-start;
`;
const StyledText = styled.div`
  font-size: 20px;
  line-height: 1.5;
  font-weight: 700;
`;

export function InchelinGuide({ style, ...rest }) {
  return (
    <PannelContainer>
      <StyledContentHeader>
        <SearchBar />
      </StyledContentHeader>
      <StyledContentWrapper>
        <StyledTextContainer>
          <StyledText>인슐랭 가이드</StyledText>
        </StyledTextContainer>
        <RecommendStore />
        <RecommendStore />
        <RecommendStore />
      </StyledContentWrapper>
    </PannelContainer>
  );
}

export default InchelinGuide;
