import * as React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs'; // Just another smaller moment.js
import relativeTime from 'dayjs/plugin/relativeTime';

import { UpVoteButton } from './upvote-btn';
import { Button } from '../../components/button';

// Add .fromNow() support to dayjs
dayjs.extend(relativeTime);

const TalkCardStyled = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${props => props.theme.gridSize * 2}px;
  border-bottom: 1px solid rgba(33, 33, 33, 0.1);
`;

const TalkContentStyled = styled.div`
  margin-left: ${props => props.theme.gridSize * 2}px;
`;

const CardTitleStyled = styled.div`
  font-weight: 500;
  line-height: 125%;
  margin-bottom: ${props => props.theme.gridSize / 2}px;
`;

const CardDescStyled = styled.div`
  font-size: ${props => props.theme.fontSizeSmall}px;
  line-height: 125%;
  margin-bottom: ${props => props.theme.gridSize / 2}px;
  max-height: ${props => props.theme.fontSizeSmall * 1.25 * 2}px;
  overflow: hidden;
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

export const TalkCard = ({ talk }) => {
  const { title, desc, ctime, author, votes } = talk;
  return (
    <TalkCardStyled>
      <UpVoteButton count={votes} />
      <TalkContentStyled>
        <CardTitleStyled>{title}</CardTitleStyled>
        <CardDescStyled>{desc}</CardDescStyled>
        <CardMetaGroupStyled>
          <CardMetaStyled>
            <Button>{author}</Button>
          </CardMetaStyled>
          <CardMetaSeparator />
          <CardMetaStyled>{dayjs(ctime).fromNow()}</CardMetaStyled>
        </CardMetaGroupStyled>
      </TalkContentStyled>
    </TalkCardStyled>
  );
};
