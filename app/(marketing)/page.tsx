import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from 'lucide-react'
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import PWARegister from "@/components/pwa-register"
import AiCalendarPanel from "@/components/sections/ai-calendar-panel"

export default function MarketingPage() {
  return (
    <main className="min-h-screen w-full">
      <PWARegister />
      <div className="fixed right-4 top-4 z-20">
        <ThemeToggle />
      </div>

      <HeroCinematic />

      <section id="about" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">About IndieCrop</h2>
        <p className="mt-3 text-muted-foreground max-w-3xl">
          IndieCrop empowers climate-smart agriculture with AI insights, real-time data, and verifiable proof of action.
          Each farm receives a Digital Farm Card that persists across seasons and organizations, enabling transparent
          monitoring and rewards.
        </p>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {[
            { title: "Digital Farm Card", desc: "One verifiable profile per farm with history and rewards." },
            { title: "Living Crop Calendar™", desc: "AI-driven tasks that adapt weekly to climate signals." },
            { title: "Offline-first PWA", desc: "Works in low connectivity with sync queues and caching." },
          ].map((s) => (
            <div key={s.title} className="rounded-xl border p-5 bg-card">
              <div className="font-semibold">{s.title}</div>
              <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Services</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {[
            {
              title: "Agent App",
              desc: "Scan farm QR IDs, capture photo+GPS proof, log actions offline.",
              href: "/agent",
            },
            {
              title: "NGO Dashboard",
              desc: "Map farms, monitor health, verify logs, manage rewards, export reports.",
              href: "/ngo",
            },
            {
              title: "Admin",
              desc: "Onboarding, user management, crop/action settings, rewards catalog.",
              href: "/admin",
            },
          ].map((s) => (
            <div key={s.title} className="rounded-xl border p-5 bg-card">
              <div className="font-semibold">{s.title}</div>
              <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
              <div className="mt-3">
                <Link href={s.href}>
                  <Button variant="outline">Open</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="calendar" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          The Living Crop Calendar<span className="text-[color:#D98C2B]">™</span>
        </h2>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Enter your crop and location to generate a personalized, AI-driven plan powered by the Vercel AI SDK.
        </p>
        <div className="mt-6 rounded-xl border bg-card p-4">
          <Badge className="bg-[color:#0B6A46] hover:bg-[color:#0B6A46]">AI Powered</Badge>
          <div className="mt-4">
            <AiCalendarPanel />
          </div>
        </div>
      </section>

      <footer className="border-t mt-20">
        <div className="mx-auto max-w-6xl px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} IndieCrop</p>
          <div className="flex items-center gap-3">
            <Link href="/agent" className="text-sm text-[color:#0B6A46] hover:underline">
              Agent App
            </Link>
            <Link href="/ngo" className="text-sm text-[color:#0B6A46] hover:underline">
              NGO/Ministry Dashboard
            </Link>
            <Link href="/admin" className="text-sm text-[color:#0B6A46] hover:underline">
              Admin
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}

function HeroCinematic() {
  return (
    <section
      className="relative min-h-[70vh] md:min-h-[80vh] grid"
      style={{
        backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo-1549024449-d6968d2a435f-EtU1kptHTt5MgPueIMwkBGlnKw2V6D.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      aria-label="Cinematic farm hero"
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 mx-auto max-w-6xl w-full px-4 py-20 md:py-28 grid md:grid-cols-2 items-center gap-8">
        <div className="text-white">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs">
            <span>Climate‑Smart</span>
            <span>AI‑Powered</span>
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold leading-tight">
            Plant Smart. Prove It. Earn Resilience.
          </h1>
          <p className="mt-4 text-lg text-white/90">
            A minimal, modern platform for resilient farming—Digital Farm Cards, AI recommendations, verifiable proof,
            and rewards in one place.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/id/new">
              <Button className="bg-[color:#0B6A46] hover:bg-[color:#0B6A46]/90">
                Create Digital Farm ID <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#calendar">
              <Button variant="secondary">Try Crop Calendar</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
