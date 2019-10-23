module.exports = {
  devServer: {
    disableHostCheck: true,
  },
  publicPath: process.env.NODE_ENV === 'production' ? '.' : '/',
  productionSourceMap: true,
  crossorigin: 'anonymous',
  css: {
    sourceMap: true,
  },
}
