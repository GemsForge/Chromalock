export const colorThemes = {
  pastel: {
    blush: '#F6C6C6',
    butter: '#F5E6A8',
    sky: '#C7DDF5',
    mint: '#C6E8D5',
    lilac: '#DCCCF2',
  },
  primary: {
    red: '#D95D63',
    yellow: '#E6B85C',
    blue: '#5D8FD9',
  },
  blueish: {
    mist: '#DCEBFA',
    cloud: '#B8D4F0',
    dusk: '#7898C7',
    deep: '#3F5F92',
  },
  grayscale: {
    100: '#F8FAFC',
    500: '#64748B',
    900: '#1E293B',
  },
} as const;

export type ThemeName = keyof typeof colorThemes;
export type ColorTheme = (typeof colorThemes)[ThemeName];

export const accessibilityCue = {
  border: 'Use a border or outline in addition to color.',
  icon: 'Use a symbol or icon in addition to color.',
  text: 'Use a text label in addition to color.',
} as const;
