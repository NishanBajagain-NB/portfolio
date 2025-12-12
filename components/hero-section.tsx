"use client"

import { useState, useEffect } from "react"
import { usePortfolioData } from "@/lib/portfolio-context"
import Image from "next/image"

export function HeroSection() {
  const { data, loading } = usePortfolioData()
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  
  const roles = data?.personal.roles || []

  useEffect(() => {
    if (roles.length === 0) return
    const currentRole = roles[roleIndex]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentRole.length) {
            setDisplayText(currentRole.slice(0, displayText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1))
          } else {
            setIsDeleting(false)
            setRoleIndex((prev) => (prev + 1) % roles.length)
          }
        }
      },
      isDeleting ? 50 : 100,
    )

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, roleIndex, roles])

  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" })
  }

  if (loading || !data) {
    return (
      <section className="relative z-10 min-h-[100dvh] flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading portfolio...</p>
        </div>
      </section>
    )
  }

  return (
    <section
      id="home"
      className="relative z-10 min-h-[100dvh] flex items-center pt-20 md:pt-24 lg:pt-28 pb-8 w-full overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Left Side - Content */}
            <div className="flex-1 space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-left duration-700 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 border border-primary/20 rounded-full text-primary">
                <i className="ri-sparkle-line animate-pulse text-sm" />
                <span className="text-xs sm:text-sm font-medium">Make Something Awesome</span>
              </div>

              {/* Heading */}
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground">
                  {"I'm "}
                  <span className="text-primary">{data.personal.name}</span>
                </h1>
                <div className="flex items-center justify-center lg:justify-start gap-2 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-muted-foreground">
                  <span>A</span>
                  <span className="text-primary font-semibold">
                    {displayText}
                    <span className="animate-pulse">|</span>
                  </span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {data.personal.bio}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => scrollToSection("#projects")}
                  className="group flex items-center justify-center gap-2 px-5 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-all duration-300"
                >
                  <i className="ri-folder-line" />
                  View Projects
                  <i className="ri-arrow-right-line transition-transform group-hover:translate-x-1" />
                </button>
                <a
                  href={data.personal.cvUrl}
                  download
                  className="group flex items-center justify-center gap-2 px-5 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-all duration-300"
                >
                  <i className="ri-download-line" />
                  Download CV
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 pt-4 sm:pt-8">
                <StatCard value={data.stats.yearsExperience} label="Years Experience" icon="ri-time-line" />
                <StatCard
                  value={data.stats.projectsCompleted}
                  label="Projects Completed"
                  icon="ri-folder-check-line"
                />
                <StatCard
                  value={data.stats.technologiesUsed}
                  label="Technologies"
                  icon="ri-code-s-slash-line"
                />
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="relative flex justify-center animate-in fade-in slide-in-from-right duration-700 mb-4 lg:mb-0 flex-1 z-0">
              <div className="relative">
                {/* Decorative elements - contained within the image area */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 via-accent/10 to-transparent rounded-3xl blur-2xl -z-10" />
                <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-16 sm:w-24 lg:w-32 h-16 sm:h-24 lg:h-32 bg-primary/30 rounded-full blur-xl animate-float -z-10" />
                <div
                  className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-20 sm:w-32 lg:w-40 h-20 sm:h-32 lg:h-40 bg-accent/30 rounded-full blur-xl animate-float -z-10"
                  style={{ animationDelay: "2s" }}
                />

                {/* Image container */}
                <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] xl:w-[480px] xl:h-[480px] rounded-3xl overflow-hidden border-2 border-primary/20 shadow-2xl animate-float">
                  <Image
                    src={data.personal.avatar || "/placeholder.svg"}
                    alt={data.personal.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatCard({ value, label, icon }: { value: number; label: string; icon: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 50
    const stepValue = value / steps
    const stepDuration = duration / steps
    let current = 0

    const timer = setInterval(() => {
      current += stepValue
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [value])

  return (
    <div className="text-center p-2.5 sm:p-4 lg:p-5 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300">
      <i className={`${icon} text-xl sm:text-2xl lg:text-3xl text-primary mb-1 sm:mb-2 block`} />
      <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">{count}+</div>
      <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground leading-tight">{label}</div>
    </div>
  )
}
