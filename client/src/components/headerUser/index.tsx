import { useEffect } from "react";
import { useUserStore } from "@/stores/userStore";
import { Link } from "react-router-dom";
import { STORAGE_KEY } from "@/constants/common";
import styles from "./index.module.css";

export default function HeaderUser() {
  const user = useUserStore((state) => state.user);
  const getMyUser = useUserStore((state) => state.getMyUser);

  useEffect(() => {
    getMyUser();
  }, []);

  const logout = () => {
    window.localStorage.removeItem(STORAGE_KEY.TOKEN);
    window.location.reload();
  };

  if (!user) {
    return <Link to={"/login"}>login</Link>;
  }
  return (
    <div className={styles.user}>
      <Link to={"/user"}>{user.name}</Link>
      <span className={styles.bar}>|</span>
      <a href="javascript:;" onClick={logout}>
        logout
      </a>
    </div>
  );
}
