"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  imageUrl: string
  demoUrl?: string
  repoUrl?: string
}

export function ProjectCard({ title, description, tags, imageUrl, demoUrl, repoUrl }: ProjectCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
      <Card className="overflow-hidden transition-all hover:shadow-lg border-border/60 bg-card/80 backdrop-blur-sm h-full flex flex-col">
        <div className="aspect-video w-full overflow-hidden relative group">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
            <div className="flex gap-2">
              {demoUrl && (
                <Button size="sm" asChild className="rounded-full">
                  <Link href={demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </Link>
                </Button>
              )}
              {repoUrl && (
                <Button variant="outline" size="sm" asChild className="rounded-full bg-white/20 backdrop-blur-sm">
                  <Link href={repoUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
        <CardContent className="p-6 flex-grow">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground mb-4">{description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-secondary/50 hover:bg-secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
