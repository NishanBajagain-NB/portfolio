"use client"

import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

interface SkillBadgeProps {
  name: string
}

export function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05, y: -2 }}
    >
      <Badge
        variant="outline"
        className="px-3 py-1.5 text-sm font-medium border-primary/20 bg-background/80 backdrop-blur-sm hover:bg-primary/10 transition-colors"
      >
        {name}
      </Badge>
    </motion.div>
  )
}
