"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"
import { demoStore, subscribeToUpdates, type Request, type Volunteer, type User } from "@/lib/demo-store"

// State interface
interface AppState {
  user: User | null
  requests: Request[]
  volunteers: Volunteer[]
  stats: {
    total: number
    completed: number
    inProgress: number
    pending: number
    rejected: number
  }
  userStats: {
    total: number
    solved: number
    inProgress: number
    rejected: number
  }
  isLoading: boolean
  error: string | null
}

// Action types
type AppAction =
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_REQUESTS"; payload: Request[] }
  | { type: "SET_VOLUNTEERS"; payload: Volunteer[] }
  | { type: "SET_STATS"; payload: AppState["stats"] }
  | { type: "SET_USER_STATS"; payload: AppState["userStats"] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "ADD_REQUEST"; payload: Request }
  | { type: "UPDATE_REQUEST"; payload: Request }
  | { type: "REFRESH_DATA" }

// Initial state
const initialState: AppState = {
  user: null,
  requests: [],
  volunteers: [],
  stats: { total: 0, completed: 0, inProgress: 0, pending: 0, rejected: 0 },
  userStats: { total: 0, solved: 0, inProgress: 0, rejected: 0 },
  isLoading: false,
  error: null,
}

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload }
    case "SET_REQUESTS":
      return { ...state, requests: action.payload }
    case "SET_VOLUNTEERS":
      return { ...state, volunteers: action.payload }
    case "SET_STATS":
      return { ...state, stats: action.payload }
    case "SET_USER_STATS":
      return { ...state, userStats: action.payload }
    case "SET_LOADING":
      return { ...state, isLoading: action.payload }
    case "SET_ERROR":
      return { ...state, error: action.payload }
    case "ADD_REQUEST":
      return {
        ...state,
        requests: [action.payload, ...state.requests],
        userStats: {
          ...state.userStats,
          total: state.userStats.total + 1,
        },
      }
    case "UPDATE_REQUEST":
      return {
        ...state,
        requests: state.requests.map((req) => (req.id === action.payload.id ? action.payload : req)),
      }
    case "REFRESH_DATA":
      // This will trigger a data refresh in the provider
      return state
    default:
      return state
  }
}

