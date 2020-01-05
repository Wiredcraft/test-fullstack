// simple provider to store global data
// currently only user info.

import React, { FC } from "react";
import { useLocalStorage } from "react-use";
import UserContext from "../contexts/user";
import { STORE_USER_INFO } from "../constants/auth";

const Store: FC = ({ children }) => {
  const [user, setUser] = useLocalStorage(STORE_USER_INFO);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default Store;
