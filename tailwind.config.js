module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Georgia', 'serif'],
        'mono': ['Fira Code', 'monospace'],
      },
      colors: {
        'nexus': {
          'primary': {
            900: '#0f172a',
            800: '#1e293b',
            700: '#334155',
          },
          'surface': {
            900: '#0f172a',
            800: '#1e293b',
            700: '#334155',
          },
          'accent': {
            'cyan': '#06b6d4',
            'cyan-dark': '#0891b2',
            'brown': '#a16207',
            'brown-dark': '#92400e',
            'gold': '#fbbf24',
            'gold-dark': '#f59e0b',
          },
          'text': {
            'primary': '#f1f5f9',
            'secondary': '#cbd5e1',
            'muted': '#94a3b8',
          },
          'border': {
            'medium': '#334155',
            'subtle': '#475569',
          },
        },
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.1)',
        'medium': '0 4px 25px rgba(0, 0, 0, 0.15)',
        'strong': '0 8px 40px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
};
