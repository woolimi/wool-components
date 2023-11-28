/// <reference types="histoire" />

import vue from '@vitejs/plugin-vue';
import path from 'path';
import typescript2 from 'rollup-plugin-typescript2';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
  plugins: process.env.HISTOIRE
    ? [vue(), svgLoader()]
    : [
        vue(),
        dts({
          insertTypesEntry: true,
        }),
        typescript2({
          check: false,
          include: ['components/**/*.vue'],
          tsconfigOverride: {
            compilerOptions: {
              outDir: 'dist',
              sourceMap: true,
              declaration: true,
              declarationMap: true,
            },
          },
        }),
        svgLoader(),
      ],
  base: process.env.HISTOIRE ? '/wool-components/' : undefined,
  build: process.env.HISTOIRE
    ? {}
    : {
        emptyOutDir: false,
        cssCodeSplit: true,
        lib: {
          entry: path.resolve(__dirname, './index.ts'),
          name: 'wool-components',
          formats: ['es'],
          fileName: (format, entryName) => {
            if (entryName === 'flags') return entryName;
            return `index.${format}.js`;
          },
        },
        rollupOptions: {
          treeshake: true,
          input: {
            main: path.resolve(__dirname, 'index.ts'),
            flags: path.resolve(__dirname, './assets/flags.scss'),
          },
          external: ['vue'],
          output: {
            exports: 'named',
            globals: {
              vue: 'Vue',
            },
          },
        },
      },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
