import * as React from 'react';
import { Redirect } from 'react-router-dom';

import { Header, FixedHeaderFixer } from '../../components/header';
// import { FilterBar } from '../../components/filter-bar';
import { TalkListing } from './talk-listing';
import { Fab } from '../../components/fab';

export const TalksPage = () => {
  const [goCreate, updateGoCreate] = React.useState(false);
  return (
    <>
      {goCreate && <Redirect to="/talks/create" />}
      <Header />
      <FixedHeaderFixer />
      {/* <FilterBar /> */}
      <TalkListing />
      <Fab onClick={() => updateGoCreate(true)} />
    </>
  );
};
