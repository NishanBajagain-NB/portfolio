"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/section-heading"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechCorp",
    content:
      "Working with Nishan was a fantastic experience. He delivered our website redesign on time and exceeded our expectations. His attention to detail and creative solutions made all the difference.",
    avatar: "https://placehold.co/100x100",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Startup Founder",
    company: "InnovateLabs",
    content:
      "Nishan helped us build our product from the ground up. His technical expertise and understanding of user experience resulted in an application that our customers love. Highly recommended!",
    avatar: "https://placehold.co/100x100",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "E-commerce Manager",
    company: "StyleShop",
    content:
      "Our online store's conversion rate increased by 40% after Nishan redesigned our user interface. He has a great eye for design and understands how to create experiences that drive results.",
    avatar: "https://placehold.co/100x100",
  },
]

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setActiveIndex((current) => (current === testimonials.length - 1 ? 0 : current + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  const handlePrev = () => {
    setAutoplay(false)
    setActiveIndex((current) => (current === 0 ? testimonials.length - 1 : current - 1))
  }

  const handleNext = () => {
    setAutoplay(false)
    setActiveIndex((current) => (current === testimonials.length - 1 ? 0 : current + 1))
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="testimonials" className="py-20">
      <div className="container">
        <SectionHeading title="Testimonials" subtitle="What clients say about my work" />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="border-none shadow-lg bg-background/50 backdrop-blur-sm">
            <CardContent className="p-8 relative">
              <div className="absolute top-8 left-8 text-primary/20">
                <Quote className="h-16 w-16" />
              </div>

              <div className="relative z-10">
                <div className="min-h-[200px] flex items-center justify-center">
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={testimonial.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: index === activeIndex ? 1 : 0, x: index === activeIndex ? 0 : 20 }}
                      transition={{ duration: 0.5 }}
                      className="absolute w-full"
                      style={{ display: index === activeIndex ? "block" : "none" }}
                    >
                      <blockquote className="text-lg text-center italic mb-6">{testimonial.content}</blockquote>
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full overflow-hidden mb-3 border-2 border-primary/20">
                          <img
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-center">
                          <h4 className="font-bold">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-center items-center mt-8 gap-2">
                  <Button variant="outline" size="icon" onClick={handlePrev} aria-label="Previous testimonial">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <div className="flex gap-2 mx-4">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setAutoplay(false)
                          setActiveIndex(index)
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === activeIndex ? "bg-primary w-6" : "bg-primary/30"
                        }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>

                  <Button variant="outline" size="icon" onClick={handleNext} aria-label="Next testimonial">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
