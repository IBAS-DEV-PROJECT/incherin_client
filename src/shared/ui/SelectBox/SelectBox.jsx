// --- 라이브러리 ---
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

// --- 내부 (현재) ---
import {
  getContainerStyles,
  getButtonStyles,
  getContentStyles,
  getItemStyles,
} from './SelectBox.styles';

// Styled 컴포넌트들
const StyledSelectBoxContainer = styled.div(({ theme }) => ({
  ...getContainerStyles(theme),
}));

const StyledSelectBoxButton = styled.div(({ theme }) => ({
  ...getButtonStyles(theme),
}));

const StyledSelectBoxContent = styled.div(({ theme }) => ({
  ...getContentStyles(theme),
}));

const StyledSelectBoxItem = styled.div(({ theme, $selected }) => ({
  ...getItemStyles(theme, $selected),
}));

// 항목 데이터 (임시)
const options = [
  '옵션-default',
  '옵션-hover',
  '옵션-pressed',
  '옵션-selected',
  '옵션',
];

/**
 * SelectBox 컴포넌트
 * @returns {JSX.Element}
 */
export function SelectBox() {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleOptionClick = option => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <StyledSelectBoxContainer>
      <StyledSelectBoxButton onClick={handleToggle}>
        <div>{selectedOption || '선택해주세요.'}</div>
        <div>{isOpen ? '∧' : '∨'}</div>
      </StyledSelectBoxButton>

      {isOpen && (
        <StyledSelectBoxContent>
          {options.map(option => (
            <StyledSelectBoxItem
              key={option}
              $selected={selectedOption === option}
              onClick={() => handleOptionClick(option)}
            >
              {selectedOption === option && '✓ '}
              {option}
            </StyledSelectBoxItem>
          ))}
        </StyledSelectBoxContent>
      )}
    </StyledSelectBoxContainer>
  );
}
