module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0A1F16',
        foreground: '#F3F6F1',
        primary: '#A8E063',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'system-ui'],
        mono: ['monospace'],
      },
    },
  },
  plugins: [],
};
