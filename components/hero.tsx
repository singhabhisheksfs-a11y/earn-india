import Image from "next/image"
import { Sparkles, ShieldCheck, Zap, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const stats = [
  { value: "12k+", label: "Active gigs" },
  { value: "₹280", label: "Avg / hour" },
  { value: "48hr", label: "Fast payouts" },
]

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-flag-gradient opacity-[0.14]" />
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-24">
        <div className="flex flex-col items-start gap-6">
          <Badge
            variant="secondary"
            className="gap-1.5 rounded-full px-3 py-1 text-sm"
          >
            <Sparkles className="size-3.5 text-primary" />
            Built for students, 17–27
          </Badge>

          <h1 className="text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Flexible{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Part-Time Jobs
            </span>{" "}
            for Students
          </h1>

          <p className="max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            Pick shifts that fit around your classes. Get verified, build skill
            badges, and get paid fast — all in one place.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button size="lg" nativeButton={false} render={<a href="#browse-jobs" />}>
              Find gigs near you
              <ArrowRight data-icon="inline-end" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<a href="#verification" />}
            >
              How verification works
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-primary" /> Verified employers
            </span>
            <span className="text-border">•</span>
            <span className="inline-flex items-center gap-1.5">
              <Zap className="size-4 text-accent" /> Same-day slots
            </span>
          </div>

          <dl className="mt-2 grid w-full max-w-md grid-cols-3 gap-4 border-t border-border/70 pt-6">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-2xl font-bold text-foreground">
                  {s.value}
                </dd>
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="absolute -inset-3 -z-10 rounded-4xl bg-flag-gradient opacity-30 blur-2xl" />
          <div className="overflow-hidden rounded-3xl border border-border/70 shadow-xl">
            <Image
              src="/hero-students.png"
              alt="Young Indian students working flexible part-time gigs"
              width={720}
              height={720}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
