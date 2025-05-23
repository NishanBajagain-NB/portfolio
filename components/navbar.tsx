"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Certificates", href: "#certificates" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)

      // Update active section based on scroll position
      const scrollPosition = window.scrollY + 100

      for (let i = navItems.length - 1; i >= 0; i--) {
        const sectionId = navItems[i].href.substring(1)
        const section = document.getElementById(sectionId)
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sectionId)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.substring(1)
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Adjust for navbar height
        behavior: "smooth",
      })

      // Update URL hash without scrolling (which would happen with normal hash change)
      window.history.pushState(null, "", href)

      // Close mobile menu if open
      if (mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5",
      )}
    >
      <div className="container flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="text-xl font-bold tracking-tight relative z-10"
          aria-label="Nishan Bajagain"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-md">NB</span>
          </motion.div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors relative group",
                  activeSection === item.href.substring(1) ? "text-primary" : "hover:text-primary",
                )}
              >
                {item.name}
                <span
                  className={cn(
                    "absolute bottom-1.5 left-3 h-0.5 bg-primary transition-all duration-300",
                    activeSection === item.href.substring(1)
                      ? "w-[calc(100%-24px)]"
                      : "w-0 group-hover:w-[calc(100%-24px)]",
                  )}
                ></span>
              </a>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: navItems.length * 0.1 }}
          >
            <ThemeToggle />
          </motion.div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="ml-2 relative z-10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b"
          >
            <div className="container py-4 flex flex-col space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={cn(
                      "block px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      activeSection === item.href.substring(1)
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-primary/10 hover:text-primary",
                    )}
                  >
                    {item.name}
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
