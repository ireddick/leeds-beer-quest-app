import { getDistance } from "geolib"

export interface BeerQuestRecord {
  name: string
  category: string
  url: string
  date: string
  excerpt: string
  thumbnail: string
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
}

export interface Venue extends BeerQuestRecord {
  distance: number
}

interface BeerQuestDataProvider {
  fetch: () => Promise<BeerQuestRecord[]>
}

export class HttpDataProvider implements BeerQuestDataProvider {
  async fetch() {
    const response = await fetch("/api/locations")
    return (await response.json()).data
  }
}

export interface Coord {
  lat: number
  lng: number
}

export class VenueService {
  readonly dataProvider: BeerQuestDataProvider

  constructor(dataProvider: BeerQuestDataProvider) {
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
