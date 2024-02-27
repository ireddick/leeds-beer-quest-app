import { useState, useEffect } from "react"

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
      <h1>Pubs 🍺</h1>
      <ul>
        {locations.map(location => (
          <li key={location.name}>
            {location.name} tags: {location.tags.join(" ")}
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
