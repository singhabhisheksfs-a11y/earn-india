"use client"

import * as React from "react"
import { Star, Clock, Gauge } from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { cn } from "@/lib/utils"
import type { CompletedShift } from "@/lib/mock-data"

function StarRating({
  value,
  onChange,
  label,
  icon: Icon,
}: {
  value: number
  onChange: (v: number) => void
  label: string
  icon: React.ElementType
}) {
  const [hover, setHover] = React.useState(0)
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="inline-flex items-center gap-2 text-sm font-medium">
        <Icon className="size-4 text-muted-foreground" />
        {label}
      </span>
      <div className="flex items-center gap-1" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((star) => {
          const active = star <= (hover || value)
          return (
            <button
              key={star}
              type="button"
              aria-label={`${star} star${star > 1 ? "s" : ""}`}
              onMouseEnter={() => setHover(star)}
              onClick={() => onChange(star)}
              className="rounded-md p-0.5 transition-transform hover:scale-110"
            >
              <Star
                className={cn(
                  "size-6 transition-colors",
                  active
                    ? "fill-accent text-accent"
                    : "text-muted-foreground/40"
                )}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function ReviewModal({
  shift,
  open,
  onOpenChange,
  onSubmitted,
}: {
  shift: CompletedShift | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmitted: (shiftId: string, rating: number) => void
}) {
  const [punctuality, setPunctuality] = React.useState(0)
  const [performance, setPerformance] = React.useState(0)

  React.useEffect(() => {
    if (open) {
      setPunctuality(0)
      setPerformance(0)
    }
  }, [open, shift?.id])

  if (!shift) return null

  const canSubmit = punctuality > 0 && performance > 0

  function submit() {
    const avg = Math.round((punctuality + performance) / 2)
    onSubmitted(shift!.id, avg)
    toast.success("Review submitted!", {
      description: `You rated ${shift!.title} · ${avg}/5 stars.`,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            Rate this shift
          </DialogTitle>
          <DialogDescription>
            How did{" "}
            <span className="font-medium text-foreground">{shift.title}</span> go
            at {shift.employer}?
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5 py-2">
          <StarRating
            label="Punctuality"
            icon={Clock}
            value={punctuality}
            onChange={setPunctuality}
          />
          <StarRating
            label="Performance"
            icon={Gauge}
            value={performance}
            onChange={setPerformance}
          />

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="review-note">Add a note (optional)</FieldLabel>
              <Textarea
                id="review-note"
                placeholder="Great attitude, arrived early, handled the rush well…"
                rows={3}
              />
            </Field>
          </FieldGroup>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Skip
          </Button>
          <Button disabled={!canSubmit} onClick={submit}>
            Submit review
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
