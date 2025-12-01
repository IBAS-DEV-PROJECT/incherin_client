// --- 라이브러리 ---
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

// --- 내부 (현재) ---
import {
  getContainerStyles,
  getHiddenInputStyles,
  getCheckboxStyles,
  getLabelStyles,
  CHECKBOX_SIZES,
  CHECKBOX_VARIANTS,
} from './Checkbox.styles';

// Styled 컴포넌트들
const StyledCheckboxContainer = styled.label(({ theme, $disabled }) => ({
  ...getContainerStyles(),
  ...($disabled && { cursor: 'not-allowed' }),
}));

const StyledHiddenCheckbox = styled.input(() => ({
  ...getHiddenInputStyles(),
}));

const StyledCheckbox = styled.div(({ theme, $checked, $disabled }) => ({
  ...getCheckboxStyles(theme, $checked, $disabled),
}));

const StyledCheckboxLabel = styled.span(({ theme, $disabled }) => ({
  ...getLabelStyles(theme, $disabled),
}));

/**
 * Checkbox 컴포넌트
 * @param {Object} props
 * @param {React.ReactNode} props.children - 체크박스 라벨
 * @param {boolean} [props.checked=false] - 체크 상태
 * @param {function} [props.onChange] - 체크 상태 변경 핸들러
 * @param {boolean} [props.disabled=false] - 비활성화 여부
 * @param {string} [props.id] - 체크박스 ID
 * @param {string} [props.name] - 체크박스 name 속성
 * @param {string} [props.value] - 체크박스 value 속성
 * @param {string} [props.size='medium'] - 체크박스 크기
 * @param {string} [props.variant='default'] - 체크박스 스타일 변형
 * @returns {JSX.Element}
 */
export function Checkbox({
  children,
  checked = false,
  onChange,
  disabled = false,
  id,
  name,
  value,
  size = CHECKBOX_SIZES.MEDIUM,
  variant = CHECKBOX_VARIANTS.DEFAULT,
  ...rest
}) {
  // --- 내부 상태/훅 ---
  const theme = useTheme();
  const [internalChecked, setInternalChecked] = useState(checked);

  // --- 방어적 코딩 ---
  const validSizes = Object.values(CHECKBOX_SIZES);
  const validVariants = Object.values(CHECKBOX_VARIANTS);

  const safeSize = validSizes.includes(size) ? size : CHECKBOX_SIZES.MEDIUM;
  const safeVariant = validVariants.includes(variant)
    ? variant
    : CHECKBOX_VARIANTS.DEFAULT;
  const isDisabled = Boolean(disabled);
  const isControlled = onChange !== undefined;
  const currentChecked = isControlled ? checked : internalChecked;

  // --- 핸들러 ---
  const handleChange = e => {
    if (isDisabled) return;

    const newChecked = e.target.checked;

    if (isControlled) {
      onChange?.(newChecked, e);
    } else {
      setInternalChecked(newChecked);
    }
  };

  // --- 렌더링 ---
  return (
    <StyledCheckboxContainer $disabled={isDisabled} htmlFor={id}>
      <StyledHiddenCheckbox
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={currentChecked}
        onChange={handleChange}
        disabled={isDisabled}
        aria-checked={currentChecked}
        aria-disabled={isDisabled}
        {...rest}
      />
      <StyledCheckbox $checked={currentChecked} $disabled={isDisabled}>
        {currentChecked && '✓'}
      </StyledCheckbox>
      {children && (
        <StyledCheckboxLabel $disabled={isDisabled}>
          {children}
        </StyledCheckboxLabel>
      )}
    </StyledCheckboxContainer>
  );
}
