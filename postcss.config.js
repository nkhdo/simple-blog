module.exports = (ctx) => ({
  plugins: {
    'postcss-import': {},
    'autoprefixer': {},
    'cssnano':
      ctx.env === 'production'
        ? {
            preset: ['default', { discardComments: { removeAll: true } }],
          }
        : false,
  },
})
