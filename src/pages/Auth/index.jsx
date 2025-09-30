// --- 라이브러리 ---
import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

// --- 내부 ---
import { AuthForm } from '../../components/Auth';

// ================== 스타일 ==================
const StyledAuthContainer = styled.div(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.colors.lightGray,
  padding: '24px',
}));

const StyledAuthCard = styled.div(({ theme }) => ({
  backgroundColor: theme.colors.white,
  borderRadius: '16px',
  padding: '48px 40px',
  width: '100%',
  maxWidth: '400px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
}));

const StyledTitle = styled.h1(({ theme }) => ({
  fontSize: '28px',
  fontWeight: '700',
  color: theme.colors.black,
  margin: '0 0 40px 0',
}));

// ================== 컴포넌트 ==================
export default function Auth() {
  const theme = useTheme();

  const handleSocialLogin = provider => {
    console.log(`${provider} 로그인 시도`);
    // TODO: 실제 소셜 로그인 구현
  };

  return (
    <StyledAuthContainer>
      <StyledAuthCard>
        <StyledTitle>로그인</StyledTitle>
        <AuthForm onSocialLogin={handleSocialLogin} />
      </StyledAuthCard>
    </StyledAuthContainer>
  );
}
