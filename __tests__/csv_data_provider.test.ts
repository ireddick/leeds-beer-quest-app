import { CsvDataProvider } from "@/app/csv_data_provider"
import { describe, expect, test } from "@jest/globals"

describe("csv data provider", () => {
  test("returns all records in the data set", async () => {
    const subject = new CsvDataProvider({
      async read() {
        return fakeCsvData
      }
    })

    const result = await subject.fetch()

    expect(result.length).toEqual(3)
  })

  test("parses records correctly", async () => {
    const subject = new CsvDataProvider({
      async read() {
        return fakeCsvData
      }
    })

    const result = await subject.fetch()

    expect(result[0]).toEqual({
      name: "...escobar",
      category: "Closed venues",
      url: "http://leedsbeer.info/?p=765",
      date: "2012-11-30T21:58:52+00:00",
      excerpt: "...It's really dark in here!",
      thumbnail: "http://leedsbeer.info/wp-content/uploads/2012/11/20121129_185815.jpg",
      lat: 53.8007317,
      lng: -1.5481764,
      address: "23-25 Great George Street, Leeds LS1 3BB",
      phone: "0113 220 4389",
      twitter: "EscobarLeeds",
      stars_beer: 2,
      stars_atmosphere: 3,
      stars_amenities: 3,
      stars_value: 3,
      tags: ["food", "live music", "sofas"]
    })
  })

  test("no tags is parsed to an empty tag array", async () => {
    const subject = new CsvDataProvider({
      async read() {
        return fakeCsvData
      }
    })

    const result = await subject.fetch()

    expect(result[2].tags).toEqual([])
  })
})

const fakeCsvData: string =
  `"name","category","url","date","excerpt","thumbnail","lat","lng","address","phone","twitter","stars_beer","stars_atmosphere","stars_amenities","stars_value","tags"
"...escobar","Closed venues","http://leedsbeer.info/?p=765","2012-11-30T21:58:52+00:00","...It's really dark in here!","http://leedsbeer.info/wp-content/uploads/2012/11/20121129_185815.jpg","53.8007317","-1.5481764","23-25 Great George Street, Leeds LS1 3BB","0113 220 4389","EscobarLeeds","2","3","3","3","food,live music,sofas"
"""Golf"" Cafe Bar","Bar reviews","http://leedsbeer.info/?p=1382","2013-04-27T14:44:22+00:00","FORE! You can play ""golf"" here and enjoy a nice bottled ale. ","http://leedsbeer.info/wp-content/uploads/2013/04/20130422_204442.jpg","53.7934952","-1.5478653","1 Little Neville Street, Granary Wharf, Leeds LS1 4ED","0113 244 4428","GolfCafeBar","2.5","2.5","3.5","2.5","beer garden,coffee,food,free wifi,sports"
"115 The Headrow","Pub reviews","http://leedsbeer.info/?p=2753","2014-10-18T15:48:51+00:00","A bar that lives up to its name.","http://leedsbeer.info/wp-content/uploads/2014/10/115.jpg","53.7994003","-1.545981","115 The Headrow, Leeds, LS1 5JW","","BLoungeGrp","1.5","3","2.5","2",""`
