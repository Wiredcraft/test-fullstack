import * as React from 'react';

const SortButton = ({ key, name, value }) => {
  console.log('sort button', key, name, value);
  return (
    <a href="#">
      <span>{name}</span>
      {value === 1 ? <span>^</span> : value === null ? null : <span>v</span>}
    </a>
  );
};

export const FilterBar = () => {
  return (
    <div>
      <SortButton key="createdAt" name="Time Added" value={-1} />
      <SortButton key="votes" name="Votes" value={null} />
    </div>
  );
};
