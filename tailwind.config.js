/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html',
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    container:{
      center: true,
      padding : '16px',
    },
    extend: {
      fontFamily:{
        opsional: 'Rajdhani, sans-serif',
        primeriy:'Kanit, sans-serif',
        secocon:'Pacifico, cursive',
        inter:'Inter, sans-serif',
        dasik:'Permanent Marker, cursive'
      },
      colors:{
        heropik:'rgba(0,0,0,0.76)',
        primeriy:'#191919',
        coffe:'#99582a',
      },
      screens : {
        '2xl': '1320px',
       },
       backgroundImage:{
        home:'url(img/2.png)',
       }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}

