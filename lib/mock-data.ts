import type { LucideIcon } from "lucide-react"
import {
  PartyPopper,
  Bike,
  ShoppingBag,
  Megaphone,
  Coffee,
  Boxes,
} from "lucide-react"

export type Category = {
  id: string
  label: string
  icon: LucideIcon
}

export const categories: Category[] = [
  { id: "events", label: "Event Management", icon: PartyPopper },
  { id: "delivery", label: "Delivery", icon: Bike },
  { id: "retail", label: "Retail", icon: ShoppingBag },
  { id: "campus", label: "Campus Rep", icon: Megaphone },
  { id: "hospitality", label: "Hospitality", icon: Coffee },
  { id: "warehouse", label: "Warehouse", icon: Boxes },
]

export const locations = [
  "Bengaluru",
  "Mumbai",
  "Delhi NCR",
  "Hyderabad",
  "Pune",
  "Chennai",
]

export const availabilityOptions = [
  { id: "weekends", label: "Weekends" },
  { id: "weekdays", label: "Weekdays" },
  { id: "evenings", label: "Evenings" },
  { id: "flexible", label: "Flexible" },
]

export type Job = {
  id: string
  title: string
  employer: string
  employerVerified: boolean
  categoryId: string
  location: string
  payPerHour: number
  availability: string
  rating: number
  reviews: number
  slotsLeft: number
  tags: string[]
  urgent?: boolean
}

export const jobs: Job[] = [
  {
    id: "j1",
    title: "Event Crew — Music Festival",
    employer: "Sunburn Events",
    employerVerified: true,
    categoryId: "events",
    location: "Bengaluru",
    payPerHour: 320,
    availability: "weekends",
    rating: 4.8,
    reviews: 214,
    slotsLeft: 6,
    tags: ["Same-day pay", "Free meals"],
    urgent: true,
  },
  {
    id: "j2",
    title: "Food Delivery Partner",
    employer: "QuickBite",
    employerVerified: true,
    categoryId: "delivery",
    location: "Mumbai",
    payPerHour: 260,
    availability: "flexible",
    rating: 4.5,
    reviews: 980,
    slotsLeft: 22,
    tags: ["Fuel bonus", "Pick your hours"],
  },
  {
    id: "j3",
    title: "Store Associate — Weekend",
    employer: "Trendz Retail",
    employerVerified: false,
    categoryId: "retail",
    location: "Delhi NCR",
    payPerHour: 210,
    availability: "weekends",
    rating: 4.2,
    reviews: 132,
    slotsLeft: 4,
    tags: ["Staff discount"],
  },
  {
    id: "j4",
    title: "Campus Brand Ambassador",
    employer: "Zepto",
    employerVerified: true,
    categoryId: "campus",
    location: "Pune",
    payPerHour: 300,
    availability: "flexible",
    rating: 4.9,
    reviews: 76,
    slotsLeft: 10,
    tags: ["Work from campus", "Incentives"],
  },
  {
    id: "j5",
    title: "Café Barista Trainee",
    employer: "Brew House",
    employerVerified: true,
    categoryId: "hospitality",
    location: "Hyderabad",
    payPerHour: 230,
    availability: "evenings",
    rating: 4.6,
    reviews: 158,
    slotsLeft: 3,
    tags: ["Tips", "Training provided"],
  },
  {
    id: "j6",
    title: "Warehouse Sorting Assistant",
    employer: "ShipFast Logistics",
    employerVerified: false,
    categoryId: "warehouse",
    location: "Chennai",
    payPerHour: 240,
    availability: "weekdays",
    rating: 4.1,
    reviews: 89,
    slotsLeft: 15,
    tags: ["Overtime available"],
    urgent: true,
  },
]

export type BadgeTier = "bronze" | "silver" | "gold" | "pro"

export type SkillBadge = {
  tier: BadgeTier
  label: string
  shiftsRequired: number
  benefit: string
}

export const skillBadges: SkillBadge[] = [
  {
    tier: "bronze",
    label: "Bronze",
    shiftsRequired: 0,
    benefit: "Start booking basic shifts",
  },
  {
    tier: "silver",
    label: "Silver",
    shiftsRequired: 10,
    benefit: "Higher trust rating shown to employers",
  },
  {
    tier: "gold",
    label: "Gold",
    shiftsRequired: 25,
    benefit: "Priority booking on high-pay gigs",
  },
  {
    tier: "pro",
    label: "Verified Pro",
    shiftsRequired: 50,
    benefit: "Top of search + instant-approve shifts",
  },
]

export type CompletedShift = {
  id: string
  title: string
  employer: string
  date: string
  hours: number
  earned: number
  rating: number | null
  status: "reviewed" | "pending-review"
}

export const completedShifts: CompletedShift[] = [
  {
    id: "c1",
    title: "Event Crew — Tech Conference",
    employer: "InfoBeans",
    date: "12 Apr 2026",
    hours: 6,
    earned: 1920,
    rating: 5,
    status: "reviewed",
  },
  {
    id: "c2",
    title: "Food Delivery Partner",
    employer: "QuickBite",
    date: "08 Apr 2026",
    hours: 4,
    earned: 1040,
    rating: 4,
    status: "reviewed",
  },
  {
    id: "c3",
    title: "Store Associate — Weekend",
    employer: "Trendz Retail",
    date: "05 Apr 2026",
    hours: 5,
    earned: 1050,
    rating: null,
    status: "pending-review",
  },
]

export type UserProfile = {
  name: string
  handle: string
  currentTier: BadgeTier
  completedShifts: number
  trustScore: number
  totalEarned: number
  verificationSteps: { id: string; label: string; done: boolean }[]
}

export const userProfile: UserProfile = {
  name: "Aarav Sharma",
  handle: "@aarav",
  currentTier: "silver",
  completedShifts: 17,
  trustScore: 87,
  totalEarned: 24680,
  verificationSteps: [
    { id: "email", label: "Email verified", done: true },
    { id: "phone", label: "Mobile OTP verified", done: true },
    { id: "id", label: "Government ID (Aadhaar)", done: true },
    { id: "student", label: "Student ID uploaded", done: false },
  ],
}

/** Weekly calendar helpers for the shift booking modal. */
export const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

export const timeSlots = [
  "8 AM",
  "10 AM",
  "12 PM",
  "2 PM",
  "4 PM",
  "6 PM",
  "8 PM",
]

/** Deterministic availability so server and client markup match. */
export function slotAvailability(dayIndex: number, slotIndex: number) {
  return (dayIndex * 7 + slotIndex * 3) % 5 !== 0
}
