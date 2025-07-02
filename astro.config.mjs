// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';

const base = process.env.PUBLIC_BASE_URL?.replace(/^https?:\/\/[^/]+/, '') || '/';
const site = process.env.PUBLIC_BASE_URL || 'http://localhost:4321';

console.log('🌍 BASE URL:', base);

// https://astro.build/config
export default defineConfig({
  base,
  site,

  // always add trailing slashes to URLs --> /
  trailingSlash: 'always',
  output: 'static',

  integrations: [react()],

  vite: {
    plugins: [tailwindcss(), visualizer({ open: true })],
    build: {
      target: 'esnext',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react')) return 'react';
              if (id.includes('framer-motion')) return 'motion';
              if (id.includes('@astrojs')) return 'astro';
            }
          },
        },
      },
    },
  },
});
