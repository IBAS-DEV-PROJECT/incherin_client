import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import logo2 from '@shared/assets/image/logo2.png';
import { media } from '@shared/config/media';

const HeaderContainer = styled.header`
  background-color: #ffffff;
  padding: 11px 40px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);

  ${media.mobile} {
    padding: 8px 16px;
  }
  ${media.mobileS} {
    padding: 8px 12px;
  }
`;

const LogoImage = styled.img`
  height: 42px;
  width: auto;
  cursor: pointer;
  transition: height 0.2s ease;

  ${media.mobile} {
    height: 32px;
  }
  ${media.mobileS} {
    height: 28px;
  }
`;

export const Header = () => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <LogoImage src={logo2} alt="INCHELIN" onClick={() => navigate('/')} />
    </HeaderContainer>
  );
};
