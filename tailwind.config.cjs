/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // zinc: {
        //   '50': '#fafafa'
        //   '100': '#f4f4f5'
        //   '200': '#e4e4e7'
        //   '300': '#d4d4d8'
        //   '400': '#a1a1aa'
        //   '500': '#71717a'
        //   '600': '#52525b'
        //   '700': '#3f3f46'
        //   '800': '#27272a'
        //   '900': '#18181b'
        // }
        gray: {
          '50': '#fafafa',
          '100': '#f4f4f5',
          '200': '#e4e4e7',
          '300': '#d4d4d8',
          '400': '#a1a1aa',
          '500': '#71717a',
          '600': '#52525b',
          '700': '#3f3f46',
          '800': '#27272a',
          '900': '#18181b',
        },
      },
      fontFamily: {
        brand: ["Plus Jakarta Sans", "Inter", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      }
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
    data: {
      disabled: 'ui~="disabled"',
    },
  },
  plugins: [],
};
