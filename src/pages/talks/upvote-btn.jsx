import * as React from 'react';
import styled from 'styled-components';
import IcUpvoteTriangle from '../../assets/ic-upvote-triangle.svg';
import IcUpvotedTriangle from '../../assets/ic-upvote-triangle-upvoted.svg';
import { Button } from '../../components/button';

const UpVoteButtonStyled = styled(Button)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 0 0 ${props => props.theme.gridSize * 6}px;
  height: ${props => props.theme.gridSize * 7}px;
  border-width: 2px;
  border-style: solid;
  border-color: ${props =>
    props.highlight ? props.theme.themeColor : props.theme.colorLighter};
  border-radius: ${props => props.theme.borderRadius}px;
`;

const UpVoteCount = styled.div`
  color: ${props =>
    props.highlight ? props.theme.themeColor : props.theme.color};
  margin-top: 4px;
`;

export const UpVoteButton = ({ count, votedByMe, onClick }) => {
  return (
    <UpVoteButtonStyled transparent highlight={votedByMe} onClick={onClick}>
      {votedByMe ? <IcUpvotedTriangle /> : <IcUpvoteTriangle />}
      <UpVoteCount highlight={votedByMe}>{count}</UpVoteCount>
    </UpVoteButtonStyled>
  );
};
