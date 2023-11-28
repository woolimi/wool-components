import Color from 'color';
import colors from 'tailwindcss/colors';

// Primary color based on white background
const generateDefaultColors = () => {
  const c = Color(colors.sky[400]);
  const black = Color('black');
  return {
    background: 'white',
    activeBackground: c.rgb().string(),
    text: c.isDark() ? 'white' : 'black',
    border: 'black',
    hoverBackground: c.lighten(0.4).rgb().string(),
    activeHoverBackground: c.lighten(0.1).rgb().string(),
    focusShadow: colors.sky[300],
    errorShadow: colors.rose[300],
    errorBorder: colors.rose[500],
    errorText: colors.rose[500],
    disabledText: black.lightness(50).rgb().string(),
    disabledBackground: colors.slate[100],
    disabledBorder: black.fade(0.5).rgb().string(),
  };
};

const generateCustomColors = (color: string) => {
  const c = Color(color);

  return {
    background: c.rgb().string(),
    text: c.isDark() ? 'white' : 'black',
    border: c.isDark() ? c.darken(0.4).rgb().string() : c.darken(0.8).rgb().string(),
    hoverBackground: c.isDark() ? c.lighten(0.2).rgb().string() : c.darken(0.2).rgb().string(),
    focusShadow: colors.sky[300],
    disabledBackground: c.fade(0.4).rgb().string(),
    disabledBorder: c.isDark()
      ? c.darken(0.4).fade(0.4).rgb().string()
      : c.darken(0.8).fade(0.8).rgb().string(),
    disabledText: c.isDark() ? 'white' : Color('black').fade(0.6).rgb().string(),
  };
};

export const useColors = () => {
  return {
    generateDefaultColors,
    generateCustomColors,
  };
};
