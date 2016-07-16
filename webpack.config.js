'use strict'
const webpack           = require('webpack');
const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const BUILD_DIR         = path.resolve(__dirname, 'dist');
const APP_DIR           = path.resolve(__dirname, 'src/client/app');


module.exports = {
  entry: `${APP_DIR}/main.jsx`,
  output: {
    path: BUILD_DIR,
    filename: '/js/[name].js',
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('/js/common.js'),
    new HtmlWebpackPlugin({
      title: 'Tasks',
      xhtml: true,
      inject: false,
      template: require('html-webpack-template'),
      appMountId: 'container'
    }),
    new ExtractTextPlugin('/css/[name].css', {
      allChunks: true
    })
  ],

  module : {
    include: path.join(__dirname, 'src'),
    loaders: [
      { test: /\.css$/,  loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
      { test: /\.(png|gif|jpg)$/,  loader: 'file-loader?name=/images/[name].[ext]' },
      { test: /\.jsx?$/, loader: 'babel'       },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=100&mimetype=application/font-woff&name=/fonts/[name].[ext]'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=100&mimetype=application/octet-stream&name=/fonts/[name].[ext]'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?name=/fonts/[name].[ext]'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=100&mimetype=image/svg+xml&name=/fonts/[name].[ext]'
      }
    ]
  }
};

