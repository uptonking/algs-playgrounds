const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devServerConfig = require('./webpack.prod');

module.exports = merge(devServerConfig, {
  entry: path.resolve(__dirname, '../src/render.tsx'),
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      // template: path.resolve(process.cwd(), 'demo.html'),
      template: './public/index.html',
      // filename: 'index.html',
    }),
  ],
  // devServer: {
  //   contentBase: path.resolve(__dirname, '../dist'),
  // },
});
