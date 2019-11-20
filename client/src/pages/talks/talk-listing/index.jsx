import * as React from 'react';
import styled from 'styled-components';

import { TalkCard } from './talk-card';

const TalkListingStyled = styled.div``;

export const TalkListing = () => {
  return (
    <TalkListingStyled>
      <TalkCard />
      <TalkCard />
      <TalkCard />
      <TalkCard />
      <TalkCard />
      <TalkCard />
      <TalkCard />
    </TalkListingStyled>
  );
};
