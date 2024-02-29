import { getDistance } from "geolib"
import { BeerQuestRecord, BeerQuestDataProvider } from "./beer_quest"

export class VenueService {
  readonly dataProvider: BeerQuestDataProvider

  constructor(dataProvider: BeerQuestDataProvider = new HttpDataProvider()) {
    this.dataProvider = dataProvider
  }

  async find(location: Coord) {
    const beerQuestRecords = await this.dataProvider.fetch()

    const venues: Venue[] =
      beerQuestRecords
        .map((record) => ({
          ...record,
          distance: getDistance(location, { lat: record.lat, lng: record.lng })
        }))

    venues.sort((a, b) => a.distance - b.distance)

    return venues
  }
}

export interface Venue extends BeerQuestRecord {
  distance: number
}

export interface Coord {
  lat: number
  lng: number
}

class HttpDataProvider implements BeerQuestDataProvider {
  async fetch() {
    const response = await fetch("/api/locations")
    const locations: BeerQuestRecord[] = (await response.json()).data

    return locations
  }
}
