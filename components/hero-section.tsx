"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ArrowDown, Code, Palette, Zap, FileText } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  const name = process.env.NEXT_PUBLIC_NAME || "Nishan Bajagain"
  const tagline = process.env.NEXT_PUBLIC_TAGLINE || "Web Developer & Designer"
  const cvUrl = process.env.NEXT_PUBLIC_CV_URL

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
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-24">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 md:w-96 md:h-96 bg-pink-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container flex flex-col items-center text-center z-10 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 shadow-sm inline-block">
            Welcome to my portfolio
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6"
        >
          Hi, I'm{" "}
          <span className="text-primary relative inline-block">
            {name}
            <span className="absolute bottom-2 left-0 w-full h-3 bg-primary/20 -z-10 rounded-lg"></span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-muted-foreground max-w-2xl mb-8"
        >
          {tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <Button asChild size="lg" className="rounded-full shadow-md">
            <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>
              Get in Touch
            </a>
          </Button>
          {cvUrl && (
            <Button variant="outline" size="lg" asChild className="rounded-full shadow-sm">
              <a href={cvUrl} target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-5 w-5" />
                Download CV
              </a>
            </Button>
          )}
          <Button variant="outline" size="lg" asChild className="rounded-full shadow-sm">
            <a href="#projects" onClick={(e) => handleNavClick(e, "#projects")}>
              View Projects
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl w-full"
        >
          <div className="flex flex-col items-center p-4 rounded-lg bg-background/80 backdrop-blur-sm border border-border shadow-sm">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
              <Code className="h-6 w-6" />
            </div>
            <h3 className="font-medium">Web Development</h3>
            <p className="text-sm text-muted-foreground text-center mt-1">Modern, responsive websites</p>
          </div>

          <div className="flex flex-col items-center p-4 rounded-lg bg-background/80 backdrop-blur-sm border border-border shadow-sm">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
              <Palette className="h-6 w-6" />
            </div>
            <h3 className="font-medium">UI/UX Design</h3>
            <p className="text-sm text-muted-foreground text-center mt-1">Beautiful user interfaces</p>
          </div>

          <div className="flex flex-col items-center p-4 rounded-lg bg-background/80 backdrop-blur-sm border border-border shadow-sm">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="font-medium">Performance</h3>
            <p className="text-sm text-muted-foreground text-center mt-1">Fast, optimized applications</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 mt-16"
      >
        <a
          href="#about"
          onClick={(e) => handleNavClick(e, "#about")}
          className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </a>
      </motion.div>
    </section>
  )
}
