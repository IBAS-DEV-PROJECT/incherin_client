// --- 라이브러리 ---
import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
// --- 내부 (부모) ---
import { Button } from '@shared/ui';

// Styled 컴포넌트 (theme 사용)
const StyledContainer = styled.div(({ theme }) => ({
  minHeight: '60vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
  color: theme.colors.black,
}));

const StyledTitle = styled.h1(({ theme }) => ({
  ...(theme?.typography?.paragraph?.p1 || {}),
  fontSize: '28px',
  fontWeight: 700,
  margin: 0,
  color: theme.colors.blue,
}));

const StyledText = styled.p(({ theme }) => ({
  ...(theme?.typography?.paragraph?.p2 || {}),
  margin: 0,
  color: theme.colors.darkGray,
}));

// --- 페이지 엔트리 (Default Export 허용) ---
export default function NotFound() {
  const navigate = useNavigate();

  return (
    <StyledContainer>
      <StyledTitle>페이지를 찾을 수 없습니다</StyledTitle>
      <StyledText>요청하신 페이지가 존재하지 않거나 이동되었어요.</StyledText>
      <Button variant="subsidiary" onClick={() => navigate('/')}>
        홈으로 이동
      </Button>
    </StyledContainer>
  );
}
