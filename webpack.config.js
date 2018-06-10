const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');


const isProduction = process.env.NODE_ENV === 'production'
const PRODUCTION_HOST = 'https://pluto.mgr.consensu.org/'
const config = {
  entry: {
    cmp: './client/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath : isProduction ? PRODUCTION_HOST : '/',
    filename: '[name].bundle.js'
  },
  resolve : {
    alias : { '@': path.resolve('client')}
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
          }]
      },
      {
        test: /\.scss$/,
        use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'sass-loader'
            }
          ]
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin('dist', {} ),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new HtmlWebpackExcludeAssetsPlugin(),
    new Dotenv()
  ]
};

module.exports = config;
