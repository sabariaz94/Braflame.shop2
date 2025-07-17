// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     './src/**/*.{js,ts,jsx,tsx,mdx}',
//     './sanity/**/*.{js,ts,jsx,tsx}', // if you use Tailwind inside Sanity Studio too
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", 
    "./pages/**/*.{js,ts,jsx,tsx}", 
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './sanity/**/*.{js,ts,jsx,tsx}',
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
