import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  define: {
    // Make jQuery available globally
    global: 'globalThis',
  },
  optimizeDeps: {
    // Include jQuery and terminal in dependency pre-bundling
    include: ['jquery', 'jquery.terminal']
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        projects: resolve(__dirname, 'projects.html'),
        info: resolve(__dirname, 'info.html'),
        contact: resolve(__dirname, 'contact.html'),
        art: resolve(__dirname, 'art.html')
      },
      output: {
        globals: {
          jquery: '$'
        }
      }
    },
  },
})