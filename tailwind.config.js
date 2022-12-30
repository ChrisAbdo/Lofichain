/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#555555',
          secondary: '#f0f409',
          accent: '#dbd823',
          neutral: '#201A23',
          'base-100': '#3E3F41',
          info: '#3E58C1',
          success: '#1D8655',
          warning: '#A67408',
          error: '#FA251E',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
