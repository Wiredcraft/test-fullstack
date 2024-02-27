import { useUserStore } from "@/stores/userStore";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/header";
import styles from "./index.module.css";

export default function PollingDetail() {
  const getMyUser = useUserStore((state) => state.getMyUser);
  const { pollingId } = useParams();

  useEffect(() => {
    getMyUser();
  }, []);

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div>{pollingId}</div>
      </div>
    </div>
  );
}
