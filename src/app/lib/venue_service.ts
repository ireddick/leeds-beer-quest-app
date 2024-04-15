import { getDistance } from "geolib"
import { BeerQuestRecord } from "./beer_quest"

export type VenueFinder =
  (location: Coord, searchTerm: string) => Promise<Venue[]>

export async function findVenues(
  location: Coord,
  searchTerm: string,
  fetchData: BeerQuestDataProvider = fetchDataFromApi
) {
  const sanitisedSearchTerm = searchTerm.trim().toLowerCase()

  const beerQuestRecords = await fetchData()

  const filteredRecords: BeerQuestRecord[] =
    beerQuestRecords
      .filter((record) => {
        return record.category !== "Closed venues" &&
          record.tags.join(" ").includes(sanitisedSearchTerm)
      })

  const results: Venue[] =
    filteredRecords
      .map((record) => ({
        ...record,
        distance: getDistance(location, { lat: record.lat, lng: record.lng })
      }))

  results.sort((a, b) => a.distance - b.distance)

  return results
}

export interface Coord {
  lat: number
  lng: number
}

export interface Venue extends BeerQuestRecord {
  distance: number
}

type BeerQuestDataProvider = () => Promise<BeerQuestRecord[]>

async function fetchDataFromApi() {
  const response = await fetch("/api/locations")
  const locations: BeerQuestRecord[] = (await response.json()).data

  return locations
}
