import { defineConfig } from 'vitest/config';
//import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
//  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

// "@testing-library/jest-dom": "^6.6.3",
// "@testing-library/react": "^16.3.0",
// "@vitejs/plugin-react": "^4.6.0",
// "@vitest/coverage-v8": "^3.2.4",
// "@vitest/ui": "^3.2.4",
//  "jsdom": "^26.1.0",