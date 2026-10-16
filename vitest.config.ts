import { defineConfig } from 'vitest/config';

// Отдельный конфиг, чтобы не подтягивать preview-плагин из vite.config.ts.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts', 'scripts/**/*.test.{js,ts}'],
  },
});
