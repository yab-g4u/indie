"use client"

import { Card, CardContent } from "@/components/ui/card"

export function DigitalFarmCardBanner({ id, imageUrl }: { id: string; imageUrl: string }) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="relative h-40 w-full overflow-hidden rounded-md">
          <img src={imageUrl || "/placeholder.svg"} alt="Farm banner" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-2 left-3 text-white">
            <div className="text-xs opacity-90">Digital Farm Card</div>
            <div className="font-semibold">{id}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
