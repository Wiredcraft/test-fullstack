import React from 'react';

interface Props {
    children: React.ReactNode;
    type: 'submit' | 'button'
}

const index = (props: Props) => {
  return (
    <button style={{
      backgroundColor: '#333333',
      color: 'white',
      cursor: 'pointer',
      padding: '0.3em 1.2em',
      margin: '0 0.1em 0.1em 0',
      border: '0.16em solid #333333',
      borderRadius: '0.4em',
    }}
    type={props.type}
    >
      {props.children}
    </button>);
};

export default index;
