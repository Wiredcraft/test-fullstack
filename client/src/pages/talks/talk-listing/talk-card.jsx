import * as React from 'react';
import styled from 'styled-components';

import { UpVoteButton } from './upvote-btn';

const TalkCardStyled = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${props => props.theme.gridSize * 2}px;
`;

export const TalkCard = () => {
  return (
    <TalkCardStyled>
      <UpVoteButton />
      <div>
        <div>The Journal of Open Research</div>
        <div>I think this is an important question</div>
        <div>5 mins ago</div>
      </div>
    </TalkCardStyled>
  );
};
