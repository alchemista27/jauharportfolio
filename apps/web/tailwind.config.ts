import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#2F2342',
        secondary: '#0C3C78',
        tertiary: '#B42B3F',
        neutral: '#F7F7F8',
        surface: '#FFFFFF',
        border: '#E5E4E7'
      },
      fontFamily: {
        heading: ['Roboto', 'sans-serif'],
        body: ['Poppins', 'sans-serif']
      }
    }
  },
  plugins: []
} satisfies Config;
