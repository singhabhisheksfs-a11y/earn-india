"use client"

import * as React from "react"
import { LogIn, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { AuthModal } from "@/components/auth-modal"

const navLinks = [
  { label: "Browse Jobs", href: "#browse-jobs" },
  { label: "My Shifts", href: "#my-shifts" },
  { label: "Verification", href: "#verification" },
]

export function SiteHeader() {
  const [authOpen, setAuthOpen] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#top" aria-label="EarnIndia home">
          <Logo />
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              size="sm"
              nativeButton={false}
              render={<a href={link.href} />}
            >
              {link.label}
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Button
            className="hidden sm:inline-flex"
            onClick={() => setAuthOpen(true)}
          >
            <LogIn data-icon="inline-start" />
            Login / Sign Up
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="md:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <Menu />
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border/70 bg-background md:hidden">
          <nav className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                className="justify-start"
                nativeButton={false}
                render={<a href={link.href} />}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Button>
            ))}
            <Button
              className="mt-1 justify-start"
              onClick={() => {
                setMobileOpen(false)
                setAuthOpen(true)
              }}
            >
              <LogIn data-icon="inline-start" />
              Login / Sign Up
            </Button>
          </nav>
        </div>
      )}

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </header>
  )
}
