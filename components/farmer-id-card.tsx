"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useMemo, useState } from "react"

// Avoid SSR window errors: import qrcode only on the client inside useEffect
export function FarmerIdCard({
  id,
  owner,
  zone,
  crop,
}: {
  id: string
  owner: string
  zone: string
  crop?: string
}) {
  const [url, setUrl] = useState<string>("")
  const qrText = useMemo(() => `/agent/farm/${encodeURIComponent(id)}`, [id])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const QR = await import("qrcode")
        const dataUrl = await QR.toDataURL(qrText, { width: 220, margin: 1 })
        if (mounted) setUrl(dataUrl)
      } catch {
        // noop
      }
    })()
    return () => {
      mounted = false
    }
  }, [qrText])

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-4 items-center">
          <div>
            <div className="text-xs text-muted-foreground">Digital Farm ID</div>
            <div className="text-lg font-semibold">{id}</div>
            <div className="mt-2 text-sm">
              Owner: <span className="font-medium">{owner}</span>
            </div>
            <div className="text-sm">
              Zone: <span className="font-medium">{zone}</span>
            </div>
            {crop && (
              <div className="text-sm">
                Primary crop: <span className="font-medium">{crop}</span>
              </div>
            )}
            <div className="mt-2">
              <Badge variant="outline" className="border-[color:#0B6A46] text-[color:#0B6A46]">
                Verifiable
              </Badge>
            </div>
          </div>
          <div className="justify-self-end">
            {url ? (
              <img src={url || "/placeholder.svg"} alt="Farm QR" className="h-40 w-40 rounded-md border bg-white" />
            ) : (
              <div className="h-40 w-40 rounded-md border bg-muted" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
