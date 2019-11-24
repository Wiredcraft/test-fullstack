export const extractAccessToken = () => {
  if (window.location.search.indexOf('accessToken=') >= 0) {
    const accessToken = window.location.search
      .match(/accessToken=[^&]*/)[0]
      .replace('accessToken=', '');
    return accessToken;
  }
};
