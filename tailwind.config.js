/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:
      {
        beaufort: "'BeaufortW01-Bold', serif",
      },
      colors:{
        'lol-cyan-100':'#A6F5D8',
        'lol-cyan-200':'#3A7875',
        'lol-cyan-300':'#14555B',
        'lol-gold-100':'#F4DE93',
        'lol-gold-200':'#AE914B',
        'lol-gold-300':'#564624',
        'lol-gold-400':'#3E3023',
        'lol-teal':'#3ef5f4',
        'lol-gold':'#fffabd',
        'lol-health':'#19df5c',
        'lol-mana':'#2063de',
        'lol-experience':'#9c25ea',
        'lol-blue':'#0096ff',
        'lol-red':'#c91d1d',
      },
      backgroundImage:{
        'lol-magic': "url('https://raw.communitydragon.org/12.15/plugins/rcp-fe-lol-static-assets/global/default/images/uikit/backdrop-magic/backdrop-magic.png')"
      }
    },
  },
  plugins: [],
}
