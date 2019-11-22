import * as React from 'react';
import styled from 'styled-components';

import { Image } from '../../components/image';
import { Button } from '../../components/button';

const ButtonStyled = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  width: 263px;
  height: 48px;
  color: ${props =>
    props.light ? props.theme.colorInverted : props.theme.color};
`;

const ButtonLabelStyled = styled.div`
  margin-left: 19px;
  text-transform: uppercase;
`;

export const SocialSignInButton = ({
  backgroundColor,
  label,
  light = false,
  iconSrc
}) => {
  console.log('social sign in button, icon: ', iconSrc);
  return (
    <ButtonStyled style={{ backgroundColor }} light={light}>
      <Image src={iconSrc} width={28} />
      <ButtonLabelStyled>{label}</ButtonLabelStyled>
    </ButtonStyled>
  );
};
