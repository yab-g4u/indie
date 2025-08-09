"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CloudRain, Droplets, Leaf, Info } from 'lucide-react'
import { cn } from "@/lib/utils"
import React from "react"

export default function WhyPanel({ className }: { className?: string }) {
  // Mocked "why" signals; can be replaced by /api/why later.
  const [data, setData] = React.useState({
    rainfallTrend: 0.72,
    soilMoistureIndex: 0.34,
    indigenousCueAgreement: 0.8,
    narrative:
      "Recommendation prioritizes irrigation due to a 5‑day dry spell forecast and low soil moisture. Indigenous wind cues agree with timing.",
    modelConfidence: 0.84,
  })

  return (
    <Card className={cn("bg-white p-4", className)}>
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Why this recommendation?</div>
        <Badge variant="outline" className="border-[color:#0B6A46] text-[color:#0B6A46]">
          AI {Math.round(data.modelConfidence * 100)}%
        </Badge>
      </div>
      <div className="mt-3 grid sm:grid-cols-3 gap-4">
        <Signal label="Rainfall trend" icon={<CloudRain className="h-4 w-4" />} value={data.rainfallTrend} />
        <Signal label="Soil moisture index" icon={<Droplets className="h-4 w-4" />} value={data.soilMoistureIndex} />
        <Signal label="Indigenous cues" icon={<Leaf className="h-4 w-4" />} value={data.indigenousCueAgreement} />
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{data.narrative}</p>
      <div className="mt-3 text-xs text-muted-foreground flex items-center gap-2">
        <Info className="h-3.5 w-3.5" />
        This panel can be powered by an AI endpoint (e.g., Vercel AI SDK) when keys are configured. 
      </div>
    </Card>
  )
}

function Signal({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="inline-flex items-center gap-2 text-muted-foreground">{icon}{label}</span>
        <span className="font-medium">{Math.round(value * 100)}%</span>
      </div>
      <Progress value={Math.round(value * 100)} className="mt-2" />
    </div>
  )
}
