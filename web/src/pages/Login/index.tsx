import React, { FC, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { trigger } from "swr";

import { useTitle } from "react-use";
import Input from "../../components/ui/Input";
import { Caption } from "../../components/ui/Typography";
import Button from "../../components/ui/Button";

import UserContext from "../../contexts/user";
import * as ROUTES from "../../constants/routes";
import useInput from "../../hooks/useInput";
import request from "../../utils/request";

import { Left, Right, Split, LoginSection, LoginItem } from "./styles";

const Login: FC = () => {
  useTitle("Login - Talk Polling");
  const history = useHistory();
  const { setUser, user } = useContext(UserContext);
  const { value: name, bind: nameBind } = useInput("");
  const { value: password, bind: passwordBind } = useInput("");
  useEffect(() => {
    if (user) {
      history.push(ROUTES.HOME);
    }
  });

  const auth = async (url: string): Promise<void> => {
    // simple validation
    // TODO: use https://github.com/react-hook-form/react-hook-form
    // use schema-based validation like https://github.com/jquense/yup
    if (!name) {
      alert("Please enter password");
      return;
    }
    if (password && password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      const { user: resultUser, token } = await request.post(url, {
        name,
        password
      });
      setUser({
        ...resultUser,
        token
      });
      // Re-fetch talk after login
      trigger("/talks");
      history.push(ROUTES.HOME);
    } catch (reason) {
      alert(reason); // TODO: wait for toast component
    }
  };
  return (
    <div>
      <Left>
        <LoginSection>
          <LoginItem>
            <Caption>Name: </Caption>
            <Input {...nameBind} required />
          </LoginItem>
          <LoginItem>
            <Caption>Password: </Caption>
            <Input {...passwordBind} type="password" required />
          </LoginItem>
          <Button onClick={() => auth("/users/login")}>Login</Button>
          <Split>/</Split>
          <Button variant="translucent" onClick={() => auth("/users")}>
            Create Account
          </Button>
        </LoginSection>
      </Left>
      <Right />
    </div>
  );
};

export default Login;
