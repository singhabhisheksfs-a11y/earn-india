"use client"

import { BadgeCheck, MapPin, Star, IndianRupee, Flame } from "lucide-react"

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { categories, type Job } from "@/lib/mock-data"

export function JobCard({
  job,
  onBook,
}: {
  job: Job
  onBook: (job: Job) => void
}) {
  const category = categories.find((c) => c.id === job.categoryId)
  const CategoryIcon = category?.icon

  return (
    <Card className="group relative flex flex-col gap-0 overflow-hidden transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg">
      <CardHeader className="gap-2">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="secondary" className="gap-1 rounded-full">
            {CategoryIcon && <CategoryIcon className="size-3.5" />}
            {category?.label}
          </Badge>
          {job.urgent && (
            <Badge className="gap-1 rounded-full bg-accent text-accent-foreground">
              <Flame className="size-3.5" />
              Urgent
            </Badge>
          )}
        </div>

        <CardTitle className="text-pretty font-display text-lg leading-snug">
          {job.title}
        </CardTitle>

        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{job.employer}</span>
          {job.employerVerified && (
            <BadgeCheck className="size-4 text-primary" aria-label="Verified employer" />
          )}
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-4" />
            {job.location}
          </span>
          <span className="inline-flex items-center gap-1">
            <Star className="size-4 fill-accent text-accent" />
            <span className="font-medium text-foreground">{job.rating}</span> (
            {job.reviews})
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {job.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="rounded-full font-normal">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="mt-auto items-center justify-between border-t border-border/70 pt-4">
        <div className="flex flex-col">
          <span className="inline-flex items-center font-display text-xl font-bold">
            <IndianRupee className="size-4" />
            {job.payPerHour}
            <span className="ml-1 text-sm font-normal text-muted-foreground">
              /hr
            </span>
          </span>
          <span className="text-xs text-muted-foreground">
            {job.slotsLeft} slots left
          </span>
        </div>
        <Button onClick={() => onBook(job)}>Book Shift</Button>
      </CardFooter>
    </Card>
  )
}
