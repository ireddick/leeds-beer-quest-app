import { useState, useEffect } from "react"
import styles from "./App.module.css";
import { LocationProvider } from "./lib/location_service"
import { VenueFinder, Venue, Coord } from "./lib/venue_service"
import VenueListing from "./VenueListing";

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
    location === LEEDS_CITY_CENTRE ? "the city centre" : "your location"

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
        <p className={styles.location}>Venues near {userLocationText}</p>
        <form className={styles.search} onSubmit={onSearchSubmit}>
          <input
            name="searchTerm"
            type="input"
            placeholder="Filter by tag">
          </input>
        </form>
      </header>

      {initialLoad && <p>Loading...</p>}

      {noMatchingVenues && <p>No matching venues!</p>}

      {hasResults &&
        <ul className={styles.venueList}>
          {venues.map(venue => (
            <li key={venue.name}>
              <VenueListing venue={venue} />
            </li>
          ))}
        </ul>
      }
    </>
  )
}

const LEEDS_CITY_CENTRE: Coord = { lat: 53.79648, lng: -1.54785 }
