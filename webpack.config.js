const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const StaticFilesWebpackPlugin = require('static-files-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    "index.js": ['@babel/polyfill', path.resolve(__dirname, "src")]
  },
  output: {
    path: path.resolve(__dirname, "build/static"),
    filename: "[name]",
    publicPath: './',
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    compress: true,
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html")
    })
  ],
  resolve: {
    extensions: [".js", ".json", ".mjs"],
    alias: {
      components: path.resolve(__dirname, "src/components"),
      api: path.resolve(__dirname, "src/api"),
      static: path.resolve(__dirname, "src/static"),
    }
  },
  module: {
    rules: [
      {
        test:  /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          }
        ]
      },
      {
        test:  /\.(ttf|png|jpg)$/,
        loader: 'url-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      }
    ]
  }
};
