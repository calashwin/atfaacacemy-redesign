import { defineConfig } from 'vite';
export default defineConfig({
  root: '.',
  server: { port: 5173, open: '/' },
  preview: { port: 4173, open: '/' },
  base: './',
});
