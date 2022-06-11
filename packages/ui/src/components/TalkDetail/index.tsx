import { useState } from "react";
import { Talk } from "types";

import { voteTalk } from "../../api";

import { VoteIcon } from "../VoteIcon";
import { ResourceLoader } from "../ResourceLoader";

import styles from "./styles.module.css";

export interface TalkDetailProps {
  talk: Talk;
}

export const TalkDetail: React.FC<TalkDetailProps> = (props) => {
  const { talk } = props;

  const [voting, setVoting] = useState<Promise<Talk>>(Promise.resolve(talk));

  return (
    <>
      <div className={styles.title}>
        <VoteIcon onClick={() => setVoting(voteTalk(talk.id))} />
        {talk.title}
      </div>
      <div className={styles.subtitle}>
        <ResourceLoader resource={voting} renderData={(t) => <span>{`${t.votes} votes`}</span>} />
        {` | ${talk.author.email} | ${talk.createdAt.toISOString()}`}
      </div>
      <div className={styles.description}>{talk.description}</div>
    </>
  );
};
