import React from 'react';

import './index.css';

interface Props {
  children: React.ReactNode;
}

const index = (props: Props) => {
  return (
    <div className="container">
      {props.children}
    </div>
  );
};

export default index;
