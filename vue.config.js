const webpack = require('webpack')

module.exports = {
  devServer: {
    disableHostCheck: true,
  },
  publicPath: './',
  assetsDir: './assets',
  crossorigin: 'use-credentials',
  productionSourceMap: false,
  filenameHashing: false,
  css: {
    sourceMap: true,
    extract: true,
  },
  runtimeCompiler: true,
  configureWebpack: {
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    ],
  },
  chainWebpack: config => {
    config.optimization.delete('splitChunks')
  },
}
