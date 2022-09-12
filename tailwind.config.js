module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    colors: {
      mainColor: '#9904D9',
      textColor: '#111827',
      white: '#FFFFFF',
      cardBackground: '#fafafa',
      hyperlink: '#6ea5ff',
      green: '#03ff57',
    },
    extend: {},
  },
  plugins: [],
};
