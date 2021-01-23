module.exports = (ctx) => ({
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    cssnano:
      ctx.env === 'production'
        ? {
            preset: ['default', { discardComments: { removeAll: true } }],
          }
        : false,
  },
})
