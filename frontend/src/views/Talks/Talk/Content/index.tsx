import React, {ReactElement} from 'react';
import {ITalkObject} from 'src/interfaces/ITalk';

interface ContainerProps {
    children?: React.ReactNode;
    talk: ITalkObject;
}

const TalkContent = (props: ContainerProps): ReactElement => {
  return (
    <div style={{
      flex: '1 0 auto',
      margin: '10px',
      alignContent: 'center',
      alignItems: 'center',
      textAlign: 'left',
      flexBasis: '40%',
    }}>
          Name: {props.talk.name}
      <br/>
          Description: {props.talk.description}
      <br/>
          Author: {props.talk.user}
      <br/>
          Submission time: {new Date(props.talk.createdAt).toUTCString()}
    </div>
  );
};

export default TalkContent;
