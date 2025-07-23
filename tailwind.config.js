/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Clean white theme colors
        'light-blue': '#f8fafc',
        'light-purple': '#f9fafb',
        'light-green': '#f8fafc',
        'light-pink': '#f9fafb',
        'light-yellow': '#fafafa',
        'accent-blue': '#f1f5f9',
        'accent-purple': '#f8fafc',
        'accent-green': '#f1f5f9',
        'accent-pink': '#f8fafc',
        'accent-yellow': '#f9fafb',
        'brand': {
          'primary': '#1e293b',     // Dark slate for primary
          'secondary': '#475569',   // Medium slate for secondary
          'accent': '#0ea5e9',      // Sky blue for accents
          'success': '#059669',     // Emerald green for success
          'warning': '#d97706',     // Amber for warnings
          'light': '#ffffff',       // Pure white
          'dark': '#0f172a',        // Very dark slate
          'muted': '#64748b',       // Muted slate for text
          'border': '#e2e8f0',      // Light border color
          'background': '#ffffff',  // White background
          'surface': '#f8fafc',     // Light surface color
        },
        // Service card colors
        'service': {
          'purple': '#8b5cf6',      // Purple for influencer partnerships
          'emerald': '#10b981',     // Emerald for brand monitoring
          'rose': '#f43f5e',        // Rose for awards & recognition
          'indigo': '#6366f1',      // Indigo for content creation
          'orange': '#f97316',      // Orange for event management
          'teal': '#14b8a6',        // Teal for digital strategy
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
