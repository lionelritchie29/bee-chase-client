/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './widgets/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    darkTheme: 'night',
    themes: [
      {
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=winter]'],
          primary: '#00a9e2',
        },
      },
    ],
  },
};
