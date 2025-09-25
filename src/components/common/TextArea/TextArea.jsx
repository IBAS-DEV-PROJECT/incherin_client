// --- 라이브러리 ---
import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

// --- 내부 (현재) ---
import { getContainerStyles, getTextareaStyles } from './TextArea.styles';

const StyledTextAreaContainer = styled.div(() => ({
  ...getContainerStyles(),
}));

const StyledTextArea = styled.textarea(({ theme }) => ({
  ...getTextareaStyles(theme),
}));

/**
 * TextArea 컴포넌트
 */
export function TextArea({ value, onChange, placeholder, ...rest }) {
  const theme = useTheme();

  return (
    <StyledTextAreaContainer>
      <StyledTextArea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...rest}
      />
    </StyledTextAreaContainer>
  );
}
