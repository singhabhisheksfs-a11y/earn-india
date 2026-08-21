import { ShieldCheck, CheckCircle2, Circle, TrendingUp, Wallet, CalendarCheck } from "lucide-react"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { userProfile, skillBadges } from "@/lib/mock-data"

export function ProfileSummary() {
  const tier = skillBadges.find((b) => b.tier === userProfile.currentTier)
  const initials = userProfile.name
    .split(" ")
    .map((n) => n[0])
    .join("")

  const stats = [
    {
      icon: CalendarCheck,
      label: "Shifts done",
      value: userProfile.completedShifts,
    },
    {
      icon: Wallet,
      label: "Total earned",
      value: `₹${userProfile.totalEarned.toLocaleString("en-IN")}`,
    },
    {
      icon: TrendingUp,
      label: "Trust score",
      value: `${userProfile.trustScore}%`,
    },
  ]

  return (
    <Card className="overflow-hidden">
      <CardHeader className="gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="size-14 border-2 border-primary/30">
            <AvatarFallback className="bg-secondary font-display text-lg font-bold text-secondary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <CardTitle className="font-display text-xl">
              {userProfile.name}
            </CardTitle>
            <CardDescription>{userProfile.handle}</CardDescription>
          </div>
          <Badge className="ml-auto gap-1 rounded-full bg-primary/10 text-primary">
            <ShieldCheck className="size-3.5" />
            {tier?.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        <div className="grid grid-cols-3 gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-1 rounded-xl bg-muted/60 p-3"
            >
              <s.icon className="size-4 text-primary" />
              <span className="font-display text-lg font-bold leading-none">
                {s.value}
              </span>
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Trust rating</span>
            <span className="text-muted-foreground">
              {userProfile.trustScore}/100
            </span>
          </div>
          <Progress value={userProfile.trustScore} />
        </div>

        <Separator />

        <div className="flex flex-col gap-2.5">
          <span className="text-sm font-semibold">Verification status</span>
          {userProfile.verificationSteps.map((step) => (
            <div
              key={step.id}
              className="flex items-center gap-2 text-sm"
            >
              {step.done ? (
                <CheckCircle2 className="size-4 text-primary" />
              ) : (
                <Circle className="size-4 text-muted-foreground/50" />
              )}
              <span
                className={
                  step.done ? "text-foreground" : "text-muted-foreground"
                }
              >
                {step.label}
              </span>
              {!step.done && (
                <Badge
                  variant="outline"
                  className="ml-auto rounded-full text-xs font-normal"
                >
                  Pending
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
