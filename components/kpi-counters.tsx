"use client"

import React from "react"

const primary = "#0B6A46"
const accent = "#D98C2B"

export function KpiCounters() {
  const targets = [
    { label: "Hectares protected", value: 32780, color: primary },
    { label: "Actions verified", value: 128904, color: primary },
    { label: "Credits issued", value: 45210, color: accent },
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {targets.map((t, i) => (
        <Counter key={i} label={t.label} end={t.value} color={t.color} />
      ))}
    </div>
  )
}

function Counter({ label, end, color }: { label: string; end: number; color: string }) {
  const [val, setVal] = React.useState(0)
  React.useEffect(() => {
    let raf: number
    const start = performance.now()
    const duration = 1200
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      setVal(Math.floor(end * (0.2 + 0.8 * easeOutCubic(p))))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [end])
  return (
    <div className="rounded-xl border bg-white p-5">
      <div className="text-3xl font-bold" style={{ color }}>{val.toLocaleString()}</div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  )
}

function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3)
}
