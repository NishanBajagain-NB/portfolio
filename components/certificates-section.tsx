"use client"

import { motion } from "framer-motion"
import { SectionHeading } from "@/components/section-heading"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Calendar, ExternalLink } from "lucide-react"
import { getCertificates, type Certificate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function CertificatesSection() {
  // Ensure certificates is always an array
  const certificates = getCertificates() || []
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="certificates" className="py-20">
      <div className="container">
        <SectionHeading title="Certificates" subtitle="Professional certifications and achievements" />

        {certificates.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((certificate, index) => (
              <motion.div
                key={certificate.id || index}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full overflow-hidden group hover:shadow-md transition-all">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={certificate.imageUrl || "/placeholder.svg?height=400&width=600"}
                      alt={certificate.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="secondary" size="sm" onClick={() => setSelectedCertificate(certificate)}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Certificate
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium">{certificate.name}</h3>
                        <p className="text-sm text-muted-foreground">{certificate.issuer}</p>
                        <div className="flex items-center mt-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{certificate.issueDate}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Award className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No certificates found</h3>
            <p className="text-muted-foreground">Certificates will appear here once added.</p>
          </div>
        )}
      </div>

      {/* Certificate Dialog */}
      <Dialog open={!!selectedCertificate} onOpenChange={(open) => !open && setSelectedCertificate(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedCertificate?.name}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <img
              src={selectedCertificate?.imageUrl || "/placeholder.svg?height=400&width=600"}
              alt={selectedCertificate?.name}
              className="w-full rounded-md"
            />
            <div className="mt-4">
              <h4 className="font-medium">Description</h4>
              <p className="text-muted-foreground mt-1">{selectedCertificate?.description}</p>
              <div className="flex items-center mt-4 text-sm">
                <span className="font-medium mr-2">Issuer:</span>
                <span>{selectedCertificate?.issuer}</span>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <span className="font-medium mr-2">Issue Date:</span>
                <span>{selectedCertificate?.issueDate}</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
