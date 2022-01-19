import './index.css';

import React, {ReactElement} from 'react';

interface ContainerProps {
    children: React.ReactNode;
    onSubmit?: any;
  }

const Form = (props: ContainerProps): ReactElement => {
  return (
    <form className='form' onSubmit={props.onSubmit}>
      {props.children}
    </form>
  );
};

export default Form;
