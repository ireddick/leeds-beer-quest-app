import { useState, useEffect } from "react"
import styles from "./App.module.css";
import { LocationProvider } from "./lib/location_service"
import { VenueFinder, Venue, Coord } from "./lib/venue_service"
import Rating from "./Rating";

interface AppProps {
  findVenues: VenueFinder,
  getLocation: LocationProvider
}

export default function App({
  findVenues,
  getLocation
}: AppProps) {
  const [location, setLocation] = useState<Coord>(LEEDS_CITY_CENTRE)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [venues, setVenues] = useState<Venue[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const userLocationText =
    location === LEEDS_CITY_CENTRE ? "the city centre" : "your current location"

  const hasResults = venues.length > 0
  const initialLoad = isLoading && !hasResults
  const noMatchingVenues = !isLoading && !hasResults

  useEffect(() => {
    const refreshLocation = async () => {
      const location = await getLocation()

      if (location != undefined) {
        setLocation(location)
      } else {
        setLocation(LEEDS_CITY_CENTRE)
      }
    }

    refreshLocation()
  }, [getLocation])

  useEffect(() => {
    const refreshVenues = async () => {
      setIsLoading(true)
      try {
        setVenues(await findVenues(location, searchTerm))
      } finally {
        setIsLoading(false)
      }
    }

    refreshVenues()
  }, [location, searchTerm, findVenues])

  function onSearchSubmit(e: any) {
    e.preventDefault()
    const searchTerm = e.target.searchTerm.value

    setSearchTerm(searchTerm)
  }

  return (
    <>
      <header className={styles.appHeading}>
        <h1 className={styles.title}>Leeds Pub Finder&nbsp;🍺</h1>
        <p>Showing venues near {userLocationText}</p>
      </header>

      <form className={styles.search} onSubmit={onSearchSubmit}>
        <label>
          Search tags: <input
            name="searchTerm"
            type="input"
            placeholder="eg. wifi">
          </input>
        </label>
      </form>

      {initialLoad && <p>Loading...</p>}

      {noMatchingVenues && <p>No matching venues!</p>}

      {hasResults &&
        <ul className={styles.venueList}>
          {venues.map(venue => (
            <li className={styles.venue} key={venue.name}>
              <div className={styles.details}>
                <h2 className={styles.name}><a href={venue.url}>{venue.name}</a></h2>
                <p className={styles.address}>{venue.address}</p>
                <p className={styles.distance}>
                  📍 {distanceAwayInKm(venue)}km <a href={mapLinkUrl(venue)}>Show on map</a>
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
        </ul>}
    </>
  )
}

const LEEDS_CITY_CENTRE: Coord = { lat: 53.79648, lng: -1.54785 }

function distanceAwayInKm(venue: Venue) {
  const distanceInKm = (venue.distance / 1000)

  return Math.round(distanceInKm * 10) / 10
}

function mapLinkUrl(venue: Venue) {
  return `https://maps.google.com/?q=${venue.lat},${venue.lng}`
}
