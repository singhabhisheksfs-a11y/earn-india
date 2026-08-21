import { IndianRupee } from "lucide-react"
import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <IndianRupee className="size-5" strokeWidth={2.5} />
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold tracking-tight">
          Earn<span className="text-primary">India</span>
        </span>
        <span className="text-[10px] font-medium tracking-wide text-muted-foreground">
          part-time, your time
        </span>
      </div>
    </div>
  )
}
