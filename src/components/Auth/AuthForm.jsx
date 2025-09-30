// --- 라이브러리 ---
import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

// --- 내부 ---
import {
  getAuthFormStyles,
  getSocialButtonStyles,
  getIconStyles,
  PROVIDER_CONFIG,
} from './AuthForm.styles';

// ================== 스타일 ==================
const StyledAuthForm = styled.div(getAuthFormStyles);

const StyledSocialButton = styled.button(({ theme, provider, disabled }) =>
  getSocialButtonStyles(theme, provider, disabled)
);

const StyledIcon = styled.div(getIconStyles);

// ================== 컴포넌트 ==================
export function AuthForm({ onSocialLogin }) {
  const theme = useTheme();

  const handleSocialLogin = provider => {
    if (onSocialLogin) {
      onSocialLogin(provider);
    }
  };

  return (
    <StyledAuthForm>
      {Object.entries(PROVIDER_CONFIG).map(([key, config]) => (
        <StyledSocialButton
          key={key}
          provider={key}
          disabled={!config.enabled}
          onClick={() => handleSocialLogin(key)}
        >
          <StyledIcon>
            <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
              {config.icon}
            </span>
          </StyledIcon>
          {config.name}
        </StyledSocialButton>
      ))}
    </StyledAuthForm>
  );
}
