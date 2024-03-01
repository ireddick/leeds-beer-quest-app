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
        <h1 className={styles.title}>Leeds Pub Finder 🍺</h1>
        <h2>venues near {userLocationText}</h2>
      </header>

      <ul className={styles.venueList}>
        {venues.map(venue => (
          <li className={styles.venue} key={venue.name}>
            <div className={styles.details}>
              <h3 className={styles.name}><a href={venue.url}>{venue.name}</a></h3>
              <p className={styles.address}>{venue.address}</p>
              <p className={styles.infoBar}>
                {distanceAwayInKm(venue)}km away &middot;
                Overall rating {overallRating(venue)}
              </p>
              <p className={styles.description}>{venue.excerpt}</p>
              <p>
                {venue.tags.map(tag =>
                  <span key={tag} className={styles.tag}>{tag}</span>
                )}
              </p>
            </div>
            <div className={styles.thumbnailContainer}>
              <img className={styles.thumbnail}
                src={venue.thumbnail}
                alt={`Photo of ${venue.name}`} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

const LEEDS_CITY_CENTRE: Coord = { lat: 53.79648, lng: -1.54785 }

function overallRating(venue: Venue) {
  const average =
    (venue.stars_amenities +
      venue.stars_atmosphere +
      venue.stars_beer +
      venue.stars_value) / 4

  return Math.round(average * 10 / 5) * 5 / 10
}

function distanceAwayInKm(venue: Venue) {
  const distanceInKm = (venue.distance / 1000)

  return Math.round(distanceInKm * 10) / 10
}
