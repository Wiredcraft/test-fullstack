import * as React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../button';
import icArrowDropDown from '../../assets/ic-arrow-drop-down.png';

const ButtonStyled = styled(Button)`
  padding: 0 ${props => props.theme.gridSize}px;
`;

const MenuButtonsStyled = styled.div`
  height: 100%;
`;

const MenuButtonImgStyled = styled.img`
  width: 18px;
`;

export const MenuButtons = () => {
  const hasMoreButtons = false;
  const [goSignIn, updateGoSignIn] = React.useState(false);

  return (
    <MenuButtonsStyled>
      {goSignIn && <Redirect to="/sign-in" />}
      <ButtonStyled primary expand onClick={() => updateGoSignIn(true)}>
        Sign In{' '}
        {hasMoreButtons ? (
          <MenuButtonImgStyled src={icArrowDropDown} alt="Dropdown" />
        ) : null}
      </ButtonStyled>
    </MenuButtonsStyled>
  );
};
