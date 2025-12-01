// --- 라이브러리 ---
import React from 'react';
import styled from '@emotion/styled';

// --- 내부 (현재) ---
import {
  getVariantStyles,
  sizeStyles,
  BADGE_VARIANTS,
  BADGE_SIZES,
} from './Badge.styles';

const StyledBadge = styled.span(
  ({
    theme,
    $variant,
    $size,
    $rounded,
    $clickable,
    $bgOverride,
    $colorOverride,
  }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 500,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    borderRadius: $rounded ? '12px' : '4px',
    cursor: $clickable ? 'pointer' : 'default',
    border: 'none',
    lineHeight: 1,
    transition: 'opacity 0.2s ease',
    ...sizeStyles[$size],
    ...getVariantStyles(theme, $variant),
    ...($bgOverride ? { backgroundColor: $bgOverride } : {}),
    ...($colorOverride ? { color: $colorOverride } : {}),
    ...($clickable
      ? {
          '&:hover': {
            opacity: 0.8,
          },
        }
      : {}),
  })
);

/**
 * Badge 컴포넌트
 * @param {Object} props
 * @param {React.ReactNode} props.children - 뱃지 내용
 * @param {'primary'|'secondary'|'success'|'danger'|'warning'|'info'|'light'|'dark'} [props.variant='primary'] - 뱃지 스타일 변형
 * @param {'small'|'medium'|'large'} [props.size='medium'] - 뱃지 크기
 * @param {string} [props.color] - 텍스트 색상 오버라이드 (선택적)
 * @param {string} [props.backgroundColor] - 배경색 오버라이드 (선택적)
 * @param {function} [props.onClick] - 클릭 핸들러 (선택적)
 * @param {boolean} [props.rounded=true] - 둥근 모서리 여부
 * @returns {JSX.Element}
 */
export function Badge({
  children,
  variant = BADGE_VARIANTS.PRIMARY,
  size = BADGE_SIZES.MEDIUM,
  color,
  backgroundColor,
  onClick,
  rounded = true,
  ...rest
}) {
  // --- 방어적 코딩 ---
  const validVariants = Object.values(BADGE_VARIANTS);
  const validSizes = Object.values(BADGE_SIZES);

  const safeVariant = validVariants.includes(variant)
    ? variant
    : BADGE_VARIANTS.PRIMARY;
  const safeSize = validSizes.includes(size) ? size : BADGE_SIZES.MEDIUM;
  const isClickable = Boolean(onClick);

  // --- 렌더링 ---
  return (
    <StyledBadge
      $variant={safeVariant}
      $size={safeSize}
      $rounded={rounded}
      $clickable={isClickable}
      $bgOverride={backgroundColor}
      $colorOverride={color}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      {...rest}
    >
      {children}
    </StyledBadge>
  );
}
