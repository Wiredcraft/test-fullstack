import * as React from 'react';
import styled from 'styled-components';
import { Button } from '../button';
import icArrowDropDown from '../../assets/ic-arrow-drop-down.png';

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
      <Button primary expand>
        Sign In{' '}
        {hasMoreButtons ? (
          <MenuButtonImgStyled src={icArrowDropDown} alt="Dropdown" />
        ) : null}
      </Button>
    </MenuButtonsStyled>
  );
};
