// --- 라이브러리 ---
import React from 'react';
import styled from '@emotion/styled';

// --- 내부 (현재) ---
import {
  getVariantStyles,
  getBaseStyles,
  BUTTON_VARIANTS,
} from './Button.styles';

// Styled 컴포넌트
const StyledButton = styled.button(({ theme, $variant, $active }) => ({
  ...getBaseStyles(theme),
  ...getVariantStyles(theme, $variant, $active),
}));

/**
 * Button 컴포넌트
 * @param {Object} props
 * @param {React.ReactNode} props.children - 버튼 내용
 * @param {'primary'|'subsidiary'|'secondary'} [props.variant='primary'] - 버튼 스타일 변형
 * @param {boolean} [props.active=false] - 활성 상태 여부
 * @param {function} [props.onClick] - 클릭 핸들러
 * @param {boolean} [props.disabled=false] - 비활성화 여부
 * @param {string} [props.type='button'] - 버튼 타입 (button, submit, reset)
 * @returns {JSX.Element}
 */
export function Button({
  children,
  variant = BUTTON_VARIANTS.PRIMARY,
  active = false,
  onClick,
  disabled = false,
  type = 'button',
  ...rest
}) {
  // --- 방어적 코딩 ---
  const validVariants = Object.values(BUTTON_VARIANTS);
  const safeVariant = validVariants.includes(variant)
    ? variant
    : BUTTON_VARIANTS.PRIMARY;
  const isActive = Boolean(active);
  const isDisabled = Boolean(disabled);

  // --- 핸들러 ---
  const handleClick = e => {
    if (isDisabled) return;
    onClick?.(e);
  };

  // --- 렌더링 ---
  return (
    <StyledButton
      $variant={safeVariant}
      $active={isActive}
      onClick={handleClick}
      disabled={isDisabled}
      type={type}
      aria-pressed={isActive}
      aria-disabled={isDisabled}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}
