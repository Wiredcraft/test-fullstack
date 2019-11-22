import * as React from 'react';
import { Header } from '../../components/header';
import { FixedHeaderFixer } from '../../components/fixed-header-fixer';
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
