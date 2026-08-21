import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { JobsExplorer } from "@/components/jobs-explorer"
import { ProfileSummary } from "@/components/profile-summary"
import { SkillBadges } from "@/components/skill-badges"
import { CompletedShifts } from "@/components/completed-shifts"
import { Logo } from "@/components/logo"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />

      <main className="flex-1">
        <Hero />

        <JobsExplorer />

        {/* Verification & gamified badges */}
        <section
          id="verification"
          className="scroll-mt-20 border-t border-border/70 bg-muted/30"
        >
          <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-col gap-2">
              <h2 className="font-display text-3xl font-bold tracking-tight">
                Your profile & badges
              </h2>
              <p className="text-muted-foreground">
                Get verified and climb the tiers to unlock priority booking.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_1.4fr]">
              <ProfileSummary />
              <SkillBadges />
            </div>
          </div>
        </section>

        {/* My shifts / reviews */}
        <section
          id="my-shifts"
          className="scroll-mt-20"
        >
          <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <CompletedShifts />
          </div>
        </section>
      </main>

      <footer className="border-t border-border/70 bg-background">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
          <Logo />
          <p className="text-sm text-muted-foreground">
            Made for India&apos;s students · Demo UI
          </p>
        </div>
      </footer>
    </div>
  )
}
