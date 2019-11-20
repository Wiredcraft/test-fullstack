import * as React from 'react';
import { Header } from '../../components/header';
import { FilterBar } from '../../components/filter-bar';
import { TalkCard } from '../../components/talk-card';

export const TalksPage = () => {
  return (
    <>
      <Header />
      <FilterBar />
      <TalkCard />
    </>
  );
};
