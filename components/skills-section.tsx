"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/section-heading"
import { SkillBadge } from "@/components/skill-badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function parseSkills(envVar: string | undefined) {
  return envVar ? envVar.split(",").map(s => s.trim()) : []
}

export function SkillsSection() {
  const frontendSkills = useMemo(() => parseSkills(process.env.NEXT_PUBLIC_FRONTEND_SKILLS), [])
  const backendSkills = useMemo(() => parseSkills(process.env.NEXT_PUBLIC_BACKEND_SKILLS), [])
  const designSkills = useMemo(() => parseSkills(process.env.NEXT_PUBLIC_DESIGN_SKILLS), [])
  const otherSkills = useMemo(() => parseSkills(process.env.NEXT_PUBLIC_OTHER_SKILLS), [])

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container">
        <SectionHeading title="Skills & Expertise" subtitle="Technologies and tools I work with" />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-none shadow-lg">
            <CardContent className="p-6">
              <Tabs defaultValue="frontend" className="w-full">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
                  <TabsTrigger value="frontend">Frontend</TabsTrigger>
                  <TabsTrigger value="backend">Backend</TabsTrigger>
                  <TabsTrigger value="design">Design</TabsTrigger>
                  <TabsTrigger value="other">Other</TabsTrigger>
                </TabsList>

                <TabsContent value="frontend" className="mt-0">
                  <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4 text-primary">Frontend Development</h3>
                    <div className="flex flex-wrap gap-3">
                      {frontendSkills.map((skill) => (
                        <SkillBadge key={skill} name={skill} />
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="backend" className="mt-0">
                  <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4 text-primary">Backend Development</h3>
                    <div className="flex flex-wrap gap-3">
                      {backendSkills.map((skill) => (
                        <SkillBadge key={skill} name={skill} />
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="design" className="mt-0">
                  <div className="bg-gradient-to-br from-pink-500/10 to-orange-500/10 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4 text-primary">Design</h3>
                    <div className="flex flex-wrap gap-3">
                      {designSkills.map((skill) => (
                        <SkillBadge key={skill} name={skill} />
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="other" className="mt-0">
                  <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4 text-primary">Other Skills</h3>
                    <div className="flex flex-wrap gap-3">
                      {otherSkills.map((skill) => (
                        <SkillBadge key={skill} name={skill} />
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
