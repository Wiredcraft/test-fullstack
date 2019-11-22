import * as React from 'react';
import { Header, FixedHeaderFixer } from '../../components/header';
import { SignInForm } from './sign-in-form';

export const SignInPage = () => {
  return (
    <>
      <Header />
      <FixedHeaderFixer />
      <SignInForm />
    </>
  );
};
