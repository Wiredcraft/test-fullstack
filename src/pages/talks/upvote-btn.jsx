import * as React from 'react';
import styled from 'styled-components';
import icUpvoteTriangle from '../../assets/ic-upvote-triangle.png';
import { Button } from '../../components/button';
import { Image } from '../../components/image';

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

const UpVoteImg = styled.img`
  width: 15px;
`;

const UpVoteCount = styled.div`
  color: ${props =>
    props.highlight ? props.theme.themeColor : props.theme.color};
  margin-top: 4px;
`;

export const UpVoteButton = ({ count, votedByMe }) => {
  return (
    <UpVoteButtonStyled transparent highlight={votedByMe}>
      <Image src={icUpvoteTriangle} width={15} height={7.5} />
      <UpVoteCount highlight={votedByMe}>{count}</UpVoteCount>
    </UpVoteButtonStyled>
  );
};
