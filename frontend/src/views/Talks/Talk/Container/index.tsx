import React, {ReactElement} from 'react';

interface ContainerProps {
    children: React.ReactNode;
  }

const TalkContainer = (props: ContainerProps): ReactElement => {
  return (
    <div style={{
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      border: '1px solid black',
      height: '100px',
    }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          flexGrow: 1,
        }}
      >
        {props.children}
      </div>
    </div>
  );
};

export default TalkContainer;
