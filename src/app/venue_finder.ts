import { getDistance } from "geolib"
import { BeerQuestRecord } from "./beer_quest_parser"

export type VenueFinder = (location: Coord) => Promise<Venue[]>

export async function findVenues(
  location: Coord,
  fetchData: BeerQuestDataProvider = fetchDataFromApi) {

  const beerQuestRecords = await fetchData()

  const venues: Venue[] =
    beerQuestRecords
      .map((record) => ({
        ...record,
        distance: getDistance(location, { lat: record.lat, lng: record.lng })
      }))

  venues.sort((a, b) => a.distance - b.distance)

  return venues
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
