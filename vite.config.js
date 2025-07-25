import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    exclude: ['@base-org/account'],
    esbuildOptions: {
      target: 'es2020',
      supported: {
        'import-assertions': false
      }
    }
  },
  build: {
    target: 'es2020'
  }
})
