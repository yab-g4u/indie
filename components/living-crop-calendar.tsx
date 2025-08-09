"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { CheckCircle2, Clock, CloudRain, Droplets, Leaf, Recycle, Sprout, Tractor, AlertCircle, Sun } from 'lucide-react'
import React from "react"
import WhyPanel from "./why-panel"

type Influence = { icon: "rain" | "soil" | "indigenous" | "sun"; label: string }
type Proof = {
  photo?: string
  gps?: { lat: number; lng: number }
  verified?: boolean
  aiConfidence?: number
  flagReasons?: string[]
}
export type CropEvent = {
  id: string
  date: string
  type: "plant" | "irrigate" | "harvest" | "compost" | "weed"
  label: string
  confidence: number
  status: "ontrack" | "approaching" | "missed" | "completed"
  influences?: Influence[]
  proof?: Proof
}
export default function LivingCropCalendar({
  events,
  className,
  density = "comfortable",
  showWhyPanel = false,
}: {
  events: CropEvent[]
  className?: string
  density?: "compact" | "comfortable"
  showWhyPanel?: boolean
}) {
  const isMobile = useIsMobile()
  const [selected, setSelected] = React.useState<CropEvent | null>(null)

  const NodeIcon = (t: CropEvent["type"]) =>
    t === "plant"
      ? Sprout
      : t === "irrigate"
      ? Droplets
      : t === "harvest"
      ? Tractor
      : t === "compost"
      ? Recycle
      : Leaf

  const ringClass = (status: CropEvent["status"]) =>
    status === "ontrack"
      ? "ring-[color:#0B6A46]"
      : status === "approaching"
      ? "ring-[color:#D98C2B] animate-pulse"
      : status === "missed"
      ? "ring-red-500 animate-[pulse_2s_ease-in-out_infinite]"
      : "ring-muted-foreground"

  const sorted = React.useMemo(
    () =>
      [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    [events]
  )

  const content = (
    <div className={cn("w-full", className)}>
      <div className="px-4 pt-4">
        <div className="flex items-center gap-4 text-xs">
          <Legend color="#0B6A46" label="On track" />
          <Legend color="#D98C2B" label="Approaching" />
          <Legend color="#ef4444" label="Missed" />
          <Legend color="#6b7280" label="Completed" />
        </div>
      </div>
      <Separator className="my-3" />
      <ScrollArea className="w-full">
        <div className={cn("flex gap-6 px-4 py-3", density === "compact" ? "gap-4" : "gap-6")}>
          {sorted.map((ev) => {
            const Icon = NodeIcon(ev.type)
            const date = new Date(ev.date)
            const dateLabel = date.toLocaleDateString()
            const isPast = date.getTime() < Date.now()
            return (
              <button
                key={ev.id}
                onClick={() => setSelected(ev)}
                className="group relative flex min-w-[220px] flex-col items-start rounded-lg border bg-white p-3 text-left hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:#0B6A46]"
                aria-label={`${ev.label} on ${dateLabel}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "grid size-10 place-items-center rounded-full ring-4",
                      ringClass(ev.status)
                    )}
                  >
                    <Icon className="h-5 w-5 text-[color:#0B6A46]" />
                  </div>
                  <div>
                    <div className="font-medium">{ev.label}</div>
                    <div className="text-xs text-muted-foreground">{dateLabel}</div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Badge variant="outline" className="border-[color:#0B6A46] text-[color:#0B6A46]">
                    AI {Math.round(ev.confidence * 100)}%
                  </Badge>
                  {ev.status === "missed" ? (
                    <Badge variant="outline" className="border-red-500 text-red-600">
                      Missed
                    </Badge>
                  ) : isPast ? (
                    <Badge variant="secondary">Past</Badge>
                  ) : null}
                </div>
                {!!ev.influences?.length && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {ev.influences.slice(0, 3).map((inf, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 rounded-md border bg-muted/40 px-2 py-1 text-xs"
                      >
                        {inf.icon === "rain" ? (
                          <CloudRain className="h-3.5 w-3.5 text-[color:#0B6A46]" />
                        ) : inf.icon === "soil" ? (
                          <Droplets className="h-3.5 w-3.5 text-[color:#0B6A46]" />
                        ) : inf.icon === "sun" ? (
                          <Sun className="h-3.5 w-3.5 text-[color:#0B6A46]" />
                        ) : (
                          <Leaf className="h-3.5 w-3.5 text-[color:#0B6A46]" />
                        )}
                        {inf.label}
                      </span>
                    ))}
                  </div>
                )}
              </button>
            )
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      {showWhyPanel && <WhyPanel className="mt-4" />}
    </div>
  )

  if (isMobile) {
    return (
      <>
        {content}
        <Drawer open={!!selected} onOpenChange={() => setSelected(null)}>
          <DrawerContent className="max-h-[85vh]">
            <DrawerHeader>
              <DrawerTitle>Action details</DrawerTitle>
            </DrawerHeader>
            {selected && <EventDetails event={selected} />}
          </DrawerContent>
        </Drawer>
      </>
    )
  }
  return (
    <>
      {content}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Action details</DialogTitle>
          </DialogHeader>
          {selected && <EventDetails event={selected} />}
        </DialogContent>
      </Dialog>
    </>
  )
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="inline-block size-3 rounded-full ring-4" style={{ backgroundColor: color, boxShadow: `0 0 0 2px ${color} inset` }} />
      <span className="text-xs text-muted-foreground">{label}</span>
    </span>
  )
}

function EventDetails({ event }: { event: CropEvent }) {
  const Icon =
    event.type === "plant" ? Sprout : event.type === "irrigate" ? Droplets : event.type === "harvest" ? Tractor : event.type === "compost" ? Recycle : Leaf

  return (
    <div className="px-1 pb-4">
      <div className="flex items-start gap-3">
        <div className={cn("grid size-12 place-items-center rounded-full ring-4", 
          event.status === "ontrack"
            ? "ring-[color:#0B6A46]"
            : event.status === "approaching"
            ? "ring-[color:#D98C2B]"
            : event.status === "missed"
            ? "ring-red-500"
            : "ring-muted-foreground"
        )}>
          <Icon className="h-6 w-6 text-[color:#0B6A46]" />
        </div>
        <div>
          <div className="text-lg font-semibold">{event.label}</div>
          <div className="text-sm text-muted-foreground">
            {new Date(event.date).toLocaleString()} • AI {Math.round(event.confidence * 100)}%
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {event.influences?.map((inf, i) => (
              <Badge key={i} variant="secondary" className="gap-1">
                {inf.icon === "rain" ? (
                  <CloudRain className="h-3.5 w-3.5" />
                ) : inf.icon === "soil" ? (
                  <Droplets className="h-3.5 w-3.5" />
                ) : inf.icon === "sun" ? (
                  <Sun className="h-3.5 w-3.5" />
                ) : (
                  <Leaf className="h-3.5 w-3.5" />
                )}
                {inf.label}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <Tabs defaultValue="why" className="mt-4">
        <TabsList>
          <TabsTrigger value="why">Why</TabsTrigger>
          <TabsTrigger value="proof" disabled={!event.proof}>Proof</TabsTrigger>
        </TabsList>
        <TabsContent value="why" className="mt-3">
          <WhyPanel />
        </TabsContent>
        <TabsContent value="proof" className="mt-3">
          {!event.proof ? (
            <div className="text-sm text-muted-foreground">No proof for this action.</div>
          ) : (
            <div className="space-y-3">
              {event.proof.photo && (
                <img
                  src={event.proof.photo || "/placeholder.svg"}
                  alt="Proof photo"
                  className="w-full h-48 object-cover rounded-md border"
                  loading="lazy"
                />
              )}
              <div className="text-sm text-muted-foreground">
                GPS: {event.proof.gps?.lat?.toFixed(4)}, {event.proof.gps?.lng?.toFixed(4)}
              </div>
              <div className="flex items-center gap-2 text-sm">
                {event.proof.verified ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-[color:#0B6A46]" />
                    Verified • AI {Math.round((event.proof.aiConfidence ?? 0) * 100)}%
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    Flagged • AI {Math.round((event.proof.aiConfidence ?? 0) * 100)}%
                  </>
                )}
              </div>
              {!!event.proof.flagReasons?.length && (
                <ul className="list-disc pl-5 text-sm">
                  {event.proof.flagReasons.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
