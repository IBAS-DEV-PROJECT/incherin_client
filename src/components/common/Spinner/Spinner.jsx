// --- 라이브러리 ---
import React from 'react';
import styled from '@emotion/styled';

// --- 내부 (현재) ---
import {
  getContainerStyles,
  getOverlayStyles,
  getSpinnerStyles,
  getMessageStyles,
} from './Spinner.styles';

const StyledSpinnerContainer = styled.div(() => ({
  ...getContainerStyles(),
}));

const StyledSpinnerOverlay = styled.div(() => ({
  ...getOverlayStyles(),
}));

const StyledSpinnerCore = styled.div(({ $size, $color }) => ({
  ...getSpinnerStyles($size, $color),
}));

const StyledSpinnerMessage = styled.div(() => ({
  ...getMessageStyles(),
}));

/**
 * Spinner 컴포넌트
 */
export function Spinner({
  size = 40,
  color = '#27509B',
  message = '로딩 중...',
  showMessage = true,
  overlay = false,
}) {
  const animationCSS = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  const body = (
    <>
      <style>{animationCSS}</style>
      <StyledSpinnerCore $size={size} $color={color} />
      {showMessage && <StyledSpinnerMessage>{message}</StyledSpinnerMessage>}
    </>
  );

  if (overlay) {
    return <StyledSpinnerOverlay>{body}</StyledSpinnerOverlay>;
  }

  return <StyledSpinnerContainer>{body}</StyledSpinnerContainer>;
}
