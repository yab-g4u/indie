"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import React from "react"

const bg = "#F6F7F3"
export default function AgentLogin() {
  const [mode, setMode] = React.useState<"otp" | "pin">("otp")
  const [sent, setSent] = React.useState(false)
  const router = useRouter()

  return (
    <main className="min-h-screen grid place-items-center px-4" style={{ backgroundColor: bg }}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Agent Login</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex gap-2">
            <Button
              variant={mode === "otp" ? "default" : "outline"}
              onClick={() => setMode("otp")}
              className={mode === "otp" ? "bg-[color:#0B6A46]" : ""}
            >
              OTP
            </Button>
            <Button
              variant={mode === "pin" ? "default" : "outline"}
              onClick={() => setMode("pin")}
              className={mode === "pin" ? "bg-[color:#0B6A46]" : ""}
            >
              PIN
            </Button>
          </div>

          {mode === "otp" ? (
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault()
                if (!sent) setSent(true)
                else {
                  localStorage.setItem("agent-auth", "true")
                  router.push("/agent")
                }
              }}
            >
              {!sent ? (
                <>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+251 9..." required />
                  <Button type="submit" className="bg-[color:#0B6A46]">Send OTP</Button>
                </>
              ) : (
                <>
                  <Label htmlFor="otp">Enter OTP (try 123456)</Label>
                  <Input id="otp" inputMode="numeric" pattern="[0-9]*" required />
                  <Button type="submit" className="bg-[color:#0B6A46]">Verify</Button>
                </>
              )}
            </form>
          ) : (
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault()
                localStorage.setItem("agent-auth", "true")
                router.push("/agent")
              }}
            >
              <Label htmlFor="id">Agent ID</Label>
              <Input id="id" placeholder="AG-0001" required />
              <Label htmlFor="pin">PIN</Label>
              <Input id="pin" type="password" required />
              <Button className="bg-[color:#0B6A46]">Login</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
