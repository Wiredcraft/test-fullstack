const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  plugins: {
    autoprefixer: {},
    ...(isDevelopment ? {} : { cssnano: {} }),
  },
};
