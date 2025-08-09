"use client"

type LogItem = { type: string; farmId: string; notes?: string; date: string }
const KEY = "ic-offline-queue"

export function getQueue(): LogItem[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]")
  } catch {
    return []
  }
}

export async function addToOfflineQueue(item: LogItem) {
  const q = getQueue()
  q.push(item)
  localStorage.setItem(KEY, JSON.stringify(q))
}

export function isOnline() {
  return typeof navigator !== "undefined" ? navigator.onLine : true
}

export async function trySync() {
  if (!isOnline()) return { synced: 0 }
  const q = getQueue()
  let synced = 0
  for (const item of q) {
    try {
      await fetch("/api/log", {
        method: "POST",
        body: JSON.stringify(item),
        headers: { "Content-Type": "application/json" },
      })
      synced++
    } catch {
      // keep in queue
    }
  }
  const remaining = q.length - synced
  localStorage.setItem(KEY, JSON.stringify(q.slice(synced)))
  return { synced, remaining }
}
