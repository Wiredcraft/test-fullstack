import * as React from 'react';

const SortButton = ({ name, label, value }) => {
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
      <SortButton name="ctime" label="Time Added" value={-1} />
      <SortButton name="votes" label="Votes" value={null} />
    </div>
  );
};
