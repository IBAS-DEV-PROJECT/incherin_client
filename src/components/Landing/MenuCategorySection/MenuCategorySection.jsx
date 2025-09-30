// --- 라이브러리 ---
import React from 'react';
import styled from '@emotion/styled';
import { ChevronLeft, ChevronRight } from '@untitledui/icons';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../routes/routeTable';

// --- 스타일 ---
const StyledSection = styled.section(({ theme }) => ({
  maxWidth: 1120,
  margin: '0 auto',
  padding: '48px 24px',
}));

const StyledHeader = styled.div(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 0 40px',
}));

const StyledTitle = styled.h2(({ theme }) => ({
  margin: 0,
  fontSize: 28,
  fontWeight: 600,
  color: theme.colors.black,
  textAlign: 'center',
}));

const StyledNavGroup = styled.div(() => ({
  position: 'absolute',
  top: 0,
  right: 36,
  display: 'flex',
  gap: 12,
}));

const StyledNavBtn = styled.button(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: 20,
  border: 'none',
  backgroundColor: theme.colors.blue,
  color: theme.colors.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
}));

const StyledCircleRow = styled.div(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: 20,
  alignItems: 'start',
}));

const StyledCircle = styled.div(({ theme }) => ({
  width: 140,
  height: 140,
  borderRadius: 70,
  backgroundColor: theme.colors.gray,
  margin: '0 auto',
}));

const StyledLabel = styled.div(({ theme }) => ({
  marginTop: 10,
  textAlign: 'center',
  fontSize: 14,
  fontWeight: 700,
  color: theme.colors.black,
}));

export function MenuCategorySection() {
  const navigate = useNavigate();
  const categories = ['한식', '중식', '양식', '일식', '패스트푸드'];
  return (
    <StyledSection>
      <StyledHeader>
        <StyledTitle>메뉴 카테고리</StyledTitle>
        <StyledNavGroup>
          <StyledNavBtn aria-label="prev">
            <ChevronLeft />
          </StyledNavBtn>
          <StyledNavBtn aria-label="next">
            <ChevronRight />
          </StyledNavBtn>
        </StyledNavGroup>
      </StyledHeader>
      <StyledCircleRow>
        {categories.map(name => (
          <div
            key={name}
            onClick={() => navigate(ROUTES.STORES)}
            style={{ cursor: 'pointer' }}
          >
            <StyledCircle />
            <StyledLabel>{name}</StyledLabel>
          </div>
        ))}
      </StyledCircleRow>
    </StyledSection>
  );
}
