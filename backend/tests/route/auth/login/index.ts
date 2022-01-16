export default (): any => {
  describe('login', () => {
    require('./valid').default();
    require('./error').default();
    require('./missing').default();
  });
};

