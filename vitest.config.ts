import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      assets: resolve(__dirname, 'src/assets'),
      models: resolve(__dirname, 'src/models'),
      shared: resolve(__dirname, 'src/shared'),
      pages: resolve(__dirname, 'src/pages'),
      components: resolve(__dirname, 'src/components'),
      features: resolve(__dirname, 'src/features'),
      routerProvider: resolve(__dirname, 'src/app/providers'),
      app: resolve(__dirname, 'src/app'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8',
      exclude: [
        'src/vite-env.d.ts',
        'vite.config.ts',
        'vitest.config.ts',
        'eslint.config.js',
        'dist/**',
        'src/models/**',
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/index.ts',
        '**/index.tsx',
      ],
      thresholds: {
        global: {
          statements: 80,
          branches: 50,
          functions: 50,
          lines: 50,
        },
      },
    },
  },
});
