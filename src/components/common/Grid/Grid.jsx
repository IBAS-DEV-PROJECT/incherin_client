// --- 라이브러리 ---
import React from 'react';
import styled from '@emotion/styled';

// --- 내부 (현재) ---
import { getVariantStyles, GRID_VARIANTS } from './Grid.styles';

// Styled 컴포넌트
const StyledGrid = styled.div(({ theme, $variant, $gap, $columns }) => ({
  display: 'grid',
  gap: $gap || 16,
  ...getVariantStyles(theme, $variant, $columns),
}));

/**
 * Grid 컴포넌트
 * @param {Object} props
 * @param {React.ReactNode} props.children - 그리드 내용
 * @param {'auto'|'ranking'|'recommend'|'feature'|'carousel'} [props.variant='auto'] - 그리드 스타일 변형
 * @param {number} [props.gap] - 간격 커스터마이징
 * @param {number} [props.columns] - 컬럼 수 (auto variant에서 사용)
 * @param {string} [props.className] - 추가 CSS 클래스
 * @returns {JSX.Element}
 */
export function Grid({
  children,
  variant = GRID_VARIANTS.AUTO,
  gap,
  columns,
  className,
  ...rest
}) {
  return (
    <StyledGrid
      $variant={variant}
      $gap={gap}
      $columns={columns}
      className={className}
      {...rest}
    >
      {children}
    </StyledGrid>
  );
}
