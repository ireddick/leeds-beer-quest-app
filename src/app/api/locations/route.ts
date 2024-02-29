import { CsvDataProvider } from "@/app/csv_data_provider"

export async function GET() {
  const locations = await (new CsvDataProvider()).fetch()

  return Response.json({
    data: locations
  })
}
