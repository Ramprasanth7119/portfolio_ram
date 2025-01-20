import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 2000,  // Optional: Adjust the chunk size warning threshold
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split large libraries into separate chunks
          if (id.includes('node_modules/react')) {
            return 'react'; // Vendor chunk for React
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'framer-motion'; // Vendor chunk for Framer Motion
          }
          if (id.includes('node_modules/three')) {
            return 'three'; // Vendor chunk for Three.js
          }
        },
      },
    },
  },
})
