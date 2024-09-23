import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: '#FFF7EF',
  			primary: '#FFB6C1',
  			accentBlue: '#B0E0E6',
  			accentOrange: '#FFA07A',
  			textPrimary: '#FF6F61'
  		},
  		fontFamily: {
  			sans: ['Poppins', 'Comic Sans', 'sans-serif'],
			geistvf: ['var(--font-geist-sans)'],
			Chelsea:['var(--font-chelsea)']
  		},
  		borderRadius: {
  			large: '30px',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {
  			btn: '0px 4px 10px rgba(0, 0, 0, 0.1)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
