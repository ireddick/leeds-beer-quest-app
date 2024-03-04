import { promises as fs } from "fs"
import path from "path"
import { parseCsv } from "@/app/lib/beer_quest"

export async function GET() {
  const locations = parseCsv(await readCsv())

  return Response.json({
    data: locations
  })
}

async function readCsv() {
  const csvPath = path.resolve("public", "leedsbeerquest.csv")

  const csvData =
    await fs.readFile(csvPath, 'utf8')

  return csvData
}
