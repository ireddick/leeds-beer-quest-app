import { promises as fs } from "fs"
import { parse } from "csv-parse/sync"

export async function GET() {
  const locations = await readLocations()

  return Response.json({
    data: locations
  })
}

async function readLocations() {
  /*
    NOTE: reading the CSV file needs to be made to work
    in both dev and prod!
  */
  const csv =
    await fs.readFile(process.cwd() + '/src/app/leedsbeerquest.csv', 'utf8')
  return parse(csv, { columns: true })
}
