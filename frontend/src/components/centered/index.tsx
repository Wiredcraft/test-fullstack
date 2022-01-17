import React from 'react';

import './index.css';

interface Props {
    children: React.ReactNode;
}

const index = (
    props: Props,
) => {
  return (
    <div className="flex-center">
      <div className="flex-center-row">
        {props.children}
      </div>
    </div>
  );
};

export default index;
