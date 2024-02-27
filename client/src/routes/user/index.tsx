import Header from "@/components/header";
import { useEffect } from "react";
import { useUserStore } from "@/stores/userStore";
import styles from "./index.module.css";

export default function User() {
  const user = useUserStore((state) => state.user);
  const getMyUser = useUserStore((state) => state.getMyUser);

  useEffect(() => {
    getMyUser();
  }, []);

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div>user: {user?.email}</div>
        <div>name: {user?.name}</div>
      </div>
    </div>
  );
}
