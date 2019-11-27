import * as React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import onClickOutside from 'react-onclickoutside';

import { Button } from '../button';
import { DropdownButtons, MenuDropDownButton } from './dropdown-buttons';
import { Store } from '../../store/store-provider';
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

export const MenuButtons = ({ username }) => {
  const history = useHistory();
  const { dispatch } = React.useContext(Store);
  const hasMoreButtons = !!username;
  const [showBtn, updateShowBtn] = React.useState(false);
  MenuButtons.handleClickOutside = () => updateShowBtn(false);

  const goSignIn = React.useCallback(() => history.push('/sign-in'), [history]);
  const signOut = React.useCallback(() => {
    dispatch({ type: 'SIGN_OUT' });
    history.push('/sign-in');
  }, [dispatch, history]);

  return (
    <MenuButtonsStyled>
      {username ? (
        <ButtonStyled primary expand onClick={() => updateShowBtn(!showBtn)}>
          {username + ' '}
          {hasMoreButtons ? (
            <MenuButtonImgStyled src={icArrowDropDown} alt="Dropdown" />
          ) : null}
        </ButtonStyled>
      ) : (
        <ButtonStyled primary expand onClick={goSignIn}>
          Sign In{' '}
        </ButtonStyled>
      )}
      {showBtn && (
        <DropdownButtons>
          <MenuDropDownButton label="Sign Out" action={signOut} />
        </DropdownButtons>
      )}
    </MenuButtonsStyled>
  );
};

export const MenuButtonsSmart = onClickOutside(MenuButtons, {
  handleClickOutside: () => MenuButtons.handleClickOutside
});
