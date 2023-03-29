const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#E82530',
          700: '#D8242E',
          900: '#8A0909',
        },
        secondary: '#F2DFE4',
        tertiary: '#EDE9E9',
        light: '#FFFFFF',
        dark: '#2B2A2A',
      },
    },
  },
  plugins: [],
};
