import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom', 
    setupFiles: './src/setupTests.ts',
    coverage: {
      all: false,
      include: ['src/**'],
      exclude: [
        'src/app/mocks/**',
        'src/app/models/**',
        'src/app/services/**',
        'src/app/context/**',
        '**/*.test.ts',
        '**/*.spec.ts',
        '**/*.d.ts',
        '**/node_modules/**'
      ],
      reporter: ['text', 'json', 'html'],
    }
  },
  
})