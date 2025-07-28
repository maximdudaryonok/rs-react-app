import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setup-tests.ts',
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
        '**/*.cy.ts',
        '**/*.cy.tsx',
        'cypress/**',
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
