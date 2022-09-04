module.exports = {
  native: true,
  svgoConfig: {
    multipass: true,
    plugins: [
      'preset-default',
      'prefixIds',
      'removeOffCanvasPaths',
      'removeStyleElement',
      'removeScriptElement',
      'reusePaths',
    ],
  },
};
