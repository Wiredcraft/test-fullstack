const ordinalize = n => {
  const suffixes = [
    ['11', 'th'],
    ['12', 'th'],
    ['13', 'th'],
    ['1', 'st'],
    ['2', 'nd'],
    ['3', 'rd'],
  ];

  const suffix = suffixes.find(s => n.toString().endsWith(s[0]));

  return `${n}${suffix ? suffix[1] : 'th'}`;
};

export default ordinalize;
