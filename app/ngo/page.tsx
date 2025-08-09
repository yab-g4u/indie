"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { Download, Leaf } from 'lucide-react'
import AiCalendarPanel from "@/components/sections/ai-calendar-panel"
import dynamic from "next/dynamic"

// Fix SSR "window is not defined": load Leaflet map on client only
const LeafletMap = dynamic(() => import("@/components/ngo/leaflet-map"), { ssr: false })

export default function NgoOverview() {
  return (
    <main className="p-4 md:p-6">
      <div className="flex items-center justify-end mb-2">
        <ThemeToggle />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>CropPulse health map</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href="/ngo/reports">
                <Download className="h-4 w-4 mr-1" /> Export donor report
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <LeafletMap />
            <div className="mt-2 text-xs text-muted-foreground">
              No farms yet. Create Digital Farm IDs to see markers here.
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-[color:#0B6A46]" /> KPI bar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <KpiRow label="Actions logged" value={0} />
            <KpiRow label="Verified %" value={"0%"} />
            <KpiRow label="Credits issued" value={0} />
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Farm list</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border bg-muted/30 p-6 text-sm text-muted-foreground">
              No farms yet. Once agents register farmers and create Digital IDs, they will appear here.
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Living Crop Calendar (AI)</CardTitle>
          </CardHeader>
          <CardContent>
            <AiCalendarPanel />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

function KpiRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-muted-foreground">{label}</div>
      <Badge variant="outline" className="border-[color:#0B6A46] text-[color:#0B6A46]">
        {typeof value === "number" ? value.toLocaleString() : value}
      </Badge>
    </div>
  )
}
