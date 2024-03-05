import { describe, expect, test } from "@jest/globals"
import { render, screen, waitFor } from "@testing-library/react"
import VenueListing from "@/app/VenueListing"
import { Venue } from "@/app/lib/venue_service"

describe("VenueListing", () => {
  test('it renders', async () => {
    const venue = testVenue;
    const subject = <VenueListing venue={venue} />

    await waitFor(() => render(subject))

    const title = screen.getByRole("heading", { level: 2 })
    expect(title.textContent).toMatch("The Bar")
  })

  test("distance", async () => {
    const venue = {
      ...testVenue,
      distance: 2543
    }
    const subject = <VenueListing venue={venue} />

    await waitFor(() => render(subject))

    const distance = screen.getByText("📍 2.5km")
    expect(distance).toBeDefined()
  })

  test("distance under 0.05km", async () => {
    const venue = {
      ...testVenue,
      distance: 49
    }
    const subject = <VenueListing venue={venue} />

    await waitFor(() => render(subject))

    const distance = screen.getByText("📍 0km")
    expect(distance).toBeDefined()
  })
})

const testVenue: Venue = {
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
}
