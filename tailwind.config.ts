import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // 和風カラーパレット
        japanese: {
          red: '#d32f2f',
          gold: '#ffb300',
          crimson: '#dc143c',
          amber: '#ffc107',
          black: '#1a1a1a',
          ivory: '#fffff0'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'serif': ['Georgia', 'Times New Roman', 'serif'],
        'japanese': ['Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Noto Sans Japanese', 'serif']
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(255, 179, 0, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 179, 0, 0.8)' }
        }
      }
    },
  },
  plugins: [],
} satisfies Config; 