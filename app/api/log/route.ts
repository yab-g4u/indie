export async function POST(request: Request) {
  const payload = await request.json()
  // Simulate verification and crediting
  const result = {
    ok: true,
    credits: 3,
    verification: { aiConfidence: 0.82, checks: ["Photo fresh", "GPS within 200m"] },
    stored: payload,
  }
  return new Response(JSON.stringify(result), { headers: { "Content-Type": "application/json" } })
}
