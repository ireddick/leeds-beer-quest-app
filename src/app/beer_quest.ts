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

export interface BeerQuestDataProvider {
  fetch: () => Promise<BeerQuestRecord[]>
}
