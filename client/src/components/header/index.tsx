import HeaderTitle from "../headerTitle";
import HeaderUser from "../headerUser";
import styles from "./index.module.css";

export default function Header() {
  return (
    <div className={styles.container}>
      <HeaderTitle />
      <HeaderUser />
    </div>
  );
}
