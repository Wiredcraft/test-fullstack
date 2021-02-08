exports.sortTalks = function(talks) {
  return talks.sort(function(a, b) {
    if (b.rank - a.rank !== 0) {
      return b.rank - a.rank;
    } else {
      return b.created_at - a.created_at;
    }
  });
};
