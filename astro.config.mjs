// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vue from '@astrojs/vue';
import db from '@astrojs/db';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), vue(), db(),]
});