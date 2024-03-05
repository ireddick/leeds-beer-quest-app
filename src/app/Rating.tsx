interface RatingProps {
  stars: number
}

export default function Rating({ stars }: RatingProps) {
  const ratingText = stars.toString()
  const ratingUrl = `${RATING_IMAGE_PATH}/${ratingText}.svg`

  return (<img src={ratingUrl} alt={ratingText} />)
}

export const RATING_IMAGE_PATH = "https://duckduckgo.com/assets/ta-ratings"
