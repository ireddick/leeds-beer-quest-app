import styles from "./VenueListing.module.css"
import { Venue } from "./lib/venue_service"
import Rating from "./Rating"

interface VenueListingProps {
  venue: Venue
}

export default function VenueListing({ venue }: VenueListingProps) {
  return (
    <div className={styles.venue}>
      <div className={styles.details}>
        <h2 className={styles.name}><a href={venue.url}>{venue.name}</a></h2>
        <p className={styles.address}>{venue.address}</p>
        <p className={styles.distance}>
          {`📍 ${distanceAwayInKm(venue)}km`} <a href={mapLinkUrl(venue)}>Show on map</a>
        </p>
        <p className={styles.description}>{venue.excerpt}</p>
        <div className={styles.ratings}>
          <p><Rating stars={venue.stars_beer} /> Beer</p>
          <p><Rating stars={venue.stars_amenities} /> Amenities</p>
          <p><Rating stars={venue.stars_atmosphere} /> Atmosphere</p>
          <p><Rating stars={venue.stars_value} /> Value</p>
        </div>
        <p>
          {venue.tags.map(tag =>
            <span key={tag} className={styles.tag}>{tag}</span>
          )}
        </p>
      </div>
      <div className={styles.thumbnailContainer}>
        <img className={styles.thumbnail}
          src={venue.thumbnail}
          alt={`Photo of ${venue.name}`}
          loading="lazy" />
      </div>
    </div>
  )
}

function distanceAwayInKm(venue: Venue) {
  const distanceInKm = (venue.distance / 1000)

  return Math.round(distanceInKm * 10) / 10
}

function mapLinkUrl(venue: Venue) {
  return `https://maps.google.com/?q=${venue.lat},${venue.lng}`
}
