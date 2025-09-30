"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { apiClient, User } from "@/lib/api"

interface AuthContextType {
  user: User | null
  token: string | null
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = apiClient.getToken()
    if (storedToken) {
      setToken(storedToken)
      // Here you could fetch user profile if needed
    }
    setLoading(false)
  }, [])

  const login = async (username: string, password: string) => {
    const response = await apiClient.login({ username, password })
    
    if (response.data?.token) {
      setToken(response.data.token)
      setUser(response.data.user)
      return { success: true }
    } else {
      return { success: false, error: response.error || "Login failed" }
    }
  }

  const logout = () => {
    apiClient.logout()
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}