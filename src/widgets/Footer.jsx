// --- 라이브러리 ---
import React from 'react';
import styled from '@emotion/styled';

// --- 내부 (부모) ---
import InstagramIcon from '@shared/assets/image/InstagramIcon.png';

// Styled 컴포넌트
const StyledFooterContainer = styled.footer(({ theme }) => ({
  backgroundColor: theme.colors.black,
  width: '100%',
  padding: '40px 80px',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
}));

const StyledFooterTop = styled.div(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '40px',
}));

const StyledSection = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
}));

const StyledSectionTitle = styled.h4(({ theme }) => ({
  color: theme.colors.white,
  fontSize: '16px',
  fontWeight: 700,
  marginBottom: '8px',
}));

const StyledFooterLink = styled.a(({ theme }) => ({
  color: theme.colors.white,
  fontSize: '14px',
  textDecoration: 'none',
  '&:hover': {
    color: theme.colors.darkGray,
    textDecoration: 'underline',
  },
}));

// 인스타 아이콘 래퍼
const StyledInstagramIconWrap = styled.div(() => ({
  display: 'flex',
  '&:hover': {
    filter: 'grayscale(100%) brightness(0.7)',
  },
}));

const StyledFooterBottom = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '24px',
  fontSize: '12px',
  color: theme.colors.white,
  flexWrap: 'wrap',
}));

export function Footer() {
  return (
    <StyledFooterContainer>
      <StyledFooterTop>
        <StyledSection>
          <StyledSectionTitle>Team</StyledSectionTitle>
          <StyledFooterLink href="/about">About us</StyledFooterLink>
          <StyledFooterLink href="https://www.inhabas.com/">
            IBAS
          </StyledFooterLink>
        </StyledSection>

        <StyledSection>
          <StyledSectionTitle>Contact</StyledSectionTitle>
          <StyledFooterLink href="/help">도움말</StyledFooterLink>
          <StyledFooterLink href="/contact">문의하기</StyledFooterLink>
          <StyledFooterLink href="/apply">사장님 신청</StyledFooterLink>
        </StyledSection>

        <StyledSection>
          <StyledSectionTitle>Legal</StyledSectionTitle>
          <StyledFooterLink href="/terms">Terms & Conditions</StyledFooterLink>
          <StyledFooterLink href="/refund">
            Refund & Cancellation
          </StyledFooterLink>
          <StyledFooterLink href="/privacy">Privacy Policy</StyledFooterLink>
          <StyledFooterLink href="/cookie">Cookie Policy</StyledFooterLink>
        </StyledSection>

        <StyledSection>
          <StyledSectionTitle>FOLLOW US</StyledSectionTitle>
          <StyledInstagramIconWrap>
            <a
              href="https://www.instagram.com/inha_ibas.official/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={InstagramIcon} alt="Instagram" width={28} height={28} />
            </a>
          </StyledInstagramIconWrap>
        </StyledSection>
      </StyledFooterTop>
      <StyledFooterBottom>
        <span>All rights Reserved © Inchelin, 2025</span>
        <span>
          Based on a template by Themewagon. <a>Licensed under CC BY 4.0</a>
        </span>
      </StyledFooterBottom>
    </StyledFooterContainer>
  );
}
