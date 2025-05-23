"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/section-heading"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Code } from "lucide-react"
import Link from "next/link"
import { getProjects } from "@/lib/utils"

export function ProjectsSection() {
  // Ensure projects is always an array
  const allProjects = getProjects() || []
  const [filter, setFilter] = useState<"all" | "featured">("all")

  const projects = filter === "all" ? allProjects : allProjects.filter((project) => project.featured)

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="projects" className="py-20">
      <div className="container">
        <SectionHeading title="Projects" subtitle="Check out some of my recent work" />

        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              className="rounded-r-none"
              onClick={() => setFilter("all")}
            >
              All Projects
            </Button>
            <Button
              variant={filter === "featured" ? "default" : "outline"}
              className="rounded-l-none"
              onClick={() => setFilter("featured")}
            >
              Featured
            </Button>
          </div>
        </div>

        {projects.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id || index}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col overflow-hidden group hover:shadow-md transition-all">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={project.imageUrl || "/placeholder.svg?height=400&width=600"}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    {project.featured && <Badge className="absolute top-2 right-2 bg-primary">Featured</Badge>}
                  </div>
                  <CardContent className="p-6 flex-grow">
                    <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.technologies &&
                        project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                    </div>
                  </CardContent>
                  <CardFooter className="px-6 pb-6 pt-0 flex gap-2">
                    {project.demoUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Demo
                        </Link>
                      </Button>
                    )}
                    <Button variant="outline" size="sm" asChild>
                      <Link href={project.sourceUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Source
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Code className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No projects found</h3>
            <p className="text-muted-foreground">
              {filter === "featured"
                ? "There are no featured projects. Try viewing all projects instead."
                : "Projects will appear here once added."}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
