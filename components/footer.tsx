"use client"

import type React from "react"

import { Github, Linkedin, Mail, Heart, Twitter, Instagram, FileText } from "lucide-react"

export function Footer() {
  const name = process.env.NEXT_PUBLIC_NAME || "Nishan Bajagain"
  const email = process.env.NEXT_PUBLIC_EMAIL || "email@example.com"
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com"
  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com"
  const twitterUrl = process.env.NEXT_PUBLIC_TWITTER_URL
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL
  const cvUrl = process.env.NEXT_PUBLIC_CV_URL
  const currentYear = new Date().getFullYear()

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.substring(1)
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Adjust for navbar height
        behavior: "smooth",
      })

      // Update URL hash without scrolling
      window.history.pushState(null, "", href)
    }
  }

  return (
    <footer className="border-t py-12 bg-muted/30">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex flex-col items-center md:items-start">
            <a href="#home" onClick={(e) => handleNavClick(e, "#home")} className="text-2xl font-bold">
              NB
            </a>
            <p className="text-muted-foreground mt-2 max-w-md text-center md:text-left">
              Creating beautiful, functional, and user-friendly websites and applications.
            </p>
          </div>

          <div className="flex gap-4">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-background hover:bg-primary/10 hover:text-primary transition-colors shadow-sm"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-background hover:bg-primary/10 hover:text-primary transition-colors shadow-sm"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            {twitterUrl && (
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-background hover:bg-primary/10 hover:text-primary transition-colors shadow-sm"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            )}
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-background hover:bg-primary/10 hover:text-primary transition-colors shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            )}
            <a
              href={`mailto:${email}`}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-background hover:bg-primary/10 hover:text-primary transition-colors shadow-sm"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
            {cvUrl && (
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-background hover:bg-primary/10 hover:text-primary transition-colors shadow-sm"
                aria-label="Download CV"
              >
                <FileText className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-muted-foreground">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="hover:text-primary transition-colors"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, "#about")}
              className="hover:text-primary transition-colors"
            >
              About
            </a>
            <a
              href="#skills"
              onClick={(e) => handleNavClick(e, "#skills")}
              className="hover:text-primary transition-colors"
            >
              Skills
            </a>
            <a
              href="#projects"
              onClick={(e) => handleNavClick(e, "#projects")}
              className="hover:text-primary transition-colors"
            >
              Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="hover:text-primary transition-colors"
            >
              Contact
            </a>
          </div>

          <p className="text-sm text-muted-foreground flex items-center">
            &copy; {currentYear} {name}. Made with <Heart className="h-3 w-3 mx-1 text-red-500" /> All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
