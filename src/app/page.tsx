"use client"

import styles from "./page.module.css";
import App from "./App";
import { findVenues } from "./venue_service";

export default function Home() {
  return (
    <main className={styles.main}>
      <App findVenues={findVenues} />
    </main>
  );
}
