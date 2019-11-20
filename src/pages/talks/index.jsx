import * as React from 'react';
import styled from 'styled-components';

import { Header } from '../../components/header';
// import { FilterBar } from '../../components/filter-bar';
import { TalkListing } from './talk-listing';

const FixedHeaderFixer = styled.div`
  height: ${props =>
    props.theme.fixedHeader ? props.theme.gridSize * 8 : 0}px;
`;

export const TalksPage = () => {
  return (
    <>
      <Header />
      <FixedHeaderFixer></FixedHeaderFixer>
      {/* <FilterBar /> */}
      <TalkListing />
    </>
  );
};
