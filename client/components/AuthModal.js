import React from 'react';
import Tabs from './Tabs';
import Signup from './Signup';
import Login from './Login';

const AuthModal = props => {
  return (
    <div style={{width: '560px', margin: '0 auto'}}>
     <Tabs>
      <div label="login">
        <Login closeModal={props.closeModal} updateProfile={props.updateProfile} />
      </div>
      <div label="signup">
        <Signup closeModal={props.closeModal} updateProfile={props.updateProfile} />
      </div>
    </Tabs>
    </div>
  );
};

export default AuthModal
