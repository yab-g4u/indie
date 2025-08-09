"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function RewardsPage() {
  const pool = { used: 45210, total: 100000 }
  const pct = Math.round((pool.used / pool.total) * 100)
  return (
    <main className="p-4 md:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Credit pool</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={pct} />
            <div className="mt-2 text-sm text-muted-foreground">
              {pool.used.toLocaleString()} / {pool.total.toLocaleString()} credits issued ({pct}%)
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Redemptions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm">
              {[
                { id: "R-001", farm: "IC-ETH-001", item: "Irrigation hose", credits: 120 },
                { id: "R-002", farm: "IC-ETH-004", item: "Compost kit", credits: 90 },
              ].map((r) => (
                <li key={r.id} className="border-t first:border-t-0 py-2">
                  {r.id} • {r.farm} • {r.item} • {r.credits} cr
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
