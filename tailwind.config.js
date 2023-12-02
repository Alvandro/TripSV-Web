/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  plugins: [
    // eslint-disable-next-line no-undef
    require('flowbite/plugin')
  ],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'trip-travel': "url('/img/travel.jpg')",
        'trip-pixel': "url('https://i.pinimg.com/736x/34/13/aa/3413aa69edede72aaf054ca2b7b75821.jpg')",
        'trip-pixel-2': "url('https://wallpapers.com/images/hd/pixel-art-background-l1i52qkhtdsdzmzh.jpg')",
        'trip-pixel-3': "url('https://t3.ftcdn.net/jpg/05/62/56/46/360_F_562564643_OSsBfTgR7mLjKtY5TCHrwGA2auYkou2T.jpg')",
        'playa': "url('/img/playabg.jpg')"
      },
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.75)',
        '4xl': [
          '0 35px 35px rgba(0, 0, 0, 1)',
          '0 45px 65px rgba(0, 0, 0, 1)'
        ],
        'black': '4px 4px 4px 4px rgba(0,0,0,1)'
      },
      screens: {
        'xs': '540px',
        'sm': '768px',
        // => @media (min-width: 640px) { ... }

        'md': '970px',
        // => @media (min-width: 768px) { ... }

        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }

        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      }
    },
  },

}