import { Award, Lock, Check, Medal, Crown, Trophy, Sparkles } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { skillBadges, userProfile, type BadgeTier } from "@/lib/mock-data"

const tierIcon: Record<BadgeTier, LucideIcon> = {
  bronze: Medal,
  silver: Award,
  gold: Trophy,
  pro: Crown,
}

// tier visual accent using themed tokens
const tierStyles: Record<
  BadgeTier,
  { ring: string; chip: string; icon: string }
> = {
  bronze: {
    ring: "border-bronze/40",
    chip: "bg-bronze/15 text-bronze",
    icon: "bg-bronze/15 text-bronze",
  },
  silver: {
    ring: "border-silver/50",
    chip: "bg-silver/20 text-silver-foreground",
    icon: "bg-silver/25 text-silver-foreground",
  },
  gold: {
    ring: "border-gold/50",
    chip: "bg-gold/20 text-gold-foreground",
    icon: "bg-gold/25 text-gold-foreground",
  },
  pro: {
    ring: "border-primary/50",
    chip: "bg-primary/15 text-primary",
    icon: "bg-primary/15 text-primary",
  },
}

const tierOrder: BadgeTier[] = ["bronze", "silver", "gold", "pro"]

export function SkillBadges() {
  const currentIndex = tierOrder.indexOf(userProfile.currentTier)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-display text-xl">
          <Sparkles className="size-5 text-accent" />
          Skill badges
        </CardTitle>
        <CardDescription>
          Complete shifts to level up. Higher tiers unlock real perks with
          employers.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        {skillBadges.map((badge) => {
          const idx = tierOrder.indexOf(badge.tier)
          const earned = idx <= currentIndex
          const isCurrent = badge.tier === userProfile.currentTier
          const Icon = tierIcon[badge.tier]
          const styles = tierStyles[badge.tier]

          return (
            <div
              key={badge.tier}
              className={cn(
                "relative flex flex-col gap-3 rounded-2xl border-2 bg-card p-4 transition-all",
                earned ? styles.ring : "border-border/70 opacity-70",
                isCurrent && "ring-2 ring-primary/40"
              )}
            >
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    "flex size-11 items-center justify-center rounded-xl",
                    earned ? styles.icon : "bg-muted text-muted-foreground"
                  )}
                >
                  <Icon className="size-6" />
                </div>
                {earned ? (
                  <Badge className={cn("gap-1 rounded-full", styles.chip)}>
                    <Check className="size-3.5" />
                    Unlocked
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="gap-1 rounded-full text-muted-foreground"
                  >
                    <Lock className="size-3.5" />
                    Locked
                  </Badge>
                )}
              </div>

              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-display text-base font-bold">
                    {badge.label}
                  </span>
                  {isCurrent && (
                    <Badge variant="secondary" className="rounded-full text-xs">
                      You&apos;re here
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  {badge.shiftsRequired === 0
                    ? "Available from day one"
                    : `${badge.shiftsRequired}+ shifts`}
                </span>
              </div>

              <p className="text-sm text-muted-foreground">{badge.benefit}</p>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
