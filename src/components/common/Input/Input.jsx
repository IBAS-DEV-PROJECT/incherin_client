// --- 라이브러리 ---
import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

// --- 내부 (현재) ---
// 스타일/상수 분리 import
import { getVariantStyles, INPUT_VARIANTS } from './Input.styles';

// Styled 컴포넌트들
const StyledInputContainer = styled.div(({ theme, $width }) => ({
  position: 'relative',
  width: $width || '300px',
}));

const StyledInput = styled.input(
  ({ theme, $inactive, $isError, $variantStyles }) => ({
    ...theme.typography.paragraph.p1,
    fontFamily: theme.typography.fontFamily,
    boxSizing: 'border-box',
    width: '100%',
    height: '44px',
    padding: '4px 5px 4px 18px',
    borderRadius: '10px',
    border: `solid 1px ${theme.colors.darkGray}`,
    backgroundColor: theme.colors.white,
    color: theme.colors.black,
    outline: 'none',
    transition: 'all 0.2s ease',

    // 비활성화 상태
    ...($inactive && {
      backgroundColor: theme.colors.gray,
      color: theme.colors.darkGray,
    }),

    // 에러 상태
    ...($isError && {
      borderColor: theme.colors.red,
    }),

    // 포커스 상태
    '&:focus': {
      border: `1px solid ${$isError ? theme.colors.red : theme.colors.blue}`,
    },

    // 플레이스홀더
    '&::placeholder': {
      color: theme.colors.darkGray,
    },

    // Variant 스타일
    ...$variantStyles,
  })
);

const StyledErrorIcon = styled.div(({ theme }) => ({
  position: 'absolute',
  right: '12px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: theme.colors.red,
  fontSize: '14px',
  fontWeight: 'bold',
}));

/**
 * Input 컴포넌트
 * @param {Object} props
 * @param {string} [props.variant='text'] - 입력 필드 타입 (id, password, email, text)
 * @param {boolean} [props.inactive=false] - 비활성화 상태
 * @param {string} [props.value] - 입력 값
 * @param {function} [props.onChange] - 값 변경 핸들러
 * @param {boolean} [props.isError=false] - 에러 상태
 * @param {string} [props.width='300px'] - 입력 필드 너비
 * @param {string} [props.placeholder] - 플레이스홀더 텍스트
 * @param {string} [props.type] - input type 속성
 * @param {boolean} [props.disabled=false] - 비활성화 여부
 * @returns {JSX.Element}
 */
export function Input({
  variant = INPUT_VARIANTS.TEXT,
  inactive = false,
  value,
  onChange,
  isError = false,
  width = '300px',
  placeholder,
  type,
  disabled = false,
  ...rest
}) {
  // --- 내부 상태/훅 ---
  const theme = useTheme();

  // --- 방어적 코딩 ---
  const validVariants = Object.values(INPUT_VARIANTS);
  const safeVariant = validVariants.includes(variant)
    ? variant
    : INPUT_VARIANTS.TEXT;
  const isInactive = Boolean(inactive);
  const isErrorState = Boolean(isError);
  const isDisabled = Boolean(disabled);

  // --- 스타일 계산 ---
  const variantProps = getVariantStyles(theme, safeVariant);
  const finalPlaceholder = placeholder || variantProps.placeholder;

  // --- 렌더링 ---
  return (
    <StyledInputContainer $width={width}>
      <StyledInput
        type={type || safeVariant}
        value={value}
        onChange={onChange}
        placeholder={finalPlaceholder}
        disabled={isDisabled || isInactive}
        $inactive={isInactive}
        $isError={isErrorState}
        $variantStyles={variantProps.styles}
        aria-invalid={isErrorState}
        aria-disabled={isDisabled || isInactive}
        {...rest}
      />
      {isErrorState && <StyledErrorIcon>※</StyledErrorIcon>}
    </StyledInputContainer>
  );
}
