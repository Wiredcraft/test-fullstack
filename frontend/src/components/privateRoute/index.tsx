import React from 'react';
import {Navigate} from 'react-router-dom';
import {checkCookie} from '../../utils/cookies';

interface Props {
  children: React.ReactNode,
}

const index = (props: Props) => {
  return (
    <React.Fragment>
      {checkCookie() ? props.children : <Navigate to="/login" />}
    </React.Fragment>);
};

export default index;
