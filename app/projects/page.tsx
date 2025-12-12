"use client"

import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { ProjectsSection } from "@/components/projects-section"
import { Footer } from "@/components/footer"

export default function ProjectsPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24">
        <div className="container mx-auto px-4 mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <i className="ri-arrow-left-line text-lg" />
            Back
          </button>
        </div>
        <ProjectsSection showAll />
      </div>
      <Footer />
    </main>
  )
}
