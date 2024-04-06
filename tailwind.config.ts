import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },

      colors:{
        'bg-primary': 'rgba(255, 255, 255, 1)',
        'text-secondary' : 'rgba(51, 51, 51, 1)',
        'banner-col': 'rgba(244, 244, 244, 1)',
        'card-border': 'rgba(193, 193, 193, 1)'
      }
    },
  },
  plugins: [],
} satisfies Config;
