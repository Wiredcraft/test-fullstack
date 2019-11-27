import * as React from 'react';
import { useHistory } from 'react-router-dom';

import { Header, FixedHeaderFixer } from '../../components/header';
// import { FilterBar } from '../../components/filter-bar';
import { TalkListing } from './talk-listing';
import { Fab } from '../../components/fab';

export const TalksPage = () => {
  const history = useHistory();
  const goCreate = React.useCallback(() => history.push('/talks/create'), [
    history
  ]);
  return (
    <>
      <Header />
      <FixedHeaderFixer />
      {/* <FilterBar /> */}
      <TalkListing />
      <Fab onClick={goCreate} />
    </>
  );
};
