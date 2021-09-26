// shared webpack config object for dev, build, prod, demo...

const path = require('path');
const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { checkAppEnv } = require('../config/config-utils');

const isProd = process.env.NODE_ENV === 'production';
const isEnvPreact = checkAppEnv('preact');
// console.log(';;isProd-sass, ', isProd);

let reactAlias = {};
if (isEnvPreact) {
  reactAlias = {
    ...reactAlias,
    react: 'preact/compat',
    'react-dom': 'preact/compat',
    'react-dom/test-utils': 'preact/test-utils',
    'react/jsx-runtime': 'preact/jsx-runtime',
  };
}

module.exports = {
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              // when node-sass and sass were installed，by default sass-loader prefers sass.
              implementation: require('sass'),
              sassOptions: {
                // fiber: require('fibers'),
              },
            },
          },
        ],
      },
      // Fonts
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        // loader: 'file-loader',
        type: 'asset/resource',
        // generator: {
        //   filename: 'fonts/[hash].[ext]',
        // },
      },
      // Files
      {
        test: /\.(jpg|jpeg|png|gif|svg|ico)$/,
        // loader: 'file-loader',
        type: 'asset/resource',
        // generator: {
        //   filename: 'static/[hash].[ext]',
        // },
      },
      {
        test: /\.js$/,
        use: 'source-map-loader',
        enforce: 'pre',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    // new NodePolyfillPlugin({
    //   excludeAliases: ['console'],
    // }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: { ...reactAlias },
  },
  experiments: {
    topLevelAwait: true,
  },
  ignoreWarnings: [/Failed to parse source map/],
};
