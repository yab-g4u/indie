"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function PilotSignup() {
  const [submitted, setSubmitted] = useState(false)
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Join the Pilot</CardTitle>
      </CardHeader>
      <CardContent>
        {!submitted ? (
          <form
            className="grid sm:grid-cols-2 gap-4"
            onSubmit={(e) => {
              e.preventDefault()
              setSubmitted(true)
            }}
          >
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your full name" required />
            </div>
            <div>
              <Label htmlFor="org">Organization</Label>
              <Input id="org" placeholder="Coop / NGO / Ministry" required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.org" required />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input id="country" placeholder="e.g., Ethiopia" required />
            </div>
            <div className="sm:col-span-2 flex justify-end">
              <Button className="bg-[color:#0B6A46] hover:bg-[color:#0B6A46]/90">Request Access</Button>
            </div>
          </form>
        ) : (
          <div className="text-sm text-muted-foreground">Thanks! We&apos;ll be in touch shortly.</div>
        )}
      </CardContent>
    </Card>
  )
}
