import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, Global, css } from '@emotion/react';
import { theme } from '../styles/theme';

export const Providers = ({ children }) => {
  // 👇 콘솔에 theme이 잘 찍히는지 확인 (undefined가 나오면 import 실패)
  console.log('Current Theme:', theme);

  // theme이 없을 경우를 대비한 방어 코드
  if (!theme) return <div>Theme 로딩 실패! console을 확인하세요.</div>;

  // Global 스타일을 컴포넌트 내부로 이동 (theme 접근 안전성 확보)
  const globalStyles = css`
    body {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      /* theme.typography가 없으면 기본 폰트 사용 */
      font-family: ${theme?.typography?.fontFamily || 'sans-serif'};
    }
  `;

  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <BrowserRouter>{children}</BrowserRouter>
    </ThemeProvider>
  );
};
