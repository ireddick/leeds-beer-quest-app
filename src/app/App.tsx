import { useState, useEffect } from "react"
import styles from "./App.module.css";
import { getDistance } from "geolib"

export default function App() {
  const [location, setLocation] = useState<Coord>(LEEDS_CITY_CENTRE)
  const [venues, setVenues] = useState<Venue[]>([])

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
    );
  }, [])

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await fetch("/api/locations")
      const venueData = (await response.json()).data
      const allVenues: Venue[] =
        venueData
          .map((venue: {
            lat: number
            lng: number
          }) => ({
            ...venue,
            distance: distanceBetween(location, { lat: venue.lat, lng: venue.lng })
          }))

      allVenues.sort((a, b) => a.distance - b.distance)

      setVenues(allVenues)
    }

    fetchLocations()
  }, [location])

  return (
    <div>
      <h1 className={styles.title}>Leeds Pub Finder 🍺</h1>

      <p>Venues near {location.lat}, {location.lng}</p>

      <ul className={styles.locations}>
        {venues.map(location => (
          <li className={styles.location} key={location.name}>
            <div className={styles.details}>
              <h2 className={styles.name}>{location.name}</h2>
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

interface Venue {
  name: string
  category: string
  url: string // likely ought to be a URL
  date: string // likely ought to be a Date
  excerpt: string
  thumbnail: string // likely ought to be a URL
  lat: number
  lng: number
  address: string
  phone: string
  twitter: string
  stars_beer: number
  stars_atmosphere: number
  stars_amenities: number
  stars_value: number
  tags: string[]
  distance: number
}

interface Coord {
  lat: number
  lng: number
}

const LEEDS_CITY_CENTRE: Coord = { lat: 53.79648, lng: -1.54785 }

function distanceBetween(pointA: Coord, pointB: Coord) {
  return getDistance(pointA, pointB)
}
