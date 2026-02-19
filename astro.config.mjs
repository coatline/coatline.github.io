// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

export default defineConfig({
  site: 'https://coatline.github.io',
  base: '/',
  integrations: [svelte()],
  outDir: 'dist',
});