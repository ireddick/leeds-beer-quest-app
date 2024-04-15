import { describe, expect, test } from "@jest/globals"
import { findVenues } from "@/app/lib/venue_service"
import { BeerQuestRecord, CATEGORY_CLOSED } from "@/app/lib/beer_quest"

describe("venue finder", () => {
  test("does not include closed venues in results", async () => {
    const closedVenue: BeerQuestRecord = {
      ...TEST_BEER_QUEST_DATA[0],
      name: "The Closed Bar",
      category: CATEGORY_CLOSED
    }
    const withOneClosedVenue = async () => {
      return [...TEST_BEER_QUEST_DATA, closedVenue]
    }

    const result =
      await findVenues({ lat: 50, lng: 50 }, "", withOneClosedVenue)
    const resultNames = result.map(venue => venue.name)

    expect(result.length).toEqual(TEST_BEER_QUEST_DATA.length)
    expect(resultNames).not.toContain(closedVenue.name)
  })

  describe("distance to venues", () => {
    test('computes the distance to each venue in meters', async () => {
      const result = await findVenues({ lat: 50, lng: 50 }, "", readTestData)
      const resultDistances = result.map(venue => venue.distance)

      expect(resultDistances).toEqual([0, 1113, 13229])
    })

    test('returns venues ordered closest to furthest', async () => {
      const result = await findVenues({ lat: 50, lng: 50 }, "", readTestData)
      const resultOrder = result.map(venue => venue.name)

      expect(resultOrder).toEqual(["The Bar", "Pub A", "Pub B"])
    })
  })

  describe("searching on tags", () => {
    test('returns all venues if no search term given', async () => {
      const searchTerm = ""

      const result = await findVenues({ lat: 50, lng: 50 }, "", readTestData)

      expect(result.length).toEqual(TEST_BEER_QUEST_DATA.length)
    })

    test('returns venues with matching tags', async () => {
      const searchTerm = "food"

      const result = await findVenues({ lat: 50, lng: 50 }, searchTerm, readTestData)
      const resultNames = result.map(venue => venue.name)

      expect(resultNames).toContain("Pub A")
      expect(resultNames).toContain("The Bar")
    })

    test('returns no venues if no matches', async () => {
      const searchTerm = "DOES NOT MATCH ANYTHING"

      const result = await findVenues({ lat: 50, lng: 50 }, searchTerm, readTestData)

      expect(result.length).toEqual(0)
    })
  })
})

async function readTestData() {
  return TEST_BEER_QUEST_DATA
}

const TEST_BEER_QUEST_DATA: BeerQuestRecord[] = [
  {
    name: "Pub A",
    category: "Pub reviews",
    url: "https://example.com/pub-a",
    date: (new Date()).toISOString(),
    excerpt: "An excellent pub A",
    thumbnail: "https://",
    lat: 50.01,
    lng: 50,
    address: "123 Some Street, Leeds, L12 3AB",
    phone: "1234 567 8910",
    twitter: "pub-a",
    stars_beer: 5,
    stars_atmosphere: 4,
    stars_amenities: 3.5,
    stars_value: 2.5,
    tags: ["free wifi", "food", "beer garden"]
  },
  {
    name: "Pub B",
    category: "Pub reviews",
    url: "https://example.com/pub-b",
    date: (new Date()).toISOString(),
    excerpt: "Pub B is very nice",
    thumbnail: "https://",
    lat: 50.1,
    lng: 49.9,
    address: "45 Long Lane, Leeds, L23 4BC",
    phone: "1234 678 9101",
    twitter: "pub-b",
    stars_beer: 3.5,
    stars_atmosphere: 2.5,
    stars_amenities: 3,
    stars_value: 2,
    tags: []
  },
  {
    name: "The Bar",
    category: "Bar reviews",
    url: "https://example.com/the-bar",
    date: (new Date()).toISOString(),
    excerpt: "The Bar is a great place for food",
    thumbnail: "https://",
    lat: 50,
    lng: 50,
    address: "6 The Road, Leeds, L34 5CD",
    phone: "1234 789 1012",
    twitter: "the-bar",
    stars_beer: 2,
    stars_atmosphere: 1,
    stars_amenities: 4,
    stars_value: 0.5,
    tags: ["food", "coffee", "arcade games", "live music"]
  }
]
