import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../button';
import icArrowDropDown from '../../assets/ic-arrow-drop-down.png';

const ButtonStyled = styled(Button)`
  padding: 0 ${props => props.theme.gapSize}px;
`;

const MenuButtonsStyled = styled.div`
  height: 100%;
`;

const MenuButtonImgStyled = styled.img`
  width: 18px;
`;

export const MenuButtons = () => {
  const hasMoreButtons = false;

  return (
    <MenuButtonsStyled>
      <Link to="/sign-in">
        <ButtonStyled primary expand>
          Sign In{' '}
          {hasMoreButtons ? (
            <MenuButtonImgStyled src={icArrowDropDown} alt="Dropdown" />
          ) : null}
        </ButtonStyled>
      </Link>
    </MenuButtonsStyled>
  );
};
