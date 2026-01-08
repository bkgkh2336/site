import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/backend': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/backend/, '')
      }
    }
  },
  build: {
    // Оптимизация для слабых ПК
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.info', 'console.debug']
      }
    },
    rollupOptions: {
      output: {
        // Автоматическая оптимизация чанков при сборке
        manualChunks: (id) => {
          // React vendors
          if (id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom') || 
              id.includes('node_modules/react-router')) {
            return 'react-vendor';
          }
          
          // Lucide-react: tree-shaking автоматически уберет неиспользуемые иконки
          if (id.includes('node_modules/lucide-react')) {
            return 'icons';
          }
          
          // Styled components
          if (id.includes('node_modules/styled-components')) {
            return 'styled';
          }
          
          // Остальные зависимости
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    sourcemap: false
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'styled-components']
  }
})