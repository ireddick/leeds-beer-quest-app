import { getDistance } from "geolib"
import { BeerQuestRecord } from "./beer_quest"

export type VenueFinder =
  (location: Coord, searchTerm: string) => Promise<Venue[]>

export async function findVenues(
  location: Coord,
  searchTerm: string,
  fetchData: BeerQuestDataProvider = fetchDataFromApi
) {
  const beerQuestRecords = await fetchData()

  const venues: Venue[] =
    beerQuestRecords
      .map((record) => ({
        ...record,
        distance: getDistance(location, { lat: record.lat, lng: record.lng })
      }))

  const filteredVenues: Venue[] =
    venues
      .filter((venue) => {
        if (searchTerm.trim() === "") { return true }

        return venue.tags.join(" ").includes(searchTerm)
      })

  filteredVenues.sort((a, b) => a.distance - b.distance)

  return filteredVenues
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
