import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      shared: resolve(__dirname, 'src/shared'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
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
        'src/shared/types/**'
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
})
