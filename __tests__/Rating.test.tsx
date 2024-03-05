import { describe, expect, test } from "@jest/globals"
import { render, screen, waitFor } from "@testing-library/react"
import Rating, { RATING_IMAGE_PATH } from "@/app/Rating"

describe("Rating", () => {
  test.each([
    [2.5, "2.5"],
    [0, "0"],
    [5, "5"]
  ])("with %s stars", async (stars, expected) => {
    const subject = <Rating stars={stars} />

    await waitFor(() => render(subject))

    const image = screen.getByAltText(expected)

    expect(image).toBeDefined()
    expect(image.getAttribute("src"))
      .toBe(`${RATING_IMAGE_PATH}/${expected}.svg`)
  })
})
