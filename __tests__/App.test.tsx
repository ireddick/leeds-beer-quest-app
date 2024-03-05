import { describe, expect, test } from "@jest/globals"
import { render, screen, waitFor } from "@testing-library/react"
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

  test('shows venues', async () => {
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
})

async function stubbedGetLocation() {
  return undefined
}

async function stubbedFindVenues(location: Coord, searchTerm: string) {
  return TEST_VENUE_DATA
}

const stubbedWindowWrapper = {
  scrollToTop() { }
}
