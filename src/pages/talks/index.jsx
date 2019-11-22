import * as React from 'react';

import { Header } from '../../components/header';
import { FixedHeaderFixer } from '../../components/fixed-header-fixer';
// import { FilterBar } from '../../components/filter-bar';
import { TalkListing } from './talk-listing';
import { CreateTalkFab } from './create-talk-fab';

export const TalksPage = () => {
  return (
    <>
      <Header />
      <FixedHeaderFixer />
      {/* <FilterBar /> */}
      <TalkListing />
      <CreateTalkFab />
    </>
  );
};
