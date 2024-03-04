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
    <>
      <header className={styles.appHeading}>
        <h1 className={styles.title}>Leeds Pub Finder&nbsp;🍺</h1>
        <p>Showing venues near {userLocationText}</p>
      </header>

      <ul className={styles.venueList}>
        {venues.map(venue => (
          <li className={styles.venue} key={venue.name}>
            <div className={styles.details}>
              <h2 className={styles.name}><a href={venue.url}>{venue.name}</a></h2>
              <p className={styles.address}>{venue.address}</p>
              <p className={styles.distance}>
                {distanceAwayInKm(venue)}km away
              </p>
              <p className={styles.description}>{venue.excerpt}</p>
              <div className={styles.ratings}>
                <p><Rating stars={venue.stars_beer} /> Beer</p>
                <p><Rating stars={venue.stars_amenities} /> Amenities</p>
                <p><Rating stars={venue.stars_atmosphere} /> Atmosphere</p>
                <p><Rating stars={venue.stars_value} /> Value</p>
              </div>
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
    </>
  )
}

const LEEDS_CITY_CENTRE: Coord = { lat: 53.79648, lng: -1.54785 }

function distanceAwayInKm(venue: Venue) {
  const distanceInKm = (venue.distance / 1000)

  return Math.round(distanceInKm * 10) / 10
}

function Rating({ stars }: { stars: number }) {
  const ratingText = stars.toString()
  const ratingUrl = `https://duckduckgo.com/assets/ta-ratings/${ratingText}.svg`

  return (<img src={ratingUrl} alt={ratingText} />)
}
