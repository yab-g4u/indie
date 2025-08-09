"use client"

import LivingCropCalendar, { type CropEvent } from "./living-crop-calendar"

export default function MiniCalendar() {
  const now = Date.now()
  const mini: CropEvent[] = [
    { id: "m1", date: new Date(now - 86400000).toISOString(), type: "irrigate", label: "Irrigate 10mm", confidence: 0.82, status: "completed" },
    { id: "m2", date: new Date(now + 86400000 * 2).toISOString(), type: "compost", label: "Compost", confidence: 0.78, status: "approaching" },
    { id: "m3", date: new Date(now + 86400000 * 7).toISOString(), type: "harvest", label: "Harvest", confidence: 0.7, status: "ontrack" },
  ]
  return <LivingCropCalendar events={mini} density="compact" />
}
