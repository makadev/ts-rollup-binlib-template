module.exports = function (api) {
  // turn off config caching
  api.cache.never();

  // check if jest is running
  //const isTest = api.env('test');

  return {
    presets: ['@babel/preset-env', '@babel/preset-typescript'],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/proposal-object-rest-spread',
    ],
  };
};
