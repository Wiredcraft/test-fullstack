import * as React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import dayjs from 'dayjs'; // Just another smaller moment.js
import relativeTime from 'dayjs/plugin/relativeTime';

import { CONFIG } from '../../constants/config';
import { UpVoteButton } from './upvote-btn';
import { Button } from '../../components/button';
import { Store } from '../../store/store-provider';

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
  margin-left: ${props => props.theme.gridSize / 2}px;
  margin-right: ${props => props.theme.gridSize / 2}px;
  width: 2px;
  height: 2px;
  border-radius: ${props => props.theme.borderRadius}px;
  background-color: ${props => props.theme.colorLight};
`;

export const TalkCard = ({ talk, loadTalks }) => {
  const { id, title, description, ctime, author, votes, votedByMe } = talk;
  const { state, dispatch } = React.useContext(Store);

  // TODO: Extract to parent container for easier testing
  // Cache vote talk
  const voteTalk = React.useCallback(() => {
    if (!(state && state.userInfo && state.userInfo.accessToken)) {
      return;
    }

    axios
      .put(`${CONFIG.apiServer}/talks/${id}/vote`, null, {
        headers: { Authorization: `Bearer ${state.userInfo.accessToken}` }
      })
      .then(resp => {
        if (`${resp.status}`.startsWith('2')) {
          dispatch({ type: 'VOTE_TALK', payload: { talkId: id } });
        }
      })
      .catch(err => {
        dispatch({ type: 'ERROR', payload: err });
      });
  }, [dispatch]);
  const unvoteTalk = React.useCallback(() => {
    if (!(state && state.userInfo && state.userInfo.accessToken)) {
      return;
    }

    axios
      .put(`${CONFIG.apiServer}/talks/${id}/unvote`, null, {
        headers: { Authorization: `Bearer ${state.userInfo.accessToken}` }
      })
      .then(resp => {
        if (`${resp.status}`.startsWith('2')) {
          dispatch({ type: 'UNVOTE_TALK', payload: { talkId: id } });
        }
      })
      .catch(err => {
        dispatch({ type: 'ERROR', payload: err });
      });
  }, [dispatch]);

  const toggleVoteTalk = React.useCallback(() => {
    if (votedByMe) {
      unvoteTalk(id);
    } else {
      voteTalk(id);
    }
  }, [dispatch, votedByMe]);

  return (
    <TalkCardStyled>
      <UpVoteButton
        count={votes}
        votedByMe={votedByMe}
        onClick={toggleVoteTalk}
      />
      <TalkContentStyled>
        <CardTitleStyled>{title}</CardTitleStyled>
        <CardDescStyled>{description}</CardDescStyled>
        <CardMetaGroupStyled>
          <CardMetaStyled>
            <Button transparent onClick={() => loadTalks({ author })}>
              {author}
            </Button>
          </CardMetaStyled>
          <CardMetaSeparator />
          <CardMetaStyled>{dayjs(ctime).fromNow()}</CardMetaStyled>
        </CardMetaGroupStyled>
      </TalkContentStyled>
    </TalkCardStyled>
  );
};
