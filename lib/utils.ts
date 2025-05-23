import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Safely parse JSON from environment variables
export function parseEnvJson<T>(jsonString: string | undefined, fallback: T): T {
  if (!jsonString) return fallback

  try {
    return JSON.parse(jsonString) as T
  } catch (error) {
    console.error("Error parsing JSON from environment variable:", error)
    return fallback
  }
}

// Certificate type
export interface Certificate {
  id: string
  name: string
  description: string
  imageUrl: string
  issueDate: string
  issuer: string
}

// Education type
export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  description: string
  location: string
}

// Project type
export interface Project {
  id: string
  name: string
  description: string
  imageUrl: string
  technologies: string[]
  sourceUrl: string
  demoUrl?: string
  featured: boolean
}

// Get certificates from environment variable
export function getCertificates(): Certificate[] {
  const defaultCertificates = [
    {
      id: "cert1",
      name: "Sample Certificate",
      description: "This is a sample certificate",
      imageUrl: "https://placehold.co/600x400",
      issueDate: "2023-01-01",
      issuer: "Sample Issuer",
    },
  ]

  try {
    const certificatesJson = process.env.NEXT_PUBLIC_CERTIFICATES
    if (!certificatesJson) return defaultCertificates

    const parsed = JSON.parse(certificatesJson)
    return Array.isArray(parsed) ? parsed : defaultCertificates
  } catch (error) {
    console.error("Error parsing certificates:", error)
    return defaultCertificates
  }
}

// Get education from environment variable
export function getEducation(): Education[] {
  const defaultEducation = [
    {
      id: "edu1",
      institution: "Sample University",
      degree: "Bachelor's Degree",
      field: "Computer Science",
      startDate: "2018-09-01",
      endDate: "2022-06-01",
      description: "Studied computer science with focus on software engineering",
      location: "Sample City, Country",
    },
  ]

  try {
    const educationJson = process.env.NEXT_PUBLIC_EDUCATION
    if (!educationJson) return defaultEducation

    const parsed = JSON.parse(educationJson)
    return Array.isArray(parsed) ? parsed : defaultEducation
  } catch (error) {
    console.error("Error parsing education:", error)
    return defaultEducation
  }
}

// Get projects from environment variable
export function getProjects(): Project[] {
  const defaultProjects = [
    {
      id: "proj1",
      name: "Sample Project",
      description: "This is a sample project description",
      imageUrl: "https://placehold.co/600x400",
      technologies: ["React", "Next.js", "Tailwind CSS"],
      sourceUrl: "https://github.com",
      demoUrl: "https://example.com",
      featured: true,
    },
  ]

  try {
    const projectsJson = process.env.NEXT_PUBLIC_PROJECTS
    if (!projectsJson) return defaultProjects

    const parsed = JSON.parse(projectsJson)
    return Array.isArray(parsed) ? parsed : defaultProjects
  } catch (error) {
    console.error("Error parsing projects:", error)
    return defaultProjects
  }
}
