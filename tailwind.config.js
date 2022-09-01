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
        'NONE': "url('https://raw.communitydragon.org/12.15/plugins/rcp-fe-lol-static-assets/global/default/images/challenges-shared/challenge-card-background-none.png')",
        'IRON': "url('https://raw.communitydragon.org/12.15/plugins/rcp-fe-lol-static-assets/global/default/images/challenges-shared/challenge-card-background-iron.png')",
        'BRONZE': "url('https://raw.communitydragon.org/12.15/plugins/rcp-fe-lol-static-assets/global/default/images/challenges-shared/challenge-card-background-bronze.png')",
        'SILVER': "url('https://raw.communitydragon.org/12.15/plugins/rcp-fe-lol-static-assets/global/default/images/challenges-shared/challenge-card-background-silver.png')",
        'GOLD': "url('https://raw.communitydragon.org/12.15/plugins/rcp-fe-lol-static-assets/global/default/images/challenges-shared/challenge-card-background-gold.png')",
        'PLATINUM': "url('https://raw.communitydragon.org/12.15/plugins/rcp-fe-lol-static-assets/global/default/images/challenges-shared/challenge-card-background-platinum.png')",
        'DIAMOND': "url('https://raw.communitydragon.org/12.15/plugins/rcp-fe-lol-static-assets/global/default/images/challenges-shared/challenge-card-background-diamond.png')",
        'MASTER': "url('https://raw.communitydragon.org/12.15/plugins/rcp-fe-lol-static-assets/global/default/images/challenges-shared/challenge-card-background-master.png')",
        'GRANDMASTER': "url('https://raw.communitydragon.org/12.15/plugins/rcp-fe-lol-static-assets/global/default/images/challenges-shared/challenge-card-background-grandmaster.png')",
      }
    },
  },
  plugins: [],
}
