const { checkAppEnv } = require('./config/config-utils');

module.exports = function (api) {
  // 若build依赖于env，就不要再指定api.cache为forever或never了
  // api.cache(true);

  const env = api.env();
  // const isProd = api.env('production');

  // 用在react应用开发调试阶段，会启用@babel/preset-react、react-refresh/babel
  const isEnvReactHotReload = checkAppEnv('reacthot');
  const isEnvPreactHotReload = checkAppEnv('preacthot');
  // 用在react项目打包阶段，会启用@babel/preset-react，而不会启用react-refresh/babel
  const isEnvReact = checkAppEnv('react') || checkAppEnv('preact');
  console.log(';;process.env.REACT_APP_ENV, ', process.env.REACT_APP_ENV);
  console.log(';;isEnvReact/Preact, ', isEnvReact);

  // Plugins run before Presets. Plugin ordering is first to last.
  const plugins = [
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    '@babel/proposal-object-rest-spread',
    isEnvReactHotReload && 'react-refresh/babel',
    isEnvPreactHotReload && '@prefresh/babel-plugin',
  ].filter(Boolean);

  function configModule() {
    if (env === 'esm' || env === 'es6') {
      return false;
    }
    // 默认会编译成node自身的commonjs
    return 'auto';
  }

  // Preset ordering is reversed (last to first).
  const presets = [
    [
      '@babel/preset-env',
      {
        // modules: env === 'esm' ? false : 'auto',
        modules: configModule(),
        targets: 'defaults',
        // targets: '> 0.25%, not dead',
        useBuiltIns: 'usage',
        corejs: { version: 3, proposals: true },
        debug: false,
      },
    ],
    [
      '@babel/preset-typescript',
      {
        // later: 支持其他框架的jsx
        isTSX: !!isEnvReact,
        allExtensions: true,
        onlyRemoveTypeImports: true,
        allowNamespaces: true,
        allowDeclareFields: true,
      },
    ],
    isEnvReact && [
      '@babel/preset-react',
      {
        // runtime: 'automatic',
        development: env !== 'production',
      },
    ],
  ].filter(Boolean);

  // console.log('babel-presets, ', JSON.stringify(presets));

  const ignore = ['node_modules'];

  return {
    plugins,
    presets,
    ignore,
  };
};
