"use client"

import { notFound, useParams } from "next/navigation"
import { FarmerIdCard } from "@/components/farmer-id-card"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ViewIdPage() {
  const { id } = useParams<{ id: string }>()
  const raw = typeof window !== "undefined" ? localStorage.getItem(`farm:${id}`) : null
  const rec = raw ? (JSON.parse(raw) as { id: string; owner: string; zone: string; crop?: string }) : null
  if (!rec) {
    return (
      <main className="min-h-screen px-4 py-10">
        <div className="mx-auto max-w-md">
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground">This ID was not found. Create one now.</div>
              <div className="mt-3">
                <Link href="/id/new"><Button>Create ID</Button></Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }
  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto max-w-xl space-y-4">
        <FarmerIdCard id={rec.id} owner={rec.owner} zone={rec.zone} crop={rec.crop} />
        <div className="flex gap-2">
          <Link href={`/agent/farm/${encodeURIComponent(rec.id)}`}><Button className="bg-[color:#0B6A46]">Open in Agent App</Button></Link>
          <Link href="/ngo"><Button variant="outline">Open NGO Dashboard</Button></Link>
        </div>
      </div>
    </main>
  )
}
