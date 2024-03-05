import { describe, expect, test } from "@jest/globals"
import { render, screen, waitFor } from "@testing-library/react"
import VenueListing from "@/app/VenueListing"
import { TEST_VENUE_DATA } from "./__support__/venue_data"

describe("VenueListing", () => {
  test('it renders', async () => {
    const venue = TEST_VENUE;
    const subject = <VenueListing venue={venue} />

    await waitFor(() => render(subject))

    const title = screen.getByRole("heading", { level: 2 })
    expect(title.textContent).toMatch("The Bar")
  })

  test("distance", async () => {
    const venue = {
      ...TEST_VENUE,
      distance: 2543
    }
    const subject = <VenueListing venue={venue} />

    await waitFor(() => render(subject))

    const distance = screen.getByText("📍 2.5km")
    expect(distance).toBeDefined()
  })

  test("distance under 0.05km", async () => {
    const venue = {
      ...TEST_VENUE,
      distance: 49
    }
    const subject = <VenueListing venue={venue} />

    await waitFor(() => render(subject))

    const distance = screen.getByText("📍 0km")
    expect(distance).toBeDefined()
  })

  test("map link", async () => {
    const venue = {
      ...TEST_VENUE,
      lat: 54.321,
      lng: 45.678
    }
    const subject = <VenueListing venue={venue} />

    await waitFor(() => render(subject))

    const mapLink = screen.getByText("Show on map")
    expect(mapLink.getAttribute("href"))
      .toBe("https://maps.google.com/?q=54.321,45.678")
  })
})

const TEST_VENUE = TEST_VENUE_DATA[0]
