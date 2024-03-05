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
    expect(title.textContent).toBe(venue.name)
    const titleLink = screen.getByText(venue.name)
    expect(titleLink.getAttribute("href")).toBe(venue.url)
    const address = screen.getByText(venue.address)
    expect(address.textContent).toBeDefined()
    const excerpt = screen.getByText(venue.excerpt)
    expect(excerpt.textContent).toBeDefined()
  })

  test("distance away", async () => {
    const venue = {
      ...TEST_VENUE,
      distance: 2543
    }
    const subject = <VenueListing venue={venue} />

    await waitFor(() => render(subject))

    const distance = screen.getByText("📍 2.5km")
    expect(distance).toBeDefined()
  })

  test("distance away under 0.05km", async () => {
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

  test("thumbnail", async () => {
    const venue = TEST_VENUE
    const subject = <VenueListing venue={venue} />

    await waitFor(() => render(subject))

    const thumbnail = screen.getByAltText(`Photo of ${venue.name}`)
    expect(thumbnail.getAttribute("src")).toBe(venue.thumbnail)
  })

  test("tags", async () => {
    const venue = TEST_VENUE
    const subject = <VenueListing venue={venue} />

    await waitFor(() => render(subject))

    venue.tags.forEach(t => {
      const tag = screen.getByText(t)
      expect(tag.textContent).toBeDefined()
    })
  })
})

const TEST_VENUE = TEST_VENUE_DATA[0]
