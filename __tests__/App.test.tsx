import { describe, expect, test } from "@jest/globals"
import { render, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom/jest-globals"
import App from "@/app/App"
import { Coord } from "@/app/lib/venue_service"
import { TEST_VENUE_DATA } from "./__support__/venue_data"

describe("App", () => {
  test('it renders', async () => {
    const subject =
      <App
        findVenues={stubbedFindVenues}
        getLocation={stubbedGetLocation}
        windowWrapper={stubbedWindowWrapper} />

    await waitFor(() => render(subject))

    const title = screen.getByRole("heading", { level: 1 })
    expect(title.textContent).toMatch("Leeds Pub Finder")
  })

  test('shows the venues provided', async () => {
    const subject =
      <App
        findVenues={stubbedFindVenues}
        getLocation={stubbedGetLocation}
        windowWrapper={stubbedWindowWrapper} />

    await waitFor(() => render(subject))

    const venueTitles = screen.getAllByRole("heading", { level: 2 })
    const venueNames = venueTitles.map(title => title.textContent)
    expect(venueNames.length).toBe(3)
    expect(venueNames).toContain("The Bar")
    expect(venueNames).toContain("Pub A")
    expect(venueNames).toContain("Pub B")
  })

  test('location info when user location provided', async () => {
    const subject =
      <App
        findVenues={stubbedFindVenues}
        getLocation={stubbedGetLocation}
        windowWrapper={stubbedWindowWrapper} />

    await waitFor(() => render(subject))

    const locationInfo = screen.getByText("Venues near your location")
    expect(locationInfo).toBeInTheDocument()
  })

  test('location info when user location not provided', async () => {
    const getUndefinedLocation = async () => undefined
    const subject =
      <App
        findVenues={stubbedFindVenues}
        getLocation={getUndefinedLocation}
        windowWrapper={stubbedWindowWrapper} />

    await waitFor(() => render(subject))

    const locationInfo = screen.getByText("Venues near the city centre")
    expect(locationInfo).toBeInTheDocument()
  })
})

async function stubbedGetLocation() {
  return { lat: 50, lng: 50 }
}

async function stubbedFindVenues(location: Coord, searchTerm: string) {
  return TEST_VENUE_DATA
}

const stubbedWindowWrapper = {
  scrollToTop() { }
}
