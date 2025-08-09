"use client"

import LivingCropCalendar, { type CropEvent } from "@/components/living-crop-calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin } from 'lucide-react'
import { useParams } from "next/navigation"

export default function NgoFarmDetail() {
  const { id } = useParams<{ id: string }>()
  const events: CropEvent[] = [
    {
      id: "1",
      date: new Date(Date.now() - 86400000 * 7).toISOString(),
      type: "plant",
      label: "Plant",
      confidence: 0.9,
      status: "completed",
      influences: [{ icon: "rain", label: "Rainfall +20%" }],
      proof: {
        photo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/premium_photo-1666976506270-29610b4af0e1-aoZnJhZRRDcyjl0J5ykVkjLZpZsclw.avif",
        gps: { lat: 8.9, lng: 38.7 },
        verified: true,
        aiConfidence: 0.92,
      },
    },
    {
      id: "2",
      date: new Date(Date.now() - 86400000 * 2).toISOString(),
      type: "weed",
      label: "Weeding missed",
      confidence: 0.7,
      status: "missed",
      influences: [{ icon: "rain", label: "Unseasonal rain" }],
      proof: {
        photo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/premium_photo-1666976506270-29610b4af0e1-aoZnJhZRRDcyjl0J5ykVkjLZpZsclw.avif",
        gps: { lat: 8.91, lng: 38.71 },
        verified: false,
        aiConfidence: 0.4,
        flagReasons: ["Photo reused from 3 days ago", "GPS mismatch: 2.3km away"],
      },
    },
    {
      id: "3",
      date: new Date(Date.now() + 86400000 * 1).toISOString(),
      type: "irrigate",
      label: "Irrigate 15mm",
      confidence: 0.82,
      status: "approaching",
      influences: [{ icon: "soil", label: "SMI 18%" }],
    },
    {
      id: "4",
      date: new Date(Date.now() + 86400000 * 8).toISOString(),
      type: "harvest",
      label: "Harvest window",
      confidence: 0.73,
      status: "ontrack",
    },
  ]
  return (
    <main className="p-4 md:p-6">
      <Card>
        <CardHeader className="space-y-3">
          <div className="relative rounded-xl overflow-hidden border">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo-1549024449-d6968d2a435f-EtU1kptHTt5MgPueIMwkBGlnKw2V6D.avif"
              alt="Farm hero banner"
              className="h-48 w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-3 left-3 text-white">
              <div className="text-xs">Digital Farm Card</div>
              <div className="text-lg font-semibold">{id}</div>
            </div>
          </div>
          <CardTitle className="flex items-center justify-between">
            <span>Full Living Crop Calendar</span>
            <Badge variant="outline">Credits: 34</Badge>
          </CardTitle>
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <MapPin className="h-4 w-4" /> Oromia • Owner: Alemu • Zone: East Shewa
          </div>
        </CardHeader>
        <CardContent>
          <LivingCropCalendar events={events} showWhyPanel />
        </CardContent>
      </Card>
    </main>
  )
}
