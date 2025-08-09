"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import LivingCropCalendar, { type CropEvent } from "@/components/living-crop-calendar"
import { Loader2 } from 'lucide-react'

export default function AiCalendarPanel() {
  const [crop, setCrop] = useState("maize")
  const [lat, setLat] = useState<string>("")
  const [lon, setLon] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [events, setEvents] = useState<CropEvent[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!lat && !lon && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLat(String(pos.coords.latitude.toFixed(4)))
          setLon(String(pos.coords.longitude.toFixed(4)))
        },
        () => {},
        { enableHighAccuracy: true, timeout: 4000 }
      )
    }
  }, [])

  async function generate() {
    setLoading(true)
    setError(null)
    setEvents(null)
    try {
      const res = await fetch("/api/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          crop,
          lat: Number(lat || 0),
          lon: Number(lon || 0),
        }),
      })
      const data = await res.json()
      setEvents(data.events || [])
    } catch (e: any) {
      setError("Failed to generate. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-4 gap-2">
        <Input value={crop} onChange={(e) => setCrop(e.target.value)} placeholder="Crop (e.g., maize)" />
        <Input value={lat} onChange={(e) => setLat(e.target.value)} placeholder="Latitude" />
        <Input value={lon} onChange={(e) => setLon(e.target.value)} placeholder="Longitude" />
        <Button onClick={generate} className="bg-[color:#0B6A46]">
          {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating</> : "Generate"}
        </Button>
      </div>
      {error && <div className="text-sm text-red-600">{error}</div>}
      {events && events.length > 0 ? (
        <LivingCropCalendar events={events} density="comfortable" showWhyPanel />
      ) : (
        <EmptyState />
      )}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="rounded-md border bg-muted/30 p-6 text-sm text-muted-foreground">
      No tasks yet. Enter crop and location, then click Generate.
    </div>
  )
}
