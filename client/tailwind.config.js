import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        primary: {
          50: '#f5f8ff',
          100: '#e6eeff',
          500: '#0ea5e9',
          700: '#0369a1'
        }
      }
    }
  },
  plugins: []
};
