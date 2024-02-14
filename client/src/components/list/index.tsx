import { useEffect } from "react";
import { ListItem, useListStore } from "@/stores/voteListStore";
import styles from "./index.module.css";

export default function List() {
  const list = useListStore((state) => state.list);
  const init = useListStore((state) => state.init);

  useEffect(() => {
    init();
  }, []);

  const renderListItem = (item: ListItem) => (
    <div key={item.id}>
      <div>{item.title}</div>
    </div>
  );

  return <div className={styles.container}>{list.map(renderListItem)}</div>;
}
