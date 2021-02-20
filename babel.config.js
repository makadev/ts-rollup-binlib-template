module.exports = function (api) {
  // turn off config caching
  api.cache.never();

  // check if jest is running
  //const isTest = api.env('test');

  return {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],
      '@babel/preset-typescript',
    ],
  };
};
