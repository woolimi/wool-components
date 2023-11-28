import { HstVue } from '@histoire/plugin-vue';
import { defineConfig } from 'histoire';

export default defineConfig({
  plugins: [HstVue()],
  setupFile: './histoire.setup.ts',
  storyMatch: ['components/**/*.story.vue'],
  outDir: 'github-pages',
  routerMode: 'hash',
  theme: {
    title: 'Wool Components',
    logo: {
      square: './assets/sheep.png',
      light: './assets/sheep.png',
      dark: './assets/sheep.png',
    },
    logoHref: '/wool-components/#/',
    favicon: './public/favicon.ico',
  },
  tree: {
    groups: [
      {
        id: 'top',
        title: '', // No toggle
      },
      {
        title: 'Form Components',
        id: 'Form',
      },
      {
        title: 'UI Components',
        id: 'UI',
      },
    ],
  },
});
