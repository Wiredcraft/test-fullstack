import * as React from 'react';
import { Header, FixedHeaderFixer } from '../../../components/header';
import { Title } from '../../../components/title';
import { CreateTalkForm } from './create-talk-form';

export const CreateTalk = () => {
  return (
    <>
      <Header />
      <FixedHeaderFixer />
      <Title>Add Talk</Title>
      <CreateTalkForm />
    </>
  );
};
