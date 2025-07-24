/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // Revolutionary white theme with glassmorphism
        'glass': {
          'white': 'rgba(255, 255, 255, 0.25)',
          'light': 'rgba(255, 255, 255, 0.18)',
          'medium': 'rgba(255, 255, 255, 0.15)',
          'dark': 'rgba(255, 255, 255, 0.1)',
          'border': 'rgba(255, 255, 255, 0.2)',
        },
        // Neumorphism colors
        'neuro': {
          'light': '#ffffff',
          'shadow-light': 'rgba(163, 177, 198, 0.15)',
          'shadow-dark': 'rgba(163, 177, 198, 0.4)',
          'highlight': 'rgba(255, 255, 255, 0.8)',
        },
        // Gen Z/Millennial inspired gradients
        'gradient': {
          'primary': '#667eea',
          'secondary': '#764ba2',
          'accent': '#f093fb',
          'success': '#4facfe',
          'warning': '#43e97b',
          'purple': '#a855f7',
          'pink': '#ec4899',
          'blue': '#3b82f6',
          'cyan': '#06b6d4',
        },
        'brand': {
          'primary': '#1e293b',     // Dark slate for primary
          'secondary': '#475569',   // Medium slate for secondary
          'accent': '#667eea',      // Modern purple-blue gradient start
          'accent-end': '#764ba2',  // Modern purple-blue gradient end
          'success': '#4facfe',     // Modern blue for success
          'warning': '#43e97b',     // Modern green for warnings
          'light': '#ffffff',       // Pure white
          'dark': '#0f172a',        // Very dark slate
          'muted': '#64748b',       // Muted slate for text
          'border': '#e2e8f0',      // Light border color
          'background': '#ffffff',  // White background
          'surface': '#fafbfc',     // Ultra-light surface color
          'glass': 'rgba(255, 255, 255, 0.25)', // Glassmorphism base
        },
        // Instagram-inspired colors for gallery
        'insta': {
          'gradient-1': '#833ab4',
          'gradient-2': '#fd1d1d',
          'gradient-3': '#fcb045',
          'story-ring': '#c13584',
          'heart': '#ed4956',
          'blue': '#0095f6',
        },
        // Service card colors with modern twist
        'service': {
          'purple': '#a855f7',      // Modern purple
          'emerald': '#10b981',     // Emerald for brand monitoring
          'rose': '#f43f5e',        // Rose for awards & recognition
          'indigo': '#6366f1',      // Indigo for content creation
          'orange': '#f97316',      // Orange for event management
          'teal': '#14b8a6',        // Teal for digital strategy
          'cyan': '#06b6d4',        // Cyan for analytics
          'pink': '#ec4899',        // Pink for social media
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'float-slow': 'float 8s ease-in-out infinite',
        'slide': 'slide 30s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'fade-in-down': 'fadeInDown 0.8s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'gradient-shift': 'gradientShift 3s ease-in-out infinite',
        'glass-float': 'glassFloat 4s ease-in-out infinite',
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
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(102, 126, 234, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(102, 126, 234, 0.8)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        glassFloat: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-15px) rotate(1deg)' },
          '66%': { transform: 'translateY(-5px) rotate(-1deg)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '16px',
        'heavy': '24px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'neuro-light': '20px 20px 60px #d1d9e6, -20px -20px 60px #ffffff',
        'neuro-dark': 'inset 20px 20px 60px #d1d9e6, inset -20px -20px 60px #ffffff',
        'glow': '0 0 20px rgba(102, 126, 234, 0.4)',
        'glow-lg': '0 0 40px rgba(102, 126, 234, 0.6)',
        'instagram': '0 4px 12px rgba(0, 0, 0, 0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))',
        'neuro-gradient': 'linear-gradient(145deg, #ffffff, #e6e6e6)',
        'instagram-gradient': 'linear-gradient(45deg, #833ab4, #fd1d1d, #fcb045)',
        'modern-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'success-gradient': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'warning-gradient': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      },
    },
  },
  plugins: [],
}
