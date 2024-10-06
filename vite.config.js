import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        projects: resolve(__dirname, 'projects.html'),
        info: resolve(__dirname, 'info.html'),
        contact: resolve(__dirname, 'contact.html')
        // Add more pages as needed
      },
    },
  },
})