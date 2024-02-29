"use client"

import styles from "./page.module.css";
import App from "./App";
import { VenueService, HttpDataProvider } from "./venue_service";

export default function Home() {
  return (
    <main className={styles.main}>
      <App venueService={new VenueService(new HttpDataProvider())} />
    </main>
  );
}
