import { describe, expect, test } from "@jest/globals"
import "@testing-library/jest-dom"
import { render, screen, waitFor } from "@testing-library/react"
import App from "@/app/App"
import { Coord, Venue } from "@/app/lib/venue_service"

describe("App", () => {
  test('it renders', async () => {
    const subject =
      <App
        findVenues={stubbedFindVenues}
        getLocation={stubbedGetLocation} />

    await waitFor(() => render(subject))

    const title = screen.getByRole("heading", { level: 1 })
    expect(title.textContent).toMatch("Leeds Pub Finder")
  })

  test('shows venues', async () => {
    const subject =
      <App
        findVenues={stubbedFindVenues}
        getLocation={stubbedGetLocation} />

    await waitFor(() => render(subject))

    const venueTitles = screen.getAllByRole("heading", { level: 2 })
    const venueNames = venueTitles.map(title => title.textContent)

    expect(venueNames.length).toBe(3)
    expect(venueNames).toContain("The Bar")
    expect(venueNames).toContain("Pub A")
    expect(venueNames).toContain("Pub B")
  })
})

async function stubbedGetLocation() {
  return undefined
}

async function stubbedFindVenues(location: Coord, searchTerm: string) {
  return TEST_VENUE_DATA
}

const TEST_VENUE_DATA: Venue[] = [
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
    tags: ["food", "coffee", "arcade games", "live music"],
    distance: 0
  },
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
    tags: ["free wifi", "food", "beer garden"],
    distance: 1113
  },
  {
    name: "Pub B",
    category: "Closed venues",
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
    tags: [],
    distance: 13229
  }
]
