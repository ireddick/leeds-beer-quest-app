import { promises as fs } from "fs"
import { parse } from "csv-parse/sync"
import { BeerQuestDataProvider, BeerQuestRecord } from "./beer_quest"

export class CsvDataProvider implements BeerQuestDataProvider {
  readonly csvReader: CsvReader

  constructor(csvReader: CsvReader = new CsvReader()) {
    this.csvReader = csvReader
  }

  async fetch() {
    /*
      NOTE: reading the CSV file needs to be made to work
      in both dev and prod!
    */
    const csv = await this.csvReader.read()

    const locations: BeerQuestRecord[] =
      parse(csv, { columns: true })
        .map((location: {
          lat: string
          lng: string
          stars_beer: string
          stars_atmosphere: string
          stars_amenities: string
          stars_value: string
          tags: string
        }) => ({
          ...location,
          lat: Number.parseFloat(location.lat),
          lng: Number.parseFloat(location.lng),
          stars_beer: Number.parseFloat(location.stars_beer),
          stars_atmosphere: Number.parseFloat(location.stars_atmosphere),
          stars_amenities: Number.parseFloat(location.stars_amenities),
          stars_value: Number.parseFloat(location.stars_value),
          tags: location.tags.length > 0 ? location.tags.split(",") : []
        }))

    return locations
  }
}

class CsvReader {
  async read() {
    const csvData =
      await fs.readFile(process.cwd() + '/src/app/leedsbeerquest.csv', 'utf8')

    return csvData
  }
}
