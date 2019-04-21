import React, { useState, useEffect } from 'react';
import UserContext from './UserContext';

import firebase from 'firebase/app';
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
    signInSuccessWithAuthResult: () => {} // reassigned on component mount
    // with access to component state
  },
  signInOptions: [
    firebase.auth.GithubAuthProvider.PROVIDER_ID
  ],
  signInFlow: 'popup'
};

const ui = new firebaseui.auth.AuthUI(firebase.auth());

const initialUser = window.localStorage.user || null;

const FirebaseAuth = ({ children }) => {

  const [ user, setUser ] = useState(initialUser);

  const signInSuccessWithAuthResult = (authResult) => {
    const idToken = authResult.user.ra; // jwt

    window.localStorage.user = idToken;

    setUser(idToken);

    return false;
  };

  uiConfig.callbacks.signInSuccessWithAuthResult = signInSuccessWithAuthResult;

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
