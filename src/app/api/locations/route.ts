import { promises as fs } from "fs"
import { parseCsv } from "@/app/beer_quest"

export async function GET() {
  const locations = parseCsv(await readCsv())

  return Response.json({
    data: locations
  })
}

/*
  TODO: this has to work in different environments
  - currently it will only work in dev?
*/
async function readCsv() {
  const csvData =
    await fs.readFile(process.cwd() + '/src/app/leedsbeerquest.csv', 'utf8')

  return csvData
}
