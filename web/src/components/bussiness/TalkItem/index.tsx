import React, { FC } from "react";
import styled from "styled-components";
import { H4, Body1, Caption } from "../../ui/Typography";
import { TalkItem as ITalkItem } from "../../../typings";

const MAX_DISPLAY_VOTE = 999;

interface Props {
  data: ITalkItem;
  onVote: (item: ITalkItem) => void;
}

const Container = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme: { colors } }) => colors.background.light};
  padding: 16px;
  margin: 8px 0;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.08);
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const VoteContainer = styled.div<{ isVoted: boolean }>`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  text-align: center;
  cursor: ${({ isVoted }) => (isVoted ? "default" : "pointer")};
  color: ${({ theme: { colors } }) => colors.text.base};
  background: ${({ theme: { colors }, isVoted }) =>
    isVoted ? colors.background.lighter : colors.background.lightest};
  user-select: none;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 50px - 12px);
`;
const Right = styled.div``;

const TalkItem: FC<Props> = ({ data, onVote, ...otherProps }) => {
  const { title, authorName, description, createdAt, vote, isVoted } = data;
  return (
    <Container {...otherProps}>
      <Left>
        <H4 ellipsis>{title}</H4>
        <Body1 ellipsis>{description}</Body1>
        <Footer>
          <Caption>by {authorName}</Caption>
          <Caption>{new Date(createdAt).toLocaleString()}</Caption>
        </Footer>
      </Left>
      <Right>
        <VoteContainer isVoted={isVoted} onClick={() => onVote(data)}>
          <Caption>
            {isVoted ? "▲" : "△"} <br />
            {vote > MAX_DISPLAY_VOTE ? `${MAX_DISPLAY_VOTE}+` : vote}
          </Caption>
        </VoteContainer>
      </Right>
    </Container>
  );
};

export default TalkItem;
