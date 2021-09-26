// default webpack config for dev, build & test

const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const PreactRefreshPlugin = require('@prefresh/webpack');
const { checkAppEnv } = require('../config/config-utils');
const commonConfig = require('./webpack.common');

// 用在react项目打包阶段，会启用@babel/preset-react，而不会启用react-refresh/babel
const isEnvReactHotReload = checkAppEnv('reacthot');
const isEnvPreactHotReload = checkAppEnv('preacthot');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  // 解决热加载的问题 https://github.com/webpack/webpack-dev-server/issues/2758
  // target: process.env.NODE_ENV === 'production' ? 'browserslist' : 'web',
  target: 'web',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    isEnvReactHotReload && new ReactRefreshWebpackPlugin(),
    isEnvPreactHotReload && new PreactRefreshPlugin(),
  ].filter(Boolean),
});
