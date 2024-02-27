import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ListItem, useListStore } from "@/stores/voteListStore";
import { upvote, unvote } from "@/services/votes";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import styles from "./index.module.css";

dayjs.extend(relativeTime);

export default function List() {
  const list = useListStore((state) => state.list);
  const init = useListStore((state) => state.init);

  useEffect(() => {
    init();
  }, []);

  const handleVote = (voteId: number) => async () => {
    try {
      await upvote(voteId);
      init();
    } catch (err) {}
  };

  const handleUnvote = (voteId: number) => async () => {
    try {
      await unvote(voteId);
      init();
    } catch (err) {}
  };

  const renderListItem = (item: ListItem, index: number) => (
    <div key={item.id} className={styles.itemWrapper}>
      <div className={styles.titleWrapper}>
        <div className={`${styles.voteIconWrapper} flex-center pointer`}>
          {!item.liked ? (
            <img
              src="/triangle.svg"
              className={styles.voteArrow}
              onClick={handleVote(item.id)}
            />
          ) : null}
        </div>
        <Link to={`/polling/${item.id}`}>{item.title}</Link>
      </div>
      <div className={styles.btnContainer}>
        <span>{dayjs(item.createdAt).fromNow()}</span>
        {item.liked ? (
          <>
            <span className={styles.bar}>|</span>
            <span onClick={handleUnvote(item.id)} className="pointer">
              unvote
            </span>
          </>
        ) : null}
      </div>
    </div>
  );

  return <div className={styles.container}>{list.map(renderListItem)}</div>;
}
