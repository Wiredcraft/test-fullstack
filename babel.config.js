module.exports = (api) => {
  // This caches the Babel config
  api.cache.using(() => process.env.NODE_ENV);
  let pluginsList=[];
  if(api.env('development')){
    pluginsList.push('react-refresh/babel')
  }
  return {
    presets: [
      '@babel/preset-env',
      // Enable development transform of React with new automatic runtime
      ['@babel/preset-react', { development: !api.env('production'), runtime: 'automatic' }],
    ],
    plugins: [
      "@babel/plugin-transform-runtime",
      ...pluginsList
    ],
  };
};
