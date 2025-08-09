import { NextResponse } from "next/server"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"

const GEMINI_KEY_FALLBACK = "AIzaSyBpO-oLIiYQQDPM-I3NkJqqCn1a865U0C0"

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const { context } = body

  try {
    const { text } = await generateText({
      model: google("gemini-1.5-flash", {
        apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || GEMINI_KEY_FALLBACK,
      }),
      prompt:
        "Explain concisely in 2 sentences why this recommendation is made using rainfall, soil moisture, and indigenous cues. Keep it accessible.\nContext JSON:\n" +
        JSON.stringify(context || {}),
    })
    return NextResponse.json({ narrative: text })
  } catch {
    return NextResponse.json({ narrative: "Explanation unavailable at this time." })
  }
}
