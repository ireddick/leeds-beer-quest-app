import { parse } from "csv-parse/sync"

export function parseCsv(csv: string) {
  const locations: BeerQuestRecord[] =
    parse(csv, { columns: true })
      .map((location: {
        lat: string
        lng: string
        stars_beer: string
        stars_atmosphere: string
        stars_amenities: string
        stars_value: string
        tags: string
      }) => ({
        ...location,
        lat: Number.parseFloat(location.lat),
        lng: Number.parseFloat(location.lng),
        stars_beer: Number.parseFloat(location.stars_beer),
        stars_atmosphere: Number.parseFloat(location.stars_atmosphere),
        stars_amenities: Number.parseFloat(location.stars_amenities),
        stars_value: Number.parseFloat(location.stars_value),
        tags: location.tags.length > 0 ? location.tags.split(",") : []
      }))

  return locations
}

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

export const CATEGORY_CLOSED = "Closed venues"
