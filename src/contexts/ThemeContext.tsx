'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type ThemeContextType = {
  isDark: boolean
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useThemeMode = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    const savedTheme = localStorage.getItem('isDark')
    setIsDark(savedTheme === 'true')
  }, [])

  useEffect(() => {
    const timerId = setTimeout(() => {
      localStorage.setItem('isDark', isDark.toString())
      document.documentElement.setAttribute(
        'data-theme',
        isDark ? 'dark' : 'light'
      )
    }, 10)

    return () => {
      clearTimeout(timerId)
    }
  }, [isDark])

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  )
}
