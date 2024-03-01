import { useState, useEffect } from "react"
import styles from "./App.module.css";
import { VenueFinder, Venue, Coord } from "./venue_finder"

interface AppProps {
  findVenues: VenueFinder
}

export default function App({ findVenues }: AppProps) {
  const [location, setLocation] = useState<Coord>(LEEDS_CITY_CENTRE)
  const [venues, setVenues] = useState<Venue[]>([])

  const userLocationText =
    location === LEEDS_CITY_CENTRE ? "the city centre" : "your current location"

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      },
      (_) => {
        setLocation(LEEDS_CITY_CENTRE)
      }
    )
  }, [])

  useEffect(() => {
    const refreshVenues = async () => {
      setVenues(await findVenues(location))
    }

    refreshVenues()
  }, [location, findVenues])

  return (
    <div>
      <header className={styles.appHeading}>
        <h1 className={styles.title}>Leeds Pub Finder 🍺🍷</h1>
        <h2>venues near {userLocationText}</h2>
      </header>

      <ul className={styles.venueList}>
        {venues.map(location => (
          <li className={styles.venue} key={location.name}>
            <div className={styles.details}>
              <h3 className={styles.name}>{location.name}</h3>
              <p className={styles.address}>{location.address}</p>
              <p>{location.distance} m</p>
              <p className={styles.description}>{location.excerpt}</p>
              <p>
                {location.tags.map(tag =>
                  <span key={tag} className={styles.tag}>{tag}</span>
                )}
              </p>
            </div>
            <div className={styles.thumbnailContainer}>
              <img className={styles.thumbnail}
                src={location.thumbnail}
                alt={`Photo of ${location.name}`} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

const LEEDS_CITY_CENTRE: Coord = { lat: 53.79648, lng: -1.54785 }
