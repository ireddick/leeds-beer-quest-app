import { Coord } from "./venue_service"

export type LocationProvider = () => Promise<Coord | undefined>

export async function getLocation(): Promise<Coord | undefined> {
  return new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      },
      (_) => {
        resolve(undefined)
      }
    )
  })
}
