import * as React from 'react';

const MenuButtons = () => {
  return <span>Sign In</span>;
};

export const Header = () => {
  const title = 'Lightning Talks';
  return (
    <div>
      <span>{title}</span>
      <MenuButtons />
    </div>
  );
};
