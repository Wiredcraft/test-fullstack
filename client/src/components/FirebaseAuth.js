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

window.firebase = firebase

const ui = new firebaseui.auth.AuthUI(firebase.auth());

const FirebaseAuth = ({ children }) => {

  const [ user, _setUser ] = useState(null);

  const setUser = user => {
    if (!user) {
      firebase.auth().signOut();
    }

    _setUser(user);
  };

  const setIdToken = async () => {
    const idToken = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);

    setUser(idToken);
  };

  const signInSuccessWithAuthResult = () => {
    setIdToken();

    return false;
  };

  uiConfig.callbacks.signInSuccessWithAuthResult = signInSuccessWithAuthResult;

  useEffect(() => {

    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        setIdToken();
      } else {
        setUser(null);
      }
    });

  }, []);

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
