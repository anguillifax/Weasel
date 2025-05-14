import styles from "./page.module.css";

export default function Home() {
  const text = process.env.AGFX_TEST;
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Placeholder App</h1>
        <p>{text}</p>
      </main>
    </div>
  );
}
