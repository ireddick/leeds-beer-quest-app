export async function GET() {
  return Response.json({
    data: [
      { name: "a bar" },
      { name: "a pub" }
    ]
  })
}
