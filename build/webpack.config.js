const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  // source-map报错不会映射到源文件中的错 不仅是打包后的错误位置
  // development : 'cheap-module-eval-source-map'
  // production : 'cheap-module-source-map'
  devtool: 'cheap-module-eval-source-map',
  entry: {
    main: './src/index.js',
    sub: './src/index.js'
  },
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
    rules: [{
      test: /\.(jpeg|png|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          // placeholders占位符
          name: '[name].[ext]',
          outputPath: 'images/',
          limit: 10240000
        }
      }
    },{
      test: /\.vue$/,
      use: {
        loader: 'vue-loader'
      }
    },{
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
    },{
      test: /\.(eot|ttf|svg)$/,
      use: {
        loader: 'file-loader'
      }
    },
    { test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }
  ]
  },
  plugins: [ new HtmlWebpackPlugin({
    template: 'src/index.html'
  }), new CleanWebpackPlugin.CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    usedExports: true
  },
  output: {
    // publicPath: "https://cdn.example.com/assets/",
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}