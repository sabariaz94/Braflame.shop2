// // postcss.config.js
// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// }


// postcss.config.js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}, // ✅ use this, NOT 'tailwindcss'
    autoprefixer: {},
  },
}
