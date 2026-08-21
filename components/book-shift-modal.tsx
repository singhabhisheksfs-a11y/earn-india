"use client"

import * as React from "react"
import { CalendarClock, Check, MapPin, IndianRupee } from "lucide-react"
import { toast } from "sonner"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { type Job, weekDays, timeSlots, slotAvailability } from "@/lib/mock-data"

type SlotKey = `${number}-${number}`

export function BookShiftModal({
  job,
  open,
  onOpenChange,
}: {
  job: Job | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [selected, setSelected] = React.useState<Set<SlotKey>>(new Set())

  // Reset selection whenever a new job is opened.
  React.useEffect(() => {
    if (open) setSelected(new Set())
  }, [open, job?.id])

  if (!job) return null

  function toggle(day: number, slot: number) {
    const key: SlotKey = `${day}-${slot}`
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  const count = selected.size
  const estimated = count * 2 * job.payPerHour // each slot ~2 hours

  function confirm() {
    toast.success(`Shift request sent to ${job?.employer}!`, {
      description: `${count} slot${count > 1 ? "s" : ""} requested • est. ₹${estimated.toLocaleString("en-IN")}`,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-xl">
            <CalendarClock className="size-5 text-primary" />
            Book a shift
          </DialogTitle>
          <DialogDescription>
            <span className="font-medium text-foreground">{job.title}</span> ·{" "}
            {job.employer}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-4" /> {job.location}
          </span>
          <span className="inline-flex items-center gap-1">
            <IndianRupee className="size-4" />
            {job.payPerHour}/hr
          </span>
          <Badge variant="secondary" className="rounded-full">
            {job.slotsLeft} slots left
          </Badge>
        </div>

        <div className="mt-1 overflow-x-auto">
          <div className="min-w-[560px]">
            {/* Header row: time labels */}
            <div className="grid grid-cols-[64px_repeat(7,1fr)] gap-1.5">
              <div />
              {weekDays.map((d) => (
                <div
                  key={d}
                  className="pb-1 text-center text-xs font-semibold text-muted-foreground"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* One row per time slot */}
            <div className="flex flex-col gap-1.5">
              {timeSlots.map((time, slotIdx) => (
                <div
                  key={time}
                  className="grid grid-cols-[64px_repeat(7,1fr)] items-center gap-1.5"
                >
                  <div className="text-right text-xs font-medium text-muted-foreground">
                    {time}
                  </div>
                  {weekDays.map((_, dayIdx) => {
                    const available = slotAvailability(dayIdx, slotIdx)
                    const key: SlotKey = `${dayIdx}-${slotIdx}`
                    const isSelected = selected.has(key)
                    return (
                      <button
                        key={key}
                        type="button"
                        disabled={!available}
                        aria-pressed={isSelected}
                        aria-label={`${weekDays[dayIdx]} ${time} ${available ? "available" : "unavailable"}`}
                        onClick={() => toggle(dayIdx, slotIdx)}
                        className={cn(
                          "flex h-9 items-center justify-center rounded-lg border text-xs font-medium transition-all",
                          !available &&
                            "cursor-not-allowed border-transparent bg-muted/60 text-muted-foreground/40",
                          available &&
                            !isSelected &&
                            "border-border bg-secondary/40 text-foreground hover:border-primary/50 hover:bg-secondary",
                          isSelected &&
                            "border-primary bg-primary text-primary-foreground shadow-sm"
                        )}
                      >
                        {isSelected ? <Check className="size-4" /> : available ? "Open" : "—"}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm">
            {count === 0 ? (
              <span className="text-muted-foreground">
                Select the hourly slots you can work.
              </span>
            ) : (
              <span className="text-foreground">
                <span className="font-semibold">{count}</span> slot
                {count > 1 ? "s" : ""} · est.{" "}
                <span className="font-semibold text-primary">
                  ₹{estimated.toLocaleString("en-IN")}
                </span>
              </span>
            )}
          </div>
          <Button disabled={count === 0} onClick={confirm}>
            Request booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
