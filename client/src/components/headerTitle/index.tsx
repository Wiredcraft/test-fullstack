import styles from "./index.module.css";

export default function HeaderTitle() {
  const goRoot = () => {
    window.location.href = "/";
  };

  return (
    <div onClick={goRoot} className={styles.title}>
      Polling
    </div>
  );
}
