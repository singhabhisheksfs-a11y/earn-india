"use client"

import * as React from "react"
import {
  Star,
  IndianRupee,
  Clock,
  CalendarDays,
  CheckCircle2,
  CalendarClock,
} from "lucide-react"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty"
import { ReviewModal } from "@/components/review-modal"
import { completedShifts as initialShifts, type CompletedShift } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const upcoming = [
  {
    id: "u1",
    title: "Event Crew — College Fest",
    employer: "MITWPU",
    date: "Sat, 25 Apr · 4–8 PM",
    location: "Pune",
  },
  {
    id: "u2",
    title: "Barista — Weekend Rush",
    employer: "Brew House",
    date: "Sun, 26 Apr · 10 AM–2 PM",
    location: "Hyderabad",
  },
]

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={cn(
            "size-4",
            s <= rating ? "fill-accent text-accent" : "text-muted-foreground/30"
          )}
        />
      ))}
    </div>
  )
}

export function CompletedShifts() {
  const [shifts, setShifts] = React.useState<CompletedShift[]>(initialShifts)
  const [activeShift, setActiveShift] = React.useState<CompletedShift | null>(null)
  const [reviewOpen, setReviewOpen] = React.useState(false)

  function openReview(shift: CompletedShift) {
    setActiveShift(shift)
    setReviewOpen(true)
  }

  function handleReviewed(shiftId: string, rating: number) {
    setShifts((prev) =>
      prev.map((s) =>
        s.id === shiftId ? { ...s, rating, status: "reviewed" } : s
      )
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-display text-xl">My shifts</CardTitle>
        <CardDescription>
          Track upcoming bookings and review completed work.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="completed" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:w-auto">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="pt-4">
            <div className="flex flex-col gap-3">
              {upcoming.map((u) => (
                <div
                  key={u.id}
                  className="flex flex-col gap-2 rounded-2xl border border-border/70 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">{u.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {u.employer} · {u.location}
                    </span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="w-fit gap-1.5 rounded-full"
                  >
                    <CalendarClock className="size-3.5" />
                    {u.date}
                  </Badge>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="pt-4">
            {shifts.length === 0 ? (
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <CalendarDays />
                  </EmptyMedia>
                  <EmptyTitle>No completed shifts yet</EmptyTitle>
                  <EmptyDescription>
                    Book your first gig to start building history.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : (
              <div className="flex flex-col gap-3">
                {shifts.map((shift) => (
                  <div
                    key={shift.id}
                    className="flex flex-col gap-3 rounded-2xl border border-border/70 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{shift.title}</span>
                        <span className="text-sm text-muted-foreground">
                          · {shift.employer}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays className="size-4" />
                          {shift.date}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="size-4" />
                          {shift.hours}h
                        </span>
                        <span className="inline-flex items-center gap-1 font-medium text-foreground">
                          <IndianRupee className="size-4" />
                          {shift.earned.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {shift.status === "reviewed" && shift.rating ? (
                        <div className="flex items-center gap-2">
                          <Stars rating={shift.rating} />
                          <Badge
                            variant="secondary"
                            className="gap-1 rounded-full text-primary"
                          >
                            <CheckCircle2 className="size-3.5" />
                            Reviewed
                          </Badge>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openReview(shift)}
                        >
                          <Star data-icon="inline-start" />
                          Leave review
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>

      <ReviewModal
        shift={activeShift}
        open={reviewOpen}
        onOpenChange={setReviewOpen}
        onSubmitted={handleReviewed}
      />
    </Card>
  )
}
