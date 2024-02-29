import { describe, expect, test } from '@jest/globals'
import { VenueService, BeerQuestRecord } from '@/app/venue_service'

describe("venue service", () => {
  test('finding venues', async () => {
    const subject = new VenueService({
      async fetch() {
        return await fakeBeerQuestData
      },
    })

    const result = await subject.find({ lat: 50, lng: 50 })

    expect(result.length).toEqual(1)
  })
})

const fakeBeerQuestData: BeerQuestRecord[] = [
  {
    name: "Pub A",
    category: "pub",
    url: "https://example.com/pub-a",
    date: (new Date()).toISOString(),
    excerpt: "An excellent pub A",
    thumbnail: "https://",
    lat: 50,
    lng: 50,
    address: "123 Some Street, Leeds, L12 3AB",
    phone: "1234567890",
    twitter: "@pub-a",
    stars_beer: 5,
    stars_atmosphere: 4,
    stars_amenities: 3,
    stars_value: 2,
    tags: ["wifi", "couches"]
  }
]
