"use client"

import styles from "./page.module.css";
import App from "./App";
import { findVenues } from "./lib/venue_service";
import { getLocation } from "./lib/location_service";
import { windowWrapper } from "./lib/window_wrapper";

export default function Home() {
  return (
    <main className={styles.main}>
      <App
        findVenues={findVenues}
        getLocation={getLocation}
        windowWrapper={windowWrapper} />
    </main>
  );
}
