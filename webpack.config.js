const path = require('path');
// const Dotenv = require('dotenv-webpack');

// WEBPACK PLUGINS
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// process.env.NODE_ENV = process.env.NODE_ENV || '\';

const isProduction = process.env.NODE_ENV === 'production';
const isStaging = process.env.NODE_ENV === 'staging';

const PRODUCTION_HOST = 'https://staging.pluto.mgr.consensu.org/';
const STAGING_HOST = 'https://staging.pluto.mgr.consensu.org/'; // TODO: where is this?

const config = {
  entry: {
    cmp: ['babel-polyfill', './client/main.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: isProduction ? PRODUCTION_HOST : '/', // TODO: fix this is awful
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.bundle.js',
  },
  resolve: {
    alias: {
      '@': path.resolve('client'),
    },
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
    },
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
      },
    },
    {
      test: /\.css$/,
      use: [{
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
      },
      ],
    },
    {
      test: /\.scss$/,
      use: [
        'vue-style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
        },
      ],
    },
    {
      test: /\.(html)$/,
      use: {
        loader: 'html-loader',
      },
    },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin('dist', {}),
    new HtmlWebpackPlugin({
      template: './build/template.index.html',
    }),
    new HtmlWebpackExcludeAssetsPlugin(),
    // new Dotenv(), TODO: maybe this can be remove dotenv-webpack
    new BundleAnalyzerPlugin({
      analyzerMode: (isProduction) ? 'disabled' : 'server',
    }),
  ],
};

console.log('resolve', config.resolve);
console.log('output', config.output.path);

module.exports = config;
