import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  // Use relative asset paths so renderer-dist works from Electron file:// URLs.
  base: './',
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__tests__/setup.ts',

    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      reportsDirectory: './coverage',
      include: ['src/**/*.{ts,tsx}'],

      exclude: [
        '**/*.d.ts',
        'src/**/__tests__/**',
        'src/**/?(*.)+(spec|test).{ts,tsx}',
        'src/main.tsx',
        'src/vite-env.d.ts',
        'src/**/index.ts',
        // Exclude the unused component-library scaffolding that is not imported by the app.
        'src/app/components/ui/**',
        'src/app/components/figma/**',
      ],
    },
  },

  assetsInclude: ['**/*.svg', '**/*.csv'],
});
