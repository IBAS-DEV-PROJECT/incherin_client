// --- 라이브러리 ---
import React from 'react';
import styled from '@emotion/styled';

// --- 내부 (현재) ---
import { getVariantStyles, CARD_VARIANTS } from './Card.styles';

// Styled 컴포넌트
const StyledCard = styled.div(({ theme, $variant, $padding, $shadow }) => ({
  backgroundColor: theme?.colors?.white || '#ffffff',
  borderRadius: 12,
  boxShadow: $shadow || '0 1px 6px rgba(0,0,0,0.08)',
  overflow: 'hidden',
  padding: $padding || 16,
  ...getVariantStyles(theme, $variant),
}));

/**
 * Card 컴포넌트
 * @param {Object} props
 * @param {React.ReactNode} props.children - 카드 내용
 * @param {'default'|'recommend'|'ranking'|'feature'} [props.variant='default'] - 카드 스타일 변형
 * @param {string} [props.padding] - 패딩 커스터마이징
 * @param {string} [props.shadow] - 그림자 커스터마이징
 * @param {string} [props.className] - 추가 CSS 클래스
 * @returns {JSX.Element}
 */
export function Card({
  children,
  variant = CARD_VARIANTS.DEFAULT,
  padding,
  shadow,
  className,
  ...rest
}) {
  return (
    <StyledCard
      $variant={variant}
      $padding={padding}
      $shadow={shadow}
      className={className}
      {...rest}
    >
      {children}
    </StyledCard>
  );
}
