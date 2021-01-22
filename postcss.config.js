const plugins = {
  tailwindcss: {},
  autoprefixer: {},
}

if (process.env.NODE_ENV === 'production') {
  // minify
  plugins.cssnano = {
    preset: 'default',
  }
}

module.exports = {
  plugins,
}
