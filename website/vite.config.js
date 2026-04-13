import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        research: resolve(__dirname, 'research.html'),
        collaboration: resolve(__dirname, 'collaboration.html'),
        team: resolve(__dirname, 'team.html'),
        publications: resolve(__dirname, 'publications.html'),
        plan: resolve(__dirname, 'plan.html'),
      }
    }
  }
});
