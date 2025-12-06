import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
  resolve: {
    alias: [
      { find: '@app', replacement: './src/app' },
      { find: '@pages', replacement: './src/pages' },
      { find: '@widgets', replacement: './src/widgets' },
      { find: '@features', replacement: './src/features' },
      { find: '@entities', replacement: './src/entities' },
      { find: '@shared', replacement: './src/shared' },
    ],
  },
});
