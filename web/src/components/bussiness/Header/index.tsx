import React, { FC, useContext } from "react";
import styled from "styled-components";
import { useHistory, useRouteMatch } from "react-router-dom";
import { trigger } from "swr";
import UserContext from "../../../contexts/user";
import ToggleStyle from "./ToggleStyle";
import Button from "../../ui/Button";
import * as ROUTES from "../../../constants/routes";

const Container = styled.header`
  position: fixed;
  top: 0;
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme: { colors } }) => colors.background.light};
  padding: 0 24px;
  z-index: 99;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  & > *:not(:first-child) {
    margin: 0 6px;
  }
`;

const Header: FC = () => {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  const matchLogin = useRouteMatch(ROUTES.LOGIN);
  const matchNewTalk = useRouteMatch(ROUTES.NEW_TALK);
  return (
    <Container>
      <div>
        {user ? (
          <Left>
            {/* TODO: avatar */}
            {!matchNewTalk && (
              <Button
                size="small"
                variant="primary"
                onClick={() => {
                  history.push(ROUTES.NEW_TALK);
                }}
              >
                Add new talk
              </Button>
            )}
            <Button
              size="small"
              variant="translucent"
              onClick={() => {
                setUser();
                trigger("/talks");
              }}
            >
              logout
            </Button>
          </Left>
        ) : (
          !matchLogin && (
            <Button
              size="small"
              variant="primary"
              onClick={() => {
                history.push(ROUTES.LOGIN);
              }}
            >
              Login
            </Button>
          )
        )}
      </div>
      <ToggleStyle />
    </Container>
  );
};

export default Header;
