import { Link } from "react-router-dom";
import { STORAGE_KEY } from "@/constants/common";
import { useUserStore } from "@/stores/userStore";
import styles from "./index.module.css";

export default function HeaderUser() {
  const user = useUserStore((state) => state.user);
  const name = user?.name;

  const logout = () => {
    window.localStorage.removeItem(STORAGE_KEY.TOKEN);
    window.location.reload();
  };

  if (!name) {
    return <Link to={"/login"}>login</Link>;
  }
  return (
    <div className={styles.user}>
      <Link to={"/user"}>{name}</Link>
      <span className={styles.bar}>|</span>
      <a href="javascript:;" onClick={logout}>
        logout
      </a>
    </div>
  );
}
