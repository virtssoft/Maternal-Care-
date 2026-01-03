
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Polyfill pour process.env requis par le SDK Gemini
    'process.env': {
      API_KEY: process.env.API_KEY || ''
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  },
  server: {
    port: 3000,
  }
});
