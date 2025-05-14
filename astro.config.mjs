// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  base: import.meta.env.PUBLIC_BASE_URL?.replace(/^https?:\/\/[^/]+/, '') || '/',
  site: import.meta.env.PUBLIC_BASE_URL || 'http://localhost:4321',
  trailingSlash: 'always', // always add trailing slashes to URLs --> /
  integrations: [react()],
});
