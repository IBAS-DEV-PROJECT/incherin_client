// --- 라이브러리 ---
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

// --- 내부 (부모) ---
import LogoImage from '../assets/image/logo2.png';
import SearchIcon from '../assets/image/search.png';
import UserIcon from '../assets/image/user.png';

// Styled 컴포넌트
const StyledHeaderContainer = styled.header(({ theme }) => ({
  width: '100%',
  background: theme.colors.white,
  boxSizing: 'border-box',
  padding: '18px',
  margin: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)',
}));

// 로고 영역
const StyledLogo = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  img: {
    transform: 'scale(0.8)',
  },
}));

// 사용자 유형
const StyledUserType = styled.div(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 700,
  color: theme.colors.darkGray,
  paddingLeft: '22px',
  wordSpacing: '2px',
  letterSpacing: '2px',
  span: {
    fontSize: '16px',
    color: theme.colors.blue,
    margin: '0 10px',
  },
}));

// 오른쪽 요소 컨테이너
const StyledRightContainer = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  paddingRight: '18px',
  gap: '18px',
}));

// 검색 컨테이너
const StyledSearch = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 16px',
  gap: '8px',
  border: `1px solid ${theme.colors.darkGray}`,
  borderRadius: '6px',
}));

// 검색 입력
const StyledSearchInput = styled.input(() => ({
  border: 'none',
  outline: 'none',
  fontSize: '16px',
  fontWeight: 700,
  width: '80px',
}));

// 로그인/로그아웃 버튼
const StyledHeaderButton = styled.button(({ theme, isLoggedIn }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '114px',
  gap: '4px',
  padding: '8px 12px',
  borderRadius: '6px',
  fontSize: '16px',
  fontWeight: 700,
  cursor: 'pointer',
  backgroundColor: theme.colors.white,
  border: `1px solid ${isLoggedIn ? theme.colors.darkGray : theme.colors.blue}`,
  color: isLoggedIn ? theme.colors.darkGray : theme.colors.blue,
  img: {
    transform: 'scale(0.7)',
    margin: 0,
  },
  '&:hover': {
    background: isLoggedIn ? theme.colors.white : theme.colors.blue,
    color: isLoggedIn ? theme.colors.black : theme.colors.white,
  },
}));

export function Header() {
  const [userType, setUserType] = useState('게스트');
  const isLoggedIn = userType !== '게스트';

  const handleLoginToggle = () => {
    if (isLoggedIn) {
      setUserType('게스트');
    } else {
      setUserType('이용자');
    }
  };

  return (
    <StyledHeaderContainer>
      <StyledLogo>
        <img src={LogoImage} alt="Logo" />
      </StyledLogo>

      <StyledUserType>
        당신은 현재 <span>{userType}</span> 입니다
      </StyledUserType>

      <StyledRightContainer>
        <StyledSearch>
          <img src={SearchIcon} alt="Search" width={16} />
          <StyledSearchInput type="text" placeholder="통합검색" />
        </StyledSearch>

        <StyledHeaderButton isLoggedIn={isLoggedIn} onClick={handleLoginToggle}>
          <img src={UserIcon} alt="User" />
          {isLoggedIn ? '로그아웃' : '로그인'}
        </StyledHeaderButton>
      </StyledRightContainer>
    </StyledHeaderContainer>
  );
}
