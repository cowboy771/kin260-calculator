import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Two separate HTML entry points, built as one deploy: the main
      // calculator (index.html) and the nav-free bio-link landing page
      // (landing.html). Vite bundles each with its own JS, so visiting
      // landing.html never downloads the main app's code or vice versa.
      input: {
        main: resolve(__dirname, 'index.html'),
        landing: resolve(__dirname, 'landing.html'),
      },
    },
  },
});
