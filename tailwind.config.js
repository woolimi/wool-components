/** @type {import('tailwindcss').Config} */
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette';

import { useColors } from './composables/useColors';

const { generateDefaultColors } = useColors();
const palette = generateDefaultColors();

export default {
  content: ['./components/**/*.{ts,vue}', './*.md'],
  theme: {
    screens: {
      '-lg': { max: '1280px' },
      '-md': { max: '960px' },
      '-sm': { max: '720px' },
      '-xs': { max: '540px' },
      '-xxs': { max: '320px' },
      lg: { min: '1281px' },
      md: { min: '961px' },
      sm: { min: '721px' },
      xs: { min: '541px' },
      xxs: { min: '321px' },
      'except-touch': { raw: '(hover: hover) and (pointer: fine)' }, // block hovering effect on touch device
    },
  },
  plugins: [
    ({ addUtilities, matchUtilities, theme }) => {
      // Add custom typo classes
      addUtilities({
        '.wc-base': {
          fontSize: '16px',
        },
        '.wc-bg': {
          backgroundColor: palette.background,
        },
        '.wc-active-bg': {
          backgroundColor: palette.activeBackground,
        },
        '.wc-active-hover-bg': {
          backgroundColor: palette.activeHoverBackground,
        },
        '.wc-active-text': {
          color: palette.activeBackground,
        },
        '.wc-text': {
          color: palette.text,
        },
        '.wc-border': {
          border: `2px solid ${palette.border} `,
        },
        '.wc-rounded': {
          borderRadius: '12px',
        },
        '.wc-focus': {
          outline: 'none',
          boxShadow: `0 0 0 4px ${palette.focusShadow}`,
          border: `2px solid ${palette.border}`,
        },
        '.wc-error-border': {
          outline: 'none',
          border: `2px solid ${palette.errorBorder} !important`,
          boxShadow: `0 0 0 4px ${palette.errorShadow} !important`,
        },
        '.wc-error-text': {
          color: palette.errorText,
        },
        '.wc-hover-bg': {
          backgroundColor: palette.hoverBackground,
        },
        '.wc-disabled-text': {
          color: palette.disabledText,
        },
        '.wc-disabled-bg': {
          backgroundColor: palette.disabledBackground,
        },
        '.wc-disabled-path': {
          path: {
            fill: palette.disabledBackground,
            stroke: palette.disabledBorder,
          },
        },
        '.wc-disabled-border': {
          border: `${palette.disabledBorder} 2px solid`,
        },
        '.wc-shadow': {
          'box-shadow': '0px 0px 3px rgba(0, 0, 0, 0.25)',
        },
      });

      matchUtilities(
        {
          path: (value) => ({
            path: {
              fill: value,
            },
          }),
        },
        {
          values: flattenColorPalette(theme('colors')),
          type: 'color',
        },
      );
    },
  ],
};
