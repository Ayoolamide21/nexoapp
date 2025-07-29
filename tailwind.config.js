export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
  animation: {
    bubbleGradient: 'bubbleGradient 20s ease-in-out infinite',
  },
  keyframes: {
    bubbleGradient: {
      '0%, 100%': { transform: 'translate(0, 0)' },
      '50%': { transform: 'translate(40px, -20px)' },
    },
  },
},
  },
  plugins: [],
}
