const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');


const indexHtmlPluginOptions = {
  template: './src/index.ejs',
  appMountId: 'react-weather',
  pathPrefix: '/',
  inject: false,
  hash: true,
}

const ENV = process.env.NODE_ENV || 'production'
const isDev = ENV === 'development'

const config = {
  mode: ENV,
  devtool: isDev ? 'eval-source-map' : 'source-map',
  entry: ['./src/index.js'],
  output: {
    filename: '[contenthash].[name].js',
    sourceMapFilename: '[contenthash].[name].map[query]',
    path: path.resolve('dist'),
    publicPath: '/',
  },
  resolve: {
    modules: [path.resolve('./src'), path.resolve('node_modules')],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              isDev && require.resolve('react-refresh/babel'),
            ].filter(Boolean),
          },
        },
      },
      // { test: /\.css$/, loader: ['style-loader', 'css-loader?modules'] },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(indexHtmlPluginOptions),
    // isDev && new webpack.HotModuleReplacementPlugin(),
    isDev && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}

if (isDev) {
  config.devServer = {
    host: '127.0.0.1',
    port: 8080,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    watchOptions: {
      poll: 1000,
      ignored: ['node_modules'],
    },
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
  }
}

module.exports = config
