"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, X } from 'lucide-react'
import React from "react"

type Flagged = {
  id: string
  farmId: string
  reason: string
  details: string
  aiConfidence: number
}
const initialItems: Flagged[] = [
  { id: "f1", farmId: "IC-ETH-002", reason: "Photo reused", details: "Same hash as 3 days ago", aiConfidence: 0.88 },
  { id: "f2", farmId: "IC-ETH-004", reason: "GPS mismatch", details: "2.3km away", aiConfidence: 0.76 },
]

export default function VerificationQueue() {
  const [items, setItems] = React.useState(initialItems)

  const act = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id))

  return (
    <main className="p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Verification queue</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {items.map((it) => (
            <div key={it.id} className="grid grid-cols-1 md:grid-cols-6 gap-2 rounded-md border p-3 bg-white">
              <div className="md:col-span-2">
                <div className="font-medium">{it.farmId}</div>
                <div className="text-sm text-muted-foreground">{it.details}</div>
              </div>
              <div><Badge variant="destructive">{it.reason}</Badge></div>
              <div>AI {Math.round(it.aiConfidence * 100)}%</div>
              <div className="md:col-span-2 flex gap-2 justify-end">
                <Button variant="outline" onClick={() => act(it.id)}><X className="h-4 w-4 mr-1" /> Reject</Button>
                <Button className="bg-[color:#0B6A46]" onClick={() => act(it.id)}><Check className="h-4 w-4 mr-1" /> Approve</Button>
              </div>
            </div>
          ))}
          {!items.length && <div className="text-sm text-muted-foreground">All caught up.</div>}
        </CardContent>
      </Card>
    </main>
  )
}
