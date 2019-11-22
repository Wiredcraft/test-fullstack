import * as React from 'react';
import styled from 'styled-components';

import { SocialSignInButton } from './social-sign-in-btn';
import { Image } from '../../components/image';
import icLoginGithub from '../../assets/ic-login-github.png';
import icSocialLoginBtnIcon from '../../assets/ic-social-login-btn-icon.png';

const SignInFormStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 300px;
  text-align: center;
  padding-top: ${props => props.theme.gapSize * 9}px;
`;

const LoginIconStyled = styled.div`
  display: flex;
  justify-content: center;
`;

const LoginMsgStyled = styled.div`
  margin-top: ${props => props.theme.gapSize * 2}px;
  max-width: 220px;
  font-size: ${props => props.theme.fontSizeBig}px;
  line-height: 150%;
`;

const OptionsMsgStyled = styled.div`
  margin-top: ${props => props.theme.gapSize * 7}px;
  font-size: ${props => props.theme.fontSizeMinor}px;
`;

const SocialButtons = styled.div`
  margin-top: ${props => props.theme.gapSize * 3}px;
`;

export const SignInForm = () => {
  return (
    <SignInFormStyled>
      <LoginIconStyled>
        <Image src={icLoginGithub} width={72} />
      </LoginIconStyled>
      <LoginMsgStyled>
        Login to start creating lightning talks now!
      </LoginMsgStyled>
      <OptionsMsgStyled>Choose your login method</OptionsMsgStyled>
      <SocialButtons>
        <SocialSignInButton
          label="Sign In With Github"
          iconSrc={icSocialLoginBtnIcon}
          backgroundColor="#333333"
          light
        />
      </SocialButtons>
    </SignInFormStyled>
  );
};
