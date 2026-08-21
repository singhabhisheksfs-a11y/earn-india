"use client"

import * as React from "react"
import { GraduationCap, Briefcase, Smartphone, Mail, Lock } from "lucide-react"
import { toast } from "sonner"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"
      />
    </svg>
  )
}

function AuthForm({ role }: { role: "seeker" | "employer" }) {
  const [loading, setLoading] = React.useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success(
        role === "seeker"
          ? "Welcome back! Redirecting to your shifts…"
          : "Employer sign-in successful (demo)."
      )
    }, 1100)
  }

  return (
    <div className="flex flex-col gap-4 pt-4">
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={() => toast.info("Google OAuth is a demo placeholder.")}
        >
          <GoogleGlyph />
          Google
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.info("An OTP would be sent to your mobile.")}
        >
          <Smartphone data-icon="inline-start" />
          Mobile OTP
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">or continue with</span>
        <Separator className="flex-1" />
      </div>

      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor={`${role}-id`}>
              {role === "seeker" ? "Email or phone" : "Work email"}
            </FieldLabel>
            <InputGroup>
              <InputGroupInput
                id={`${role}-id`}
                type="text"
                placeholder={
                  role === "seeker" ? "you@college.edu / 98765…" : "hr@company.com"
                }
                required
              />
              <InputGroupAddon>
                <Mail />
              </InputGroupAddon>
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor={`${role}-pw`}>Password</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id={`${role}-pw`}
                type="password"
                placeholder="••••••••"
                required
              />
              <InputGroupAddon>
                <Lock />
              </InputGroupAddon>
            </InputGroup>
          </Field>

          <Button type="submit" disabled={loading} className="mt-1 w-full">
            {loading
              ? "Signing in…"
              : role === "seeker"
                ? "Log in as Student"
                : "Log in as Employer"}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            New here?{" "}
            <button
              type="button"
              className="font-semibold text-primary hover:underline"
              onClick={() => toast.info("Sign-up flow is a demo placeholder.")}
            >
              Create a free account
            </button>
          </p>
        </FieldGroup>
      </form>
    </div>
  )
}

export function AuthModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            Welcome to EarnIndia
          </DialogTitle>
          <DialogDescription>
            Log in or sign up to book shifts and track your earnings.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="seeker" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="seeker">
              <GraduationCap data-icon="inline-start" />
              Job Seeker
            </TabsTrigger>
            <TabsTrigger value="employer">
              <Briefcase data-icon="inline-start" />
              Employer
            </TabsTrigger>
          </TabsList>
          <TabsContent value="seeker">
            <AuthForm role="seeker" />
          </TabsContent>
          <TabsContent value="employer">
            <AuthForm role="employer" />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
