import { useState, useEffect } from "react"

interface Location {
  name: string
}

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
          <li key={location.name}>{location.name}</li>
        ))}
      </ul>
    </div>
  )
}
