"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import jsQR from "jsqr"

const bg = "#F6F7F3"

export default function ScanPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)
  const [manual, setManual] = useState("")
  const router = useRouter()

  useEffect(() => {
    let stream: MediaStream | null = null
    let raf = 0
    ;(async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          await videoRef.current.play()
          setReady(true)
          const scan = () => {
            const video = videoRef.current!
            const canvas = canvasRef.current!
            if (!video || !canvas) return
            const w = (canvas.width = video.videoWidth)
            const h = (canvas.height = video.videoHeight)
            const ctx = canvas.getContext("2d")!
            ctx.drawImage(video, 0, 0, w, h)
            const img = ctx.getImageData(0, 0, w, h)
            const code = jsQR(img.data, img.width, img.height)
            if (code?.data) {
              router.push(`/agent/farm/${encodeURIComponent(code.data)}`)
              return
            }
            raf = requestAnimationFrame(scan)
          }
          raf = requestAnimationFrame(scan)
        }
      } catch {
        setReady(false)
      }
    })()
    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop())
      cancelAnimationFrame(raf)
    }
  }, [router])

  return (
    <main className="min-h-screen" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-md p-4">
        <div className="relative rounded-2xl overflow-hidden border bg-black aspect-[9/16]">
          <video ref={videoRef} className="h-full w-full object-cover" muted playsInline />
          <canvas ref={canvasRef} className="hidden" />
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <div className="h-40 w-40 rounded-md ring-4 ring-[color:#0B6A46]/80" />
          </div>
          {!ready && (
            <div className="absolute inset-0 grid place-items-center text-white">
              <div className="flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-md">
                Camera unavailable. Use manual entry.
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <Input placeholder="Enter Farm Card ID (e.g., IC-ETH-001)" value={manual} onChange={(e) => setManual(e.target.value)} />
          <Button className="bg-[color:#0B6A46]" onClick={() => manual && router.push(`/agent/farm/${manual}`)}>
            Go
          </Button>
        </div>
      </div>
    </main>
  )
}
