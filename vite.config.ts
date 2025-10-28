import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['recharts', 'html2canvas', 'jspdf']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  css: {
    postcss: {
      // The postcss plugins are now managed by Tailwind CSS itself
      // when you provide a config file path.
      // Vite will automatically pick up tailwindcss and autoprefixer.
    },
  },
  define: {
    global: 'globalThis',
  },
})