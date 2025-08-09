import { NextResponse } from "next/server"
import { google } from "@ai-sdk/google"
import { generateText } from "ai"

const GEMINI_KEY_FALLBACK = "AIzaSyBpO-oLIiYQQDPM-I3NkJqqCn1a865U0C0"

export const maxDuration = 30

export async function POST(req: Request) {
  const { crop = "maize", lat = 0, lon = 0 } = await req.json().catch(() => ({}))

  try {
    const { text } = await generateText({
      model: google("gemini-1.5-pro", {
        apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || GEMINI_KEY_FALLBACK,
      }),
      prompt: `
Return STRICT JSON with an array "events". Each event: 
{ "id": string, "date": string (ISO), "type": "plant"|"irrigate"|"harvest"|"compost"|"weed", "label": string, "confidence": number (0-1), "status": "ontrack"|"approaching"|"missed"|"completed", "influences": [{ "icon": "rain"|"soil"|"indigenous"|"sun", "label": string }] }

Constraints:
- 4-6 events across the next 2 weeks with 1-2 past items.
- Use climate reasoning (rainfall trend, soil moisture proxy, indigenous cues if common).
- Keep labels short and practical.

Context: crop=${crop}, location=(${lat}, ${lon})
      `,
    })
    const json = safeParse(text)
    if (!json?.events) throw new Error("Bad JSON")
    return NextResponse.json(json)
  } catch {
    return NextResponse.json({ events: [] })
  }
}

function safeParse(s: string) {
  try {
    const start = s.indexOf("{")
    const end = s.lastIndexOf("}")
    return JSON.parse(s.slice(start, end + 1))
  } catch {
    return null
  }
}
