/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import React, {ReactElement} from 'react';

interface VoteButtonProps {
    id: string;
    children: React.ReactNode;
    onClick: Function;
    vote: number;
  }

const VoteButton = (props: VoteButtonProps): ReactElement => {
  return (
    <div style={{
      cursor: 'pointer',
    }} onClick={() => props.onClick(props.id, props.vote)}>
      {props.children}
    </div>
  );
};

export default VoteButton;
