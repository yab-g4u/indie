"use client"

import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import LivingCropCalendar, { type CropEvent } from "@/components/living-crop-calendar"
import { Camera, Check, MapPin } from 'lucide-react'
import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { addToOfflineQueue, getQueue, isOnline, trySync } from "@/lib/offline-queue"

export default function AgentFarmCard() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [submitted, setSubmitted] = React.useState(false)
  const [syncing, setSyncing] = React.useState(false)
  const [queued, setQueued] = React.useState(getQueue().length)
  const [photo, setPhoto] = React.useState<File | null>(null)
  const [gps, setGps] = React.useState<{ lat: number; lon: number } | null>(null)
  const [verify, setVerify] = React.useState<{ fresh: boolean; confidence: number; reasons: string[] } | null>(null)
  const [crop, setCrop] = React.useState("maize")
  const [events, setEvents] = React.useState<CropEvent[] | null>(null)

  React.useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude
          const lon = pos.coords.longitude
          setGps({ lat, lon })
          const res = await fetch("/api/calendar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ crop, lat, lon }),
          })
          const data = await res.json()
          setEvents(data.events || [])
        },
        () => setGps(null),
        { enableHighAccuracy: true, timeout: 5000 }
      )
    }
  }, [crop])

  return (
    <main className="min-h-screen px-4 py-6">
      <div className="mx-auto w-full max-w-md">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Digital Farm Card</span>
              <Badge variant="outline">{id}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" /> {gps ? `GPS: ${gps.lat.toFixed(4)}, ${gps.lon.toFixed(4)}` : "Locating..."}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <Label htmlFor="crop">Crop</Label>
                <Input id="crop" value={crop} onChange={(e) => setCrop(e.target.value)} className="max-w-[200px]" />
              </div>
              <div className="mt-2">
                {events ? (
                  <LivingCropCalendar events={events} density="compact" showWhyPanel />
                ) : (
                  <div className="rounded-md border bg-muted/30 p-4 text-sm text-muted-foreground">
                    Generating your Crop Calendar...
                  </div>
                )}
              </div>
            </div>

            <div id="log" />
            <div className="mt-4 rounded-lg border p-3 bg-card">
              <div className="flex items-center justify-between">
                <div className="font-medium">Log Action</div>
                <Badge variant={isOnline() ? "secondary" : "destructive"}>{isOnline() ? "Online" : "Offline"}</Badge>
              </div>
              {!submitted ? (
                <form
                  className="mt-3 grid gap-2"
                  onSubmit={async (e) => {
                    e.preventDefault()
                    const form = e.currentTarget as HTMLFormElement
                    const data = Object.fromEntries(new FormData(form as any))
                    await addToOfflineQueue({
                      type: (data.type as string) || "irrigate",
                      farmId: id,
                      notes: data.notes as string,
                      date: (data.date as string) || new Date().toISOString(),
                    })
                    if (isOnline() && photo) {
                      const fd = new FormData()
                      fd.append("photo", photo)
                      fd.append("meta", JSON.stringify({ farmId: id, gps, type: data.type, date: data.date }))
                      const res = await fetch("/api/verify", { method: "POST", body: fd })
                      const out = await res.json()
                      if (out?.result) setVerify(out.result)
                    }
                    setQueued(getQueue().length)
                    setSubmitted(true)
                  }}
                >
                  <div>
                    <Label htmlFor="type">Action type</Label>
                    <Input id="type" name="type" placeholder="irrigate | compost | harvest" required />
                  </div>
                  <div>
                    <Label htmlFor="date">Recommended date</Label>
                    <Input id="date" name="date" type="date" required />
                  </div>
                  <div>
                    <Label htmlFor="photo">Photo</Label>
                    <Input
                      id="photo"
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea id="notes" name="notes" placeholder="Optional" />
                  </div>
                  <Button className="bg-[color:#0B6A46]" type="submit">
                    <Camera className="h-4 w-4 mr-2" />
                    Submit
                  </Button>
                </form>
              ) : (
                <div className="grid place-items-center py-8">
                  <div className="grid place-items-center">
                    <div className="grid place-items-center size-16 rounded-full bg-[color:#0B6A46]/10">
                      <Check className="h-8 w-8 text-[color:#0B6A46]" />
                    </div>
                    {verify && (
                      <div className="mt-2 text-sm">
                        AI verification:{" "}
                        <span className={verify.fresh ? "text-[color:#0B6A46]" : "text-red-500"}>
                          {verify.fresh ? "Fresh" : "Suspicious"}
                        </span>{" "}
                        • {Math.round(verify.confidence * 100)}%
                      </div>
                    )}
                    <div className="mt-2 text-xs text-muted-foreground">
                      {queued} action(s) in sync queue.
                    </div>
                    <div className="mt-3">
                      <Button
                        variant="outline"
                        onClick={async () => {
                          setSyncing(true)
                          await trySync()
                          setQueued(getQueue().length)
                          setSyncing(false)
                        }}
                      >
                        {syncing ? "Syncing..." : "Sync now"}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => router.back()}>
                Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
