import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ListItem, useListStore } from "@/stores/voteListStore";
import { upvote, unvote } from "@/services/votes";
import styles from "./index.module.css";

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

  const renderListItem = (item: ListItem) => (
    <div key={item.id}>
      <div className={styles.titleWrapper}>
        <div className={styles.voteIconWrapper}>
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
        <span onClick={handleUnvote(item.id)}>
          {item.liked ? "unvote" : null}
        </span>
      </div>
    </div>
  );

  return <div className={styles.container}>{list.map(renderListItem)}</div>;
}
