"use client"

import type React from "react"

import { motion } from "framer-motion"
import { SectionHeading } from "@/components/section-heading"
import { Card, CardContent } from "@/components/ui/card"
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Calendar,
  Briefcase,
  Twitter,
  Instagram,
  Download,
  GraduationCap,
} from "lucide-react"
import { smoothScrollTo } from "@/lib/scroll-utils"
import { getEducation } from "@/lib/utils"

export function AboutSection() {
  const name = process.env.NEXT_PUBLIC_NAME || "Nishan Bajagain"
  const bio =
    process.env.NEXT_PUBLIC_BIO ||
    "I am a passionate web developer with expertise in modern web technologies. I love creating beautiful, functional, and user-friendly websites and applications."
  const photoUrl = process.env.NEXT_PUBLIC_PHOTO_URL || "https://placehold.co/400x400"
  const email = process.env.NEXT_PUBLIC_EMAIL || "email@example.com"
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com"
  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com"
  const twitterUrl = process.env.NEXT_PUBLIC_TWITTER_URL
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL
  const cvUrl = process.env.NEXT_PUBLIC_CV_URL

  // Ensure education is always an array
  const education = getEducation() || []

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.substring(1)
    smoothScrollTo(targetId)
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container">
        <SectionHeading title="About Me" subtitle="Get to know me better" />

        <div className="grid lg:grid-cols-3 gap-12">
          {/* About Me Column */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center lg:col-span-1"
          >
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-primary/20">
                <img src={photoUrl || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg">
                <Briefcase className="h-5 w-5" />
              </div>
            </div>
          </motion.div>

          {/* Bio Column */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h3 className="text-2xl font-bold mb-4">
              Hello, I'm <span className="text-primary">{name}</span>
            </h3>

            <p className="text-muted-foreground mb-6 leading-relaxed">{bio}</p>

            <Card className="mb-6">
              <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-sm">{email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm">{process.env.NEXT_PUBLIC_ADDRESS || "City, Country"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-sm">Not Available for work </span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-primary" />
                  <span className="text-sm">Student</span>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-3 mb-6">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              {twitterUrl && (
                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              )}
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
              <div className="ml-auto flex gap-3">
                {cvUrl && (
                  <a
                    href={cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download CV
                  </a>
                )}
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                >
                  Contact Me
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Education Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Education</h3>

          <div className="grid md:grid-cols-2 gap-6">
            {education.length > 0 ? (
              education.map((item, index) => (
                <motion.div
                  key={item.id || index}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                          <GraduationCap className="h-6 w-6" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-xl font-bold">{item.degree}</h3>
                          <p className="text-primary font-medium">{item.field}</p>
                          <p className="text-lg font-medium mt-1">{item.institution}</p>

                          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>
                                {item.startDate} - {item.endDate}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{item.location}</span>
                            </div>
                          </div>

                          <p className="mt-4 text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 col-span-2">
                <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No education history found</h3>
                <p className="text-muted-foreground">Education history will appear here once added.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
