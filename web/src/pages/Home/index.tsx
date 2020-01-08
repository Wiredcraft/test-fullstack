import React, { FC, useContext } from "react";
import produce from "immer";
import { orderBy } from "lodash";
import useSWR, { mutate } from "swr";
import styled from "styled-components";
import { useTitle } from "react-use";
import { useHistory } from "react-router-dom";
import TalkList from "../../components/bussiness/TalkList";
import request from "../../utils/request";
import UserContext from "../../contexts/user";
import { LOGIN } from "../../constants/routes";
import { TalkItem } from "../../typings";

const Container = styled.div``;
const Empty = styled.div`
  width: 100%;
  margin-top: 200px;
  text-align: center;
`;

const Home: FC = () => {
  useTitle("Home - Talk Polling");
  const { data, error } = useSWR("/talks");
  const { user } = useContext(UserContext);
  const history = useHistory();
  if (error) {
    // This is a critical request, if failed, should went to error page.
    // TODO: custom error
    throw new Error(JSON.stringify(error));
  }
  if (!data) {
    return null; // TODO: loading
  }
  if (!data.length) {
    return <Empty>There are nothing here yet.</Empty>;
  }
  return (
    <Container>
      <TalkList
        data={orderBy(data, ["vote", "title"], ["desc", "asc"])}
        onVote={async item => {
          if (!user) {
            history.push(LOGIN, {
              from: `/?vote=${item.id}` // TODO: Figure out if need to help users auto vote after login
            });
            return;
          }
          const nextData = produce<TalkItem[]>(data, draft => {
            const target = draft.find(i => i.id === item.id);
            if (target) {
              target.vote = item.isVoted ? target.vote - 1 : target.vote + 1;
              target.isVoted = !item.isVoted;
            }
            return draft;
          });
          await request.patch(`/talks/${item.id}`, {
            isVoted: !item.isVoted
          });
          mutate("/talks", nextData);
        }}
      />
    </Container>
  );
};

export default Home;
