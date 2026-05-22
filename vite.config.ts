import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 'base: ./' ensures the app works if hosted at root (dmicdt.github.io) 
  // or a subdirectory (dmicdt.github.io/planner)
  base: '/', 
  build: {
    outDir: 'dist',
  }
});
