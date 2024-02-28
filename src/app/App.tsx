import { useState, useEffect } from "react"
import styles from "./App.module.css";

export default function App() {
  const [locations, setLocations] = useState<Location[]>([])

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await fetch("/api/locations")

      const locations: Location[] = (await response.json()).data

      setLocations(locations)
    }

    fetchLocations()
  }, [])

  return (
    <div>
      <h1>Leeds Pub Finder 🍺</h1>
      <ul className={styles.locations}>
        {locations.map(location => (
          <li className={styles.location} key={location.name}>

            <div className={styles.details}>
              <h2 className={styles.name}>{location.name}</h2>
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

interface Location {
  name: string
  category: string
  url: string // likely ought to be a URL
  date: string // likely ought to be a Date
  excerpt: string
  thumbnail: string // likely ought to be a URL
  lat: number
  lng: number
  address: string,
  phone: string
  twitter: string
  stars_beer: number
  stars_atmosphere: number
  stars_amenities: number
  stars_value: number
  tags: string[]
}
