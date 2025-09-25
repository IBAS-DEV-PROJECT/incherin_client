// --- 라이브러리 ---
import { ThemeProvider } from '@emotion/react';
import { theme } from './styles/theme';
import React from 'react';

// --- 내부 (현재) ---
// 라우팅 엔트리 (문서: 서비스/API & 라우팅 컨벤션)
import AppRouter from './routes/AppRouter';

// --- 루트 엔트리 (Default Export 허용) ---
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  );
}
