export interface Project {
  id: string
  title: string
  description: string
  image: string
  date: string
  status: "completed" | "in-progress" | "future"
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
}

export interface Skill {
  name: string
  icon: string
  category: "frontend" | "backend" | "other"
}

export interface Experience {
  id: string
  company: string
  role: string
  duration: string
  description: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  year: string
}

export interface Message {
  id: string
  name: string
  email: string
  message: string
  date: string
  read: boolean
}

export interface PortfolioData {
  personal: {
    name: string
    roles: string[]
    bio: string
    whoIAm?: string
    email: string
    phone: string
    location: string
    cvUrl: string
    avatar: string
    social: {
      github: string
      linkedin: string
      facebook: string
      twitter: string
    }
  }
  stats: {
    yearsExperience: number
    projectsCompleted: number
    technologiesUsed: number
  }
  skills: Skill[]
  experience: Experience[]
  education: Education[]
  projects: Project[]
}

// API functions with timeout and better error handling
const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout = 10000) => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}

export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    const response = await fetchWithTimeout('/api/portfolio', {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch portfolio data:', error)
    throw new Error('Failed to fetch portfolio data')
  }
}

export async function updatePortfolioData(data: PortfolioData): Promise<void> {
  try {
    const response = await fetchWithTimeout('/api/portfolio', {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify(data),
      cache: 'no-store'
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  } catch (error) {
    console.error('Failed to update portfolio data:', error)
    throw new Error('Failed to update portfolio data')
  }
}

export async function getMessages(): Promise<Message[]> {
  try {
    const response = await fetchWithTimeout('/api/messages', {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    })
    
    if (response.status === 401) {
      // Return empty array for unauthorized access instead of throwing
      return []
    }
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    if (error instanceof Error && error.message.includes('401')) {
      return []
    }
    console.error('Failed to fetch messages:', error)
    return []
  }
}

export async function sendMessage(message: { name: string; email: string; message: string }): Promise<void> {
  try {
    const response = await fetchWithTimeout('/api/messages', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify(message),
      cache: 'no-store'
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  } catch (error) {
    console.error('Failed to send message:', error)
    throw new Error('Failed to send message')
  }
}

export async function updateMessages(messages: Message[]): Promise<void> {
  try {
    const response = await fetchWithTimeout('/api/messages', {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify(messages),
      cache: 'no-store'
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  } catch (error) {
    console.error('Failed to update messages:', error)
    throw new Error('Failed to update messages')
  }
}

// Default data for SSR/initial load
export const portfolioData = {
  personal: {
    name: "Nishan Bajagain",
    roles: ["Software Developer", "Software Engineer", "UX/UI Designer"],
    bio: "Passionate software developer with expertise in building modern web applications. I craft pixel-perfect, accessible digital experiences that blend thoughtful design with robust engineering.",
    email: "nishan@example.com",
    phone: "+977 9800000000",
    location: "Kathmandu, Nepal",
    cvUrl: "/cv.pdf",
    avatar: "/professional-developer-portrait-man.jpg",
    social: {
      github: "https://github.com/nishanbajagain",
      linkedin: "https://linkedin.com/in/nishanbajagain",
      facebook: "https://facebook.com/nishanbajagain",
      twitter: "https://twitter.com/nishanbajagain",
    },
  },
  stats: {
    yearsExperience: 5,
    projectsCompleted: 50,
    technologiesUsed: 20,
  },
  skills: [
    { name: "JavaScript", icon: "ri-javascript-line", category: "frontend" },
    { name: "TypeScript", icon: "ri-code-s-slash-line", category: "frontend" },
    { name: "React", icon: "ri-reactjs-line", category: "frontend" },
    { name: "Next.js", icon: "ri-nextjs-fill", category: "frontend" },
    { name: "HTML5", icon: "ri-html5-line", category: "frontend" },
    { name: "CSS3", icon: "ri-css3-line", category: "frontend" },
    { name: "Tailwind CSS", icon: "ri-palette-line", category: "frontend" },
    { name: "Node.js", icon: "ri-nodejs-line", category: "backend" },
    { name: "Python", icon: "ri-code-box-line", category: "backend" },
    { name: "Java", icon: "ri-java-line", category: "backend" },
    { name: "C#", icon: "ri-terminal-box-line", category: "backend" },
    { name: "C++", icon: "ri-code-line", category: "backend" },
    { name: "MongoDB", icon: "ri-database-2-line", category: "backend" },
    { name: "PostgreSQL", icon: "ri-database-line", category: "backend" },
    { name: "Git", icon: "ri-git-branch-line", category: "other" },
    { name: "Docker", icon: "ri-ship-line", category: "other" },
    { name: "AWS", icon: "ri-cloud-line", category: "other" },
    { name: "Figma", icon: "ri-pencil-ruler-2-line", category: "other" },
  ] as Skill[],
  experience: [
    {
      id: "1",
      company: "Tech Solutions Inc.",
      role: "Senior Software Developer",
      duration: "2022 - Present",
      description: "Leading frontend development team, building scalable web applications using React and Next.js.",
    },
    {
      id: "2",
      company: "Digital Agency Nepal",
      role: "Full Stack Developer",
      duration: "2020 - 2022",
      description: "Developed and maintained multiple client projects using modern JavaScript frameworks.",
    },
    {
      id: "3",
      company: "StartUp Labs",
      role: "Junior Developer",
      duration: "2019 - 2020",
      description: "Started career building web applications and learning best practices in software development.",
    },
  ] as Experience[],
  education: [
    {
      id: "1",
      institution: "Tribhuvan University",
      degree: "Bachelor's in Computer Science",
      year: "2019",
    },
    {
      id: "2",
      institution: "National College of Engineering",
      degree: "Diploma in Software Engineering",
      year: "2016",
    },
  ] as Education[],
  projects: [
    {
      id: "1",
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
      image: "/ecommerce-dashboard.png",
      date: "2024",
      status: "completed",
      technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
    },
    {
      id: "2",
      title: "Project Management App",
      description: "Collaborative project management tool with real-time updates, task tracking, and team features.",
      image: "/project-management-app.png",
      date: "2024",
      status: "completed",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
    },
    {
      id: "3",
      title: "AI Content Generator",
      description:
        "An AI-powered content generation tool that helps create blog posts, social media content, and more.",
      image: "/ai-content-dashboard.png",
      date: "2024",
      status: "in-progress",
      technologies: ["Next.js", "OpenAI", "Tailwind CSS", "Vercel"],
      githubUrl: "https://github.com/example",
    },
    {
      id: "4",
      title: "Health & Fitness Tracker",
      description:
        "Mobile-first fitness tracking application with workout plans, nutrition tracking, and progress analytics.",
      image: "/fitness-tracker-mobile-app.jpg",
      date: "2023",
      status: "completed",
      technologies: ["React Native", "Firebase", "Chart.js"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
    },
    {
      id: "5",
      title: "Real Estate Platform",
      description: "Property listing and management platform with virtual tours, booking system, and agent dashboard.",
      image: "/real-estate-website.png",
      date: "2023",
      status: "completed",
      technologies: ["Vue.js", "Laravel", "MySQL", "AWS"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
    },
    {
      id: "6",
      title: "Social Media Dashboard",
      description:
        "Analytics dashboard for social media management with scheduling, insights, and multi-platform support.",
      image: "/social-media-analytics-dashboard.png",
      date: "2023",
      status: "completed",
      technologies: ["React", "D3.js", "Express", "Redis"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
    },
    {
      id: "7",
      title: "Learning Management System",
      description: "Online education platform with course creation, student management, and progress tracking.",
      image: "/online-learning-dashboard.png",
      date: "2025",
      status: "future",
      technologies: ["Next.js", "Prisma", "PostgreSQL", "Stripe"],
    },
    {
      id: "8",
      title: "IoT Home Automation",
      description: "Smart home automation system with device control, scheduling, and energy monitoring.",
      image: "/smart-home-iot-dashboard.png",
      date: "2025",
      status: "future",
      technologies: ["React", "Node.js", "MQTT", "Raspberry Pi"],
    },
  ] as Project[],
}
