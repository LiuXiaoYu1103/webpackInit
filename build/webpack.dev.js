const webpack = require('webpack')

const devConfig = {
  mode: 'development',
  // source-map报错不会映射到源文件中的错 不仅是打包后的错误位置
  // development : 'cheap-module-eval-source-map'
  // production : 'cheap-module-source-map'
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
    open: true,
    port: 9099,
    hot: true,
    hotOnly: true
    // proxy: {
    //   "/api": "http://localhost:3000"
    // }
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        // 从下到上 从左到右
        use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2
          }
        },
        'sass-loader',
        'postcss-loader'
      ]
      }
    ]
  },
  plugins: [ 
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
  }
}

module.exports = devConfig;