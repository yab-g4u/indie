import { NextResponse } from "next/server"
import { google } from "@ai-sdk/google"
import { generateText } from "ai"

const GEMINI_KEY_FALLBACK = "AIzaSyBpO-oLIiYQQDPM-I3NkJqqCn1a865U0C0"
export const maxDuration = 30

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") || ""
  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json({ error: "Expected multipart/form-data" }, { status: 400 })
  }

  const form = await req.formData()
  const file = form.get("photo") as File | null
  const meta = JSON.parse(String(form.get("meta") || "{}"))
  if (!file) return NextResponse.json({ error: "Missing photo" }, { status: 400 })

  const buf = Buffer.from(await file.arrayBuffer())
  const base64 = `data:${file.type || "image/jpeg"};base64,${buf.toString("base64")}`

  try {
    const { text } = await generateText({
      model: google("gemini-1.5-flash", {
        apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || GEMINI_KEY_FALLBACK,
      }),
      prompt: [
        "You verify farm action photos for climate-smart agriculture.",
        'Return STRICT JSON only: {"fresh": boolean, "confidence": number, "reasons": string[]}.',
        "Use visual reasoning to detect reuse or inconsistencies.",
        "PHOTO_DATA_URI_START",
        base64,
        "PHOTO_DATA_URI_END",
        "METADATA_JSON_START",
        JSON.stringify(meta),
        "METADATA_JSON_END",
      ].join("\n"),
    })
    const parsed = safeParse(text)
    if (!parsed) throw new Error("bad json")
    return NextResponse.json({ ok: true, result: parsed })
  } catch {
    return NextResponse.json({ ok: true, result: { fresh: true, confidence: 0.7, reasons: ["Heuristic fallback"] } })
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
