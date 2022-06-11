import { useState } from "react";
import { ListTalk } from "types";

import { voteTalk } from "../../api";

import { VoteIcon } from "../VoteIcon";
import { ResourceLoader } from "../ResourceLoader";

import styles from "./styles.module.css";

export interface TalkListProps {
  start: number;
  talks: ListTalk[];
}

export const TalkList: React.FC<TalkListProps> = (props) => {
  const { start, talks } = props;

  const [sorted, setSorted] = useState(talks);

  return (
    <>
      {sorted.map((talk, i) => (
        <Item
          key={talk.id}
          index={start + i}
          talk={talk}
          onVoted={(votes) => {
            if (talk.votes === votes) return;
            talk.votes = votes;
            const nextSorted = sorted.slice();
            nextSorted.sort((a, b) => (a.votes > b.votes ? -1 : 1));
            setSorted(nextSorted);
          }}
        />
      ))}
    </>
  );
};

interface ItemProps {
  index: number;
  talk: ListTalk;
  onVoted: (votes: number) => void;
}

const Item: React.FC<ItemProps> = ({ index, talk, onVoted }) => {
  const [voting, setVoting] = useState<Promise<{ votes: number }>>(Promise.resolve(talk));

  return (
    <>
      <tr>
        <td>{index}.</td>
        <td>
          <VoteIcon onClick={() => setVoting(voteTalk(talk.id))} />
        </td>
        <td className={styles.title}>
          <a href={`/talk/${talk.id}`}>{talk.title}</a>
        </td>
      </tr>
      <tr>
        <td colSpan={2}></td>
        <td className={styles.subtitle}>
          <ResourceLoader
            resource={voting}
            onSuccess={(t) => onVoted(t.votes)}
            renderData={(t) => <span>{`${t.votes} votes`}</span>}
          />
        </td>
      </tr>
    </>
  );
};
