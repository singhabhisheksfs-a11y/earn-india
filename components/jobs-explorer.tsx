"use client"

import * as React from "react"
import { Search, SlidersHorizontal, SearchX } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty"
import { JobCard } from "@/components/job-card"
import { BookShiftModal } from "@/components/book-shift-modal"
import {
  jobs,
  categories,
  locations,
  availabilityOptions,
  type Job,
} from "@/lib/mock-data"

const ANY = "any"

export function JobsExplorer() {
  const [query, setQuery] = React.useState("")
  const [category, setCategory] = React.useState(ANY)
  const [location, setLocation] = React.useState(ANY)
  const [availability, setAvailability] = React.useState(ANY)
  const [loading, setLoading] = React.useState(false)

  const [activeJob, setActiveJob] = React.useState<Job | null>(null)
  const [bookingOpen, setBookingOpen] = React.useState(false)

  // Briefly show skeletons whenever filters change, to demo loading states.
  React.useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(t)
  }, [query, category, location, availability])

  const filtered = jobs.filter((job) => {
    const q = query.trim().toLowerCase()
    const matchesQuery =
      !q ||
      job.title.toLowerCase().includes(q) ||
      job.employer.toLowerCase().includes(q)
    const matchesCategory = category === ANY || job.categoryId === category
    const matchesLocation = location === ANY || job.location === location
    const matchesAvailability =
      availability === ANY || job.availability === availability
    return matchesQuery && matchesCategory && matchesLocation && matchesAvailability
  })

  function resetFilters() {
    setQuery("")
    setCategory(ANY)
    setLocation(ANY)
    setAvailability(ANY)
  }

  function openBooking(job: Job) {
    setActiveJob(job)
    setBookingOpen(true)
  }

  return (
    <section
      id="browse-jobs"
      className="mx-auto w-full max-w-7xl scroll-mt-20 px-4 py-14 sm:px-6 lg:px-8"
    >
      <div className="mb-6 flex flex-col gap-2">
        <h2 className="font-display text-3xl font-bold tracking-tight">
          Browse gigs
        </h2>
        <p className="text-muted-foreground">
          Filter by category, location and when you&apos;re free.
        </p>
      </div>

      {/* Quick search bar */}
      <div className="mb-8 rounded-3xl border border-border/70 bg-card p-3 shadow-sm sm:p-4">
        <div className="grid gap-3 lg:grid-cols-[1.6fr_1fr_1fr_1fr_auto]">
          <InputGroup className="h-11">
            <InputGroupInput
              placeholder="Search role or company…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="h-11 w-full">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={ANY}>All categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="h-11 w-full">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={ANY}>All cities</SelectItem>
                {locations.map((l) => (
                  <SelectItem key={l} value={l}>
                    {l}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select value={availability} onValueChange={setAvailability}>
            <SelectTrigger className="h-11 w-full">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={ANY}>Any time</SelectItem>
                {availabilityOptions.map((a) => (
                  <SelectItem key={a.id} value={a.id}>
                    {a.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button variant="outline" className="h-11" onClick={resetFilters}>
            <SlidersHorizontal data-icon="inline-start" />
            Reset
          </Button>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 rounded-xl border border-border/70 bg-card p-6"
            >
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
              <div className="flex items-center justify-between pt-4">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-9 w-28 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((job) => (
            <JobCard key={job.id} job={job} onBook={openBooking} />
          ))}
        </div>
      ) : (
        <Empty className="rounded-3xl border border-dashed border-border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SearchX />
            </EmptyMedia>
            <EmptyTitle>No gigs match your filters</EmptyTitle>
            <EmptyDescription>
              Try widening your search or resetting the filters.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="outline" onClick={resetFilters}>
              Reset filters
            </Button>
          </EmptyContent>
        </Empty>
      )}

      <BookShiftModal
        job={activeJob}
        open={bookingOpen}
        onOpenChange={setBookingOpen}
      />
    </section>
  )
}
