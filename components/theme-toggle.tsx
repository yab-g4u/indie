"use client"

import { Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"
  return (
    <Button
      variant="outline"
      size="icon"
      className={className}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle dark mode"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  )
}
