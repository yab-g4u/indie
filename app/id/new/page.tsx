"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function NewIdPage() {
  const router = useRouter()
  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Create Digital Farm ID</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="grid gap-3"
              onSubmit={(e) => {
                e.preventDefault()
                const fd = new FormData(e.currentTarget as HTMLFormElement)
                const id = (fd.get("id") as string) || ""
                const owner = (fd.get("owner") as string) || ""
                const zone = (fd.get("zone") as string) || ""
                const crop = (fd.get("crop") as string) || ""
                // Local bootstrap (can be replaced with Supabase)
                const rec = { id, owner, zone, crop }
                localStorage.setItem(`farm:${id}`, JSON.stringify(rec))
                router.push(`/id/${encodeURIComponent(id)}`)
              }}
            >
              <div>
                <Label htmlFor="id">ID</Label>
                <Input id="id" name="id" placeholder="IC-COUNTRY-0001" required />
              </div>
              <div>
                <Label htmlFor="owner">Owner</Label>
                <Input id="owner" name="owner" placeholder="Full name" required />
              </div>
              <div>
                <Label htmlFor="zone">Zone</Label>
                <Input id="zone" name="zone" placeholder="e.g., Oromia" required />
              </div>
              <div>
                <Label htmlFor="crop">Primary crop</Label>
                <Input id="crop" name="crop" placeholder="e.g., Maize" />
              </div>
              <div className="flex justify-end">
                <Button className="bg-[color:#0B6A46]">Create</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
