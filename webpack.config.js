const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const indexHtmlPluginOptions = {
  template: './src/index.ejs',
  appMountId: 'react-weather',
  pathPrefix: '/',
  inject: true,
  hash: true,
}

const config = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: ['./src/index.js'],
  output: {
    filename: 'bundle.js',
    sourceMapFilename: 'bundle.js.map',
    path: path.resolve(__dirname, 'dist'),
    publicPath: `http://localhost:8080/`,
  },
  resolve: {
    modules: [path.resolve('./src'), path.resolve('node_modules')],
    alias: {
      '@': path.resolve(__dirname, 'src/')
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
              process.env.NODE_ENV === 'development' && require.resolve('react-refresh/babel'),
            ].filter(Boolean),
          },
        },
      },
      // { test: /\.css$/, loader: ['style-loader', 'css-loader?modules'] },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(indexHtmlPluginOptions),
    // new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],
  devServer: {
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
  },
}

module.exports = config