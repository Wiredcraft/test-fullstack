export default (): any => {
  describe('register', () => {
    require('./valid').default();
    require('./error').default();
    require('./missing').default();
  });
};

