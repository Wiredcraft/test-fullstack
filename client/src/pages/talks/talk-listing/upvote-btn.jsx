import * as React from 'react';
import styled from 'styled-components';
import icUpvoteTriangle from '../../../assets/ic-upvote-triangle.png';
import { Button } from '../../../components/button';

const UpVoteButtonStyled = styled(Button)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${props => props.theme.gridSize * 5}px;
  height: ${props => props.theme.gridSize * 7}px;
  border: 2px solid #ccc;
  border-radius: 2px;
`;

const UpVoteImg = styled.img`
  width: 15px;
`;

const UpVoteCount = styled.div`
  margin-top: 4px;
`;

export const UpVoteButton = ({ count }) => {
  return (
    <UpVoteButtonStyled>
      <UpVoteImg src={icUpvoteTriangle} />
      <UpVoteCount>44</UpVoteCount>
    </UpVoteButtonStyled>
  );
};
