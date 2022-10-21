import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    chunkSizeWarningLimit: 5000,
  },
  optimizeDeps: { include: ['pdfmake/build/pdfmake', 'pdfmake/build/vfs_fonts'] },
});
