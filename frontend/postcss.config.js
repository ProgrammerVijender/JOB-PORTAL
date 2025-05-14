export default {
  plugins: {
    'postcss-nesting': {}, // ✅ Must come first
    tailwindcss: {},
    autoprefixer: {},
  },
};

// module.exports = {
//   plugins: {
//     'postcss-nesting': {},       // 👈 Add this line first
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// }