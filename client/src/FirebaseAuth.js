import React, { useState, useEffect } from 'react';
import UserContext from './UserContext';

import firebase from 'firebase';
import firebaseui from 'firebaseui';

const config = {
  apiKey: 'AIzaSyCpquT9jfeyqrXlQ4s-zIZKtymnxwlBF9A',
  authDomain: 'talk-lightning.firebaseapp.com',
  databaseURL: 'https://talk-lightning.firebaseio.com',
  projectId: 'talk-lightning',
  storageBucket: 'talk-lightning.appspot.com',
  messagingSenderId: '12336253804'
};

firebase.initializeApp(config);

const uiConfig = {
  callbacks: {
    signInSuccess: () => {}
  },
  signInOptions: [
    firebase.auth.GithubAuthProvider.PROVIDER_ID
  ],
  signInFlow: 'popup'
};

const ui = new firebaseui.auth.AuthUI(firebase.auth());

const initialUser = window.localStorage.user
  ? JSON.parse(window.localStorage.user)
  : null;

const FirebaseAuth = ({ children }) => {

  const [ user, setUser ] = useState(initialUser);

  const signInSuccess = (user, credential, _redirectUrl) => {
    const { email } = user;
    const { accessToken } = credential;

    const u = { email, accessToken };

    window.localStorage.user = JSON.stringify(u);

    setUser(u);

    return false;
  };

  uiConfig.callbacks.signInSuccess = signInSuccess;

  useEffect(() => {
    if (!user) ui.start('#firebaseui-auth-container', uiConfig);
  }, [user]);

  return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
  );

};

export default FirebaseAuth;
