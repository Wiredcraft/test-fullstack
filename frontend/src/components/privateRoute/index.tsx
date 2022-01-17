/* eslint-disable require-jsdoc */


import React from 'react';
import {Navigate} from 'react-router-dom';
import {isAuthenticated} from '../../utils/auth';


interface Props {
  children: React.ReactNode,
}

const index = (props: Props) => {
  return (
    <React.Fragment>
      {isAuthenticated() ? props.children : <Navigate to="/login" />}
    </React.Fragment>);
};

export default index;
