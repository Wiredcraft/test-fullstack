import React, { useState, useEffect } from 'react';
import UserContext from './UserContext';

import firebase from 'firebase/app';
import firebaseui from 'firebaseui';

import { firebaseConfig } from '../utils/config';
import { LOADING, LOADED } from '../utils/loadingStatuses';

firebase.initializeApp(firebaseConfig);

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


const FirebaseAuth = ({ children }) => {

  const [ user, _setUser ] = useState(null);
  const [ firebaseLoadStatus, setFirebaseLoadStatus ] = useState(LOADING);

  const setUser = user => {
    if (!user) {
      firebase.auth().signOut();
    }

    _setUser(user);
  };

  const setIdToken = async () => {
    let idToken;
    try {
      idToken = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
    } catch(e) {
      console.error(e);
      // if firebase UI errors out, user will be null,
      // and firebase UI displays its own error message
    }

    setUser(idToken);

    return idToken;
  };

  const signInSuccessWithAuthResult = () => {
    setIdToken();

    return false;
  };

  uiConfig.callbacks.signInSuccessWithAuthResult = signInSuccessWithAuthResult;

  useEffect(() => {

    firebase.auth().onAuthStateChanged(async user => {

      if(user) {
        await setIdToken();
      } else {
        ui.start('#firebaseui-auth-container', uiConfig)
        setUser(null);
      }

      setFirebaseLoadStatus(LOADED);

    });

  }, []);

  return (
      <UserContext.Provider value={{ user, setUser, firebaseLoadStatus }}>
        {children}
      </UserContext.Provider>
  );
};

export default FirebaseAuth;
