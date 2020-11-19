import React, { useState } from 'react';
import AuthService from '../services/auth.service';

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  return (
    <UserContext.Provider value={[currentUser, setCurrentUser]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };