exports.default = (): any => {
  describe('auth', () => {
    require('./register').default();
    require('./login').default();
  });
};

