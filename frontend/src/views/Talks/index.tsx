import React from 'react';
import {getCookie} from '../../utils/cookies';

const index = () => {
  return (
    <div>
            Welcome, {getCookie('username')} !
    </div>
  );
};

export default index;
