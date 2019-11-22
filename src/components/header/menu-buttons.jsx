import * as React from 'react';
import { useHistory } from 'react-router-dom';
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
  const history = useHistory();
  const hasMoreButtons = false;

  const goSignIn = () => history.push('/sign-in');

  return (
    <MenuButtonsStyled>
      <ButtonStyled primary expand onClick={goSignIn}>
        Sign In{' '}
        {hasMoreButtons ? (
          <MenuButtonImgStyled src={icArrowDropDown} alt="Dropdown" />
        ) : null}
      </ButtonStyled>
    </MenuButtonsStyled>
  );
};