// Context
interface AppContextType {
  state: AppState
  dispatch: React.Dispatch<AppAction>
  // Action creators
  setUser: (user: User | null) => void
  addRequest: (request: Omit<Request, "id" | "createdAt" | "updatedAt">) => Promise<Request>
  updateRequestStatus: (
    requestId: string,
    status: Request["status"],
    volunteerId?: string,
    volunteerName?: string,
  ) => Promise<void>
  acceptRequest: (requestId: string, volunteerId: string) => Promise<boolean>
  completeRequest: (requestId: string, volunteerId: string) => Promise<boolean>
  refreshData: () => void
  submitSOS: (location?: string) => Promise<Request>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

// Provider component
interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Initialize user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("sahara_user")
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser)
        dispatch({ type: "SET_USER", payload: user })
      } catch (error) {
        console.error("Failed to parse saved user:", error)
        localStorage.removeItem("sahara_user")
      }
    }
  }, [])

  // Load initial data and subscribe to updates
  useEffect(() => {
    const loadData = () => {
      const allRequests = demoStore.getRequests()
      const allVolunteers = demoStore.getVolunteers()
      const globalStats = demoStore.getStats()

      dispatch({ type: "SET_REQUESTS", payload: allRequests })
      dispatch({ type: "SET_VOLUNTEERS", payload: allVolunteers })
      dispatch({ type: "SET_STATS", payload: globalStats })

      // Load user-specific data if user is logged in
      if (state.user) {
        const userRequests = demoStore.getRequestsByVictim(state.user.id)
        const userStats = demoStore.getVictimStats(state.user.id)
        dispatch({ type: "SET_REQUESTS", payload: userRequests })
        dispatch({ type: "SET_USER_STATS", payload: userStats })
      }
    }

    loadData()

    // Subscribe to real-time updates
    const unsubscribe = subscribeToUpdates(() => {
      loadData()
    })

    return unsubscribe
  }, [state.user])

  // Action creators
  const setUser = (user: User | null) => {
    dispatch({ type: "SET_USER", payload: user })
    if (user) {
      localStorage.setItem("sahara_user", JSON.stringify(user))
    } else {
      localStorage.removeItem("sahara_user")
    }
  }

  const addRequest = async (requestData: Omit<Request, "id" | "createdAt" | "updatedAt">): Promise<Request> => {
    dispatch({ type: "SET_LOADING", payload: true })
    dispatch({ type: "SET_ERROR", payload: null })

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newRequest = demoStore.addRequest(requestData)
      dispatch({ type: "ADD_REQUEST", payload: newRequest })

      // Update user stats
      if (state.user) {
        const userStats = demoStore.getVictimStats(state.user.id)
        dispatch({ type: "SET_USER_STATS", payload: userStats })
      }

      return newRequest
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to add request"
      dispatch({ type: "SET_ERROR", payload: errorMessage })
      throw error
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const updateRequestStatus = async (
    requestId: string,
    status: Request["status"],
    volunteerId?: string,
    volunteerName?: string,
  ): Promise<void> => {
    dispatch({ type: "SET_LOADING", payload: true })
    dispatch({ type: "SET_ERROR", payload: null })

    try {
      const updatedRequest = demoStore.updateRequestStatus(requestId, status, volunteerId, volunteerName)
      if (updatedRequest) {
        dispatch({ type: "UPDATE_REQUEST", payload: updatedRequest })

        // Update stats
        const globalStats = demoStore.getStats()
        dispatch({ type: "SET_STATS", payload: globalStats })

        if (state.user) {
          const userStats = demoStore.getVictimStats(state.user.id)
          dispatch({ type: "SET_USER_STATS", payload: userStats })
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to update request"
      dispatch({ type: "SET_ERROR", payload: errorMessage })
      throw error
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const acceptRequest = async (requestId: string, volunteerId: string): Promise<boolean> => {
    dispatch({ type: "SET_LOADING", payload: true })
    dispatch({ type: "SET_ERROR", payload: null })

    try {
      const success = demoStore.acceptRequest(requestId, volunteerId)
      if (success) {
        // Refresh all data
        const allRequests = demoStore.getRequests()
        const allVolunteers = demoStore.getVolunteers()
        const globalStats = demoStore.getStats()

        dispatch({ type: "SET_REQUESTS", payload: allRequests })
        dispatch({ type: "SET_VOLUNTEERS", payload: allVolunteers })
        dispatch({ type: "SET_STATS", payload: globalStats })
      }
      return success
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to accept request"
      dispatch({ type: "SET_ERROR", payload: errorMessage })
      return false
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const completeRequest = async (requestId: string, volunteerId: string): Promise<boolean> => {
    dispatch({ type: "SET_LOADING", payload: true })
    dispatch({ type: "SET_ERROR", payload: null })

    try {
      const success = demoStore.completeRequest(requestId, volunteerId)
      if (success) {
        // Refresh all data
        const allRequests = demoStore.getRequests()
        const allVolunteers = demoStore.getVolunteers()
        const globalStats = demoStore.getStats()

        dispatch({ type: "SET_REQUESTS", payload: allRequests })
        dispatch({ type: "SET_VOLUNTEERS", payload: allVolunteers })
        dispatch({ type: "SET_STATS", payload: globalStats })
      }
      return success
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to complete request"
      dispatch({ type: "SET_ERROR", payload: errorMessage })
      return false
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const refreshData = () => {
    dispatch({ type: "REFRESH_DATA" })
  }

  const submitSOS = async (location?: string): Promise<Request> => {
    const sosRequest = {
      title: "🚨 EMERGENCY SOS ALERT",
      description: "Emergency assistance needed immediately at current location",
      category: "medical",
      location: location || state.user?.location || "Current Location",
      priority: "Critical" as const,
      status: "Pending" as const,
      victimId: state.user?.id || "victim1",
      victimName: state.user?.name || "Demo User",
    }

    return addRequest(sosRequest)
  }

  const contextValue: AppContextType = {
    state,
    dispatch,
    setUser,
    addRequest,
    updateRequestStatus,
    acceptRequest,
    completeRequest,
    refreshData,
    submitSOS,
  }

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

// Custom hook to use the context
export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}

// Specialized hooks for different user types
export function useAuth() {
  const { state, setUser } = useApp()

  const login = (userData: User) => {
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
  }

  const isAuthenticated = !!state.user

  return {
    user: state.user,
    isAuthenticated,
    login,
    logout,
  }
}

export function useRequests() {
  const { state, addRequest, updateRequestStatus, refreshData } = useApp()

  const getUserRequests = () => {
    if (!state.user) return []
    return state.requests.filter((req) => req.victimId === state.user.id)
  }

  const getPendingRequests = () => {
    return state.requests.filter((req) => req.status === "Pending")
  }

  const getAssignedRequests = (volunteerId: string) => {
    return state.requests.filter((req) => req.assignedVolunteerId === volunteerId)
  }

  return {
    requests: state.requests,
    userRequests: getUserRequests(),
    pendingRequests: getPendingRequests(),
    getAssignedRequests,
    addRequest,
    updateRequestStatus,
    refreshData,
    isLoading: state.isLoading,
    error: state.error,
  }
}

export function useVolunteers() {
  const { state, acceptRequest, completeRequest } = useApp()

  const getAvailableVolunteers = () => {
    return state.volunteers.filter((vol) => vol.status === "Available")
  }

  const getVolunteerById = (id: string) => {
    return state.volunteers.find((vol) => vol.id === id)
  }

  return {
    volunteers: state.volunteers,
    availableVolunteers: getAvailableVolunteers(),
    getVolunteerById,
    acceptRequest,
    completeRequest,
    isLoading: state.isLoading,
    error: state.error,
  }
}

export function useStats() {
  const { state } = useApp()

  return {
    globalStats: state.stats,
    userStats: state.userStats,
  }
}

export function useEmergency() {
  const { submitSOS, state } = useApp()

  const sendSOS = async (location?: string) => {
    return submitSOS(location)
  }

  return {
    sendSOS,
    isLoading: state.isLoading,
    error: state.error,
  }
}
