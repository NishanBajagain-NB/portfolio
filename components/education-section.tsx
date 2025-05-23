"use client"

import { motion } from "framer-motion"
import { SectionHeading } from "@/components/section-heading"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Calendar, MapPin } from "lucide-react"
import { getEducation } from "@/lib/utils"

export function EducationSection() {
  // Ensure education is always an array
  const education = getEducation() || []

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="education" className="py-20 bg-muted/30">
      <div className="container">
        <SectionHeading title="Education" subtitle="My academic background and qualifications" />

        <div className="max-w-3xl mx-auto">
          {education.length > 0 ? (
            education.map((item, index) => (
              <motion.div
                key={item.id || index}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mb-8 last:mb-0"
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
            <div className="text-center py-12">
              <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No education history found</h3>
              <p className="text-muted-foreground">Education history will appear here once added.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
