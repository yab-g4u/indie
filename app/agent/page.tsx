"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AgentHome() {
  return (
    <main className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-md">
        <h1 className="text-xl font-semibold">Welcome, Agent</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Brand-new workspace. Scan a Digital Farm ID to begin logging actions.
        </p>
        <div className="mt-4">
          <Link href="/agent/scan">
            <Button className="bg-[color:#0B6A46]">Scan Farm Card</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
