const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const merge = require('webpack-merge')
const devConfig = require('./webpack.dev.js')
const prodConfig = require('./webpack.prod.js')

const commonConfig = {
  entry: {
    main: './src/index.js'
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
      test: /\.(eot|ttf|svg)$/,
      use: {
        loader: 'file-loader'
      }
    },
    { test: /\.js$/,
      exclude: /node_modules/,
      use: "babel-loader"
    }
  ]
  },
  plugins: [ new HtmlWebpackPlugin({
    template: 'src/index.html'
  }),
  new CleanWebpackPlugin.CleanWebpackPlugin()
  ],
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: 'all'
    }
  },
  output: {
    path: path.resolve(__dirname, '../dist')
  }
}
module.exports = (env) => {
  if (env && env.production) {
    return merge(commonConfig, prodConfig)
  } else {
    return merge(commonConfig, devConfig)
  }
}