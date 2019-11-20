import * as React from 'react';
import styled from 'styled-components';

import { UpVoteButton } from './upvote-btn';
import { Button } from '../../../components/button';

const TalkCardStyled = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${props => props.theme.gridSize * 2}px;
`;

const TalkContentStyled = styled.div`
  margin-left: ${props => props.theme.gridSize * 2}px;
`;

const CardTitleStyled = styled.div`
  font-weight: 600;
  margin-bottom: ${props => props.theme.gridSize / 2}px;
`;

const CardDescStyled = styled.div`
  font-size: ${props => props.theme.fontSizeSmall}px;
  margin-bottom: ${props => props.theme.gridSize / 2}px;
`;

const CardMetaGroupStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${props => props.theme.colorLight};
  font-size: 12px;
`;

const CardMetaStyled = styled.div`
  button {
    color: ${props => props.theme.colorLight};
  }
`;

const CardMetaSeparator = styled.div`
  margin-left: ${props => props.theme.gapSize / 2}px;
  margin-right: ${props => props.theme.gapSize / 2}px;
  width: 2px;
  height: 2px;
  border-radius: 2px;
  background-color: ${props => props.theme.colorLight};
`;

export const TalkCard = () => {
  return (
    <TalkCardStyled>
      <UpVoteButton />
      <TalkContentStyled>
        <CardTitleStyled>The Journal of Open Research</CardTitleStyled>
        <CardDescStyled>I think this is an important question</CardDescStyled>
        <CardMetaGroupStyled>
          <CardMetaStyled>
            <Button>Kun</Button>
          </CardMetaStyled>
          <CardMetaSeparator />
          <CardMetaStyled>5 mins ago</CardMetaStyled>
        </CardMetaGroupStyled>
      </TalkContentStyled>
    </TalkCardStyled>
  );
};
