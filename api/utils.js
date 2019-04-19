const sumVotes = votes => {
  if (votes) {
    return votes.reduce((acc, cur) => {
      return acc + cur.val;
    }, 0);
  } else {
    return 0;
  }
};

module.exports = {
  sumVotes
};
