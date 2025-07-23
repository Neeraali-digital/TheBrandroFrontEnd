/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'light-blue': '#f0f8ff',
        'light-purple': '#f8f4ff',
        'light-green': '#f0fff4',
        'light-pink': '#fff0f8',
        'light-yellow': '#fffef0',
        'accent-blue': '#e3f2fd',
        'accent-purple': '#f3e5f5',
        'accent-green': '#e8f5e8',
        'accent-pink': '#fce4ec',
        'accent-yellow': '#fff9c4',
        'brand': {
          'primary': '#2563eb',
          'secondary': '#7c3aed',
          'accent': '#06b6d4',
          'success': '#10b981',
          'warning': '#f59e0b',
          'light': '#f8fafc',
          'dark': '#1e293b',
          'brand': {
          'primary': '#2563eb',
      },
          'secondary': '#7c3aed',
          'accent': '#06b6d4',
          'success': '#10b981',
          'warning': '#f59e0b',
          'light': '#f8fafc',
          'dark': '#1e293b',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'slide': 'slide 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slide: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
