import * as React from 'react';
import styled from 'styled-components';

import { TalkCard } from './talk-card';
import { talks } from './talks';

const TalkListingStyled = styled.div``;

export const TalkListing = () => {
  return (
    <TalkListingStyled>
      {talks.map(t => (
        <TalkCard key={t.id} talk={t} />
      ))}
    </TalkListingStyled>
  );
};
