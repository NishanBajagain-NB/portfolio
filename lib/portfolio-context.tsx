"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { getPortfolioData, type PortfolioData } from "./data"

interface PortfolioContextType {
  data: PortfolioData | null
  loading: boolean
  error: string | null
  refreshData: () => Promise<void>
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refreshData = useCallback(async () => {
    try {
      setError(null)
      const portfolioData = await getPortfolioData()
      setData(portfolioData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data')
      console.error('Failed to fetch portfolio data:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshData()
    
    // Listen for portfolio data updates from admin
    const handlePortfolioUpdate = (event: CustomEvent) => {
      setData(event.detail)
    }
    
    // Listen for storage events (cross-tab updates)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'portfolioDataUpdated') {
        refreshData()
      }
    }
    
    if (typeof window !== 'undefined') {
      window.addEventListener('portfolioDataUpdated', handlePortfolioUpdate as EventListener)
      window.addEventListener('storage', handleStorageChange)
      
      return () => {
        window.removeEventListener('portfolioDataUpdated', handlePortfolioUpdate as EventListener)
        window.removeEventListener('storage', handleStorageChange)
      }
    }
  }, [refreshData])

  return (
    <PortfolioContext.Provider value={{ data, loading, error, refreshData }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolioData() {
  const context = useContext(PortfolioContext)
  if (!context) {
    throw new Error("usePortfolioData must be used within a PortfolioProvider")
  }
  return context
}
