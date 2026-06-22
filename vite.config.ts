/// <reference types="node" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

function getContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase()
  const types: Record<string, string> = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.pdf': 'application/pdf',
    '.webp': 'image/webp',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.woff2': 'font/woff2',
    '.woff': 'font/woff',
    '.ttf': 'font/ttf',
  }
  return types[ext] || 'application/octet-stream'
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'preview-public-static',
      configurePreviewServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = (req as { url?: string }).url || ''
          // Пропускаем корень, assets и index (vite сам их раздаст из dist/)
          if (url === '/' || url.startsWith('/assets/') || url === '/index.html') {
            return next()
          }

          const filePath = path.resolve('dist/public', url.slice(1))
          const publicRoot = path.resolve('dist/public')

          // Безопасность: не выходим за пределы dist/public/
          if (!filePath.startsWith(publicRoot)) {
            return next()
          }

          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            res.setHeader('Content-Type', getContentType(filePath))
            fs.createReadStream(filePath).pipe(res)
            return
          }

          next()
        })
      }
    }
  ],
  server: {
    proxy: {
      '/backend': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/backend/, ''),
        configure: (proxy) => {
          // Перенаправляем куки
          proxy.on('proxyRes', function (proxyRes, _req, res) {
            if (proxyRes.headers['set-cookie']) {
              res.setHeader('set-cookie', proxyRes.headers['set-cookie']);
            }
          });
        }
      }
    }
  },
  build: {
    // Оптимизация для слабых ПК
    target: 'es2020',
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
          // React vendors (строгое совпадение, чтобы не захватить react-world-flags и пр.)
          if (id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/') || 
              id.includes('node_modules/react-router/')) {
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
    sourcemap: false,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'styled-components']
  }
})