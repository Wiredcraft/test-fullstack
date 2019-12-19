export default (state = {}, { type, payload }) => {
  switch (type) {
    case 'talks/save':
      return payload;
    default:
      return state;
  }
};
