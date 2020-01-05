import React, { FC } from "react";
import styled from "styled-components";
import { Flipper, Flipped } from "react-flip-toolkit";
import TalkItem from "../TalkItem";
import { TalkItem as ITalkItem } from "../../../typings";

interface Props {
  data: ITalkItem[];
  onVote: (item: ITalkItem) => void;
}

const Container = styled.div`
  margin: 0 auto;
  max-width: 768px;
  padding: 16px;
`;

const TalkList: FC<Props> = ({ data, onVote }) => {
  return (
    <Flipper flipKey={`${data.map(_ => _.id).join("")}`}>
      <Container>
        {data.map(item => (
          <Flipped key={item.id} flipId={item.id}>
            <TalkItem data={item} onVote={onVote} />
          </Flipped>
        ))}
      </Container>
    </Flipper>
  );
};

export default TalkList;
