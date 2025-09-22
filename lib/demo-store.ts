export interface User {
  id: string
  name: string
  email: string
  role: "victim" | "volunteer" | "admin"
  phone?: string
  location?: string
  skills?: string
  organization?: string
}

export interface Request {
  id: string
  title: string
  description: string
  category: string
  location: string
  priority: "Low" | "Medium" | "High" | "Critical"
  status: "Pending" | "Assigned" | "In Progress" | "Completed" | "Rejected"
  victimId: string
  victimName: string
  assignedVolunteerId?: string
  assignedVolunteerName?: string
  createdAt: string
  updatedAt: string
  images?: string[]
}

export interface Volunteer {
  id: string
  name: string
  email: string
  phone: string
  location: string
  skills: string
  status: "Available" | "On Mission" | "Offline"
  rating: number
  completedTasks: number
}

// Demo data
const demoRequests: Request[] = [
  {
    id: "REQ-001",
    title: "Medical Supplies Needed",
    description: "Need insulin and basic medical supplies for diabetic patient",
    category: "medical",
    location: "MG Road, Bangalore",
    priority: "High",
    status: "Completed",
    victimId: "victim1",
    victimName: "Ramesh Kumar",
    assignedVolunteerId: "vol1",
    assignedVolunteerName: "Dr. Priya Sharma",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T14:30:00Z",
  },
  {
    id: "REQ-002",
    title: "Temporary Shelter",
    description: "Family of 4 needs temporary shelter after house damage",
    category: "shelter",
    location: "Connaught Place, Delhi",
    priority: "Critical",
    status: "In Progress",
    victimId: "victim1",
    victimName: "Ramesh Kumar",
    assignedVolunteerId: "vol2",
    assignedVolunteerName: "Rohan Mehta",
    createdAt: "2024-01-14T08:00:00Z",
    updatedAt: "2024-01-14T12:00:00Z",
  },
  {
    id: "REQ-003",
    title: "Food and Water",
    description: "Urgent need for clean water and non-perishable food items",
    category: "food",
    location: "Andheri East, Mumbai",
    priority: "High",
    status: "Assigned",
    victimId: "victim2",
    victimName: "Sonal Gupta",
    assignedVolunteerId: "vol3",
    assignedVolunteerName: "Ananya Singh",
    createdAt: "2024-01-13T15:00:00Z",
    updatedAt: "2024-01-13T16:00:00Z",
  },
  {
    id: "REQ-004",
    title: "Transportation Help",
    description: "Need transportation to evacuation center",
    category: "transport",
    location: "Salt Lake, Kolkata",
    priority: "Medium",
    status: "Pending",
    victimId: "victim3",
    victimName: "Vikram Nair",
    createdAt: "2024-01-12T09:00:00Z",
    updatedAt: "2024-01-12T09:00:00Z",
  },
  // {
  //   id: "REQ-005",
  //   title: "Emergency Medication Delivery",
  //   description: "Elderly patient needs heart medication urgently - prescription ready at pharmacy",
  //   category: "medical",
  //   location: "Banjara Hills, Hyderabad",
  //   priority: "Critical",
  //   status: "Pending",
  //   victimId: "victim4",
  //   victimName: "Shobha Reddy",
  //   createdAt: "2024-01-16T07:30:00Z",
  //   updatedAt: "2024-01-16T07:30:00Z",
  // },
  // {
  //   id: "REQ-006",
  //   title: "Debris Removal",
  //   description: "Tree fallen across driveway, blocking emergency vehicle access",
  //   category: "rescue",
  //   location: "Koramangala, Bangalore",
  //   priority: "High",
  //   status: "Pending",
  //   victimId: "victim5",
  //   victimName: "Arjun Sharma",
  //   createdAt: "2024-01-16T06:15:00Z",
  //   updatedAt: "2024-01-16T06:15:00Z",
  // },
  // {
  //   id: "REQ-007",
  //   title: "Baby Formula and Supplies",
  //   description: "New mother needs baby formula, diapers, and infant supplies",
  //   category: "supplies",
  //   location: "Central Mumbai",
  //   priority: "High",
  //   status: "Pending",
  //   victimId: "victim6",
  //   victimName: "Priya Mehta",
  //   createdAt: "2024-01-16T05:45:00Z",
  //   updatedAt: "2024-01-16T05:45:00Z",
  // },
  // {
  //   id: "REQ-008",
  //   title: "Pet Rescue and Care",
  //   description: "Two cats trapped in flooded basement, need immediate rescue",
  //   category: "rescue",
  //   location: "Riverside Area, Pune",
  //   priority: "Medium",
  //   status: "Pending",
  //   victimId: "victim7",
  //   victimName: "Anjali Kapoor",
  //   createdAt: "2024-01-16T04:20:00Z",
  //   updatedAt: "2024-01-16T04:20:00Z",
  // },
  {
    id: "REQ-009",
    title: "Generator and Power Tools",
    description: "Need portable generator to power medical equipment for disabled resident",
    category: "equipment",
    location: "Hillside Colony, Jaipur",
    priority: "Critical",
    status: "Pending",
    victimId: "victim8",
    victimName: "Rohit Verma",
    createdAt: "2024-01-16T03:10:00Z",
    updatedAt: "2024-01-16T03:10:00Z",
  },
  {
    id: "REQ-010",
    title: "Warm Clothing and Blankets",
    description: "Family lost everything in flood, need warm clothes and bedding",
    category: "supplies",
    location: "Valley View, Manali",
    priority: "Medium",
    status: "Pending",
    victimId: "victim9",
    victimName: "Sonia Sharma",
    createdAt: "2024-01-16T02:30:00Z",
    updatedAt: "2024-01-16T02:30:00Z",
  },
]

const demoVolunteers: Volunteer[] = [
  {
    id: "vol1",
    name: "Dr. Priya Sharma",
    email: "priya@volunteer.in",
    phone: "+91-98765-01001",
    location: "MG Road, Bangalore",
    skills: "Medical aid, First aid, Emergency response",
    status: "Available",
    rating: 4.9,
    completedTasks: 23,
  },
  {
    id: "vol2",
    name: "Rohan Mehta",
    email: "rohan@volunteer.in",
    phone: "+91-98765-01002",
    location: "Connaught Place, Delhi",
    skills: "Construction, Shelter setup, Heavy lifting",
    status: "On Mission",
    rating: 4.7,
    completedTasks: 18,
  },
  {
    id: "vol3",
    name: "Ananya Singh",
    email: "ananya@volunteer.in",
    phone: "+91-98765-01003",
    location: "Andheri East, Mumbai",
    skills: "Food distribution, Logistics, Translation",
    status: "Available",
    rating: 4.8,
    completedTasks: 31,
  },
  {
    id: "vol4",
    name: "Vikram Rao",
    email: "vikram@volunteer.in",
    phone: "+91-98765-01004",
    location: "Salt Lake, Kolkata",
    skills: "Transportation, Vehicle maintenance, Navigation",
    status: "Available",
    rating: 4.6,
    completedTasks: 15,
  },
  {
    id: "vol5",
    name: "Dr. Nisha Patel",
    email: "nisha@volunteer.in",
    phone: "+91-98765-01005",
    location: "Banjara Hills, Hyderabad",
    skills: "Emergency medicine, Pediatric care, Pharmacy",
    status: "Available",
    rating: 4.9,
    completedTasks: 42,
  },
  {
    id: "vol6",
    name: "Saurabh Gupta",
    email: "saurabh@volunteer.in",
    phone: "+91-98765-01006",
    location: "Koramangala, Bangalore",
    skills: "Tree removal, Heavy machinery, Construction",
    status: "Available",
    rating: 4.5,
    completedTasks: 28,
  },
  {
    id: "vol7",
    name: "Aditi Verma",
    email: "aditi@volunteer.in",
    phone: "+91-98765-01007",
    location: "Central Mumbai",
    skills: "Childcare, Family support, Supply distribution",
    status: "Available",
    rating: 4.8,
    completedTasks: 35,
  },
  {
    id: "vol8",
    name: "Rahul Desai",
    email: "rahul@volunteer.in",
    phone: "+91-98765-01008",
    location: "Riverside Area, Pune",
    skills: "Animal rescue, Veterinary aid, Water rescue",
    status: "Available",
    rating: 4.7,
    completedTasks: 19,
  },
]

// Demo store functions
export const demoStore = {
  // Request management
  getRequests: (): Request[] => [...demoRequests],

  getRequestsByVictim: (victimId: string): Request[] => demoRequests.filter((req) => req.victimId === victimId),

  addRequest: (request: Omit<Request, "id" | "createdAt" | "updatedAt">): Request => {
    const newRequest: Request = {
      ...request,
      id: `REQ-${String(demoRequests.length + 1).padStart(3, "0")}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    demoRequests.unshift(newRequest)
    return newRequest
  },

  updateRequestStatus: (
    requestId: string,
    status: Request["status"],
    volunteerId?: string,
    volunteerName?: string,
  ): Request | null => {
    const requestIndex = demoRequests.findIndex((req) => req.id === requestId)
    if (requestIndex === -1) return null

    demoRequests[requestIndex] = {
      ...demoRequests[requestIndex],
      status,
      assignedVolunteerId: volunteerId,
      assignedVolunteerName: volunteerName,
      updatedAt: new Date().toISOString(),
    }

    return demoRequests[requestIndex]
  },

  // Volunteer management
  getVolunteers: (): Volunteer[] => [...demoVolunteers],

  getAvailableVolunteers: (): Volunteer[] => demoVolunteers.filter((vol) => vol.status === "Available"),

  updateVolunteerStatus: (volunteerId: string, status: Volunteer["status"]): Volunteer | null => {
    const volunteerIndex = demoVolunteers.findIndex((vol) => vol.id === volunteerId)
    if (volunteerIndex === -1) return null

    demoVolunteers[volunteerIndex] = {
      ...demoVolunteers[volunteerIndex],
      status,
    }

    return demoVolunteers[volunteerIndex]
  },

  // Accept request (volunteer action)
  acceptRequest: (requestId: string, volunteerId: string): boolean => {
    const volunteer = demoVolunteers.find((vol) => vol.id === volunteerId)
    if (!volunteer) return false

    const updated = demoStore.updateRequestStatus(requestId, "Assigned", volunteerId, volunteer.name)
    if (updated) {
      demoStore.updateVolunteerStatus(volunteerId, "On Mission")
      return true
    }
    return false
  },

  // Complete request (volunteer action)
  completeRequest: (requestId: string, volunteerId: string): boolean => {
    const updated = demoStore.updateRequestStatus(requestId, "Completed")
    if (updated) {
      demoStore.updateVolunteerStatus(volunteerId, "Available")
      // Increment completed tasks
      const volunteerIndex = demoVolunteers.findIndex((vol) => vol.id === volunteerId)
      if (volunteerIndex !== -1) {
        demoVolunteers[volunteerIndex].completedTasks += 1
      }
      return true
    }
    return false
  },

  // Get statistics
  getStats: () => {
    const total = demoRequests.length
    const completed = demoRequests.filter((req) => req.status === "Completed").length
    const inProgress = demoRequests.filter((req) => req.status === "In Progress" || req.status === "Assigned").length
    const pending = demoRequests.filter((req) => req.status === "Pending").length
    const rejected = demoRequests.filter((req) => req.status === "Rejected").length

    return { total, completed, inProgress, pending, rejected }
  },

  // Get victim stats
  getVictimStats: (victimId: string) => {
    const requests = demoStore.getRequestsByVictim(victimId)
    const total = requests.length
    const solved = requests.filter((req) => req.status === "Completed").length
    const inProgress = requests.filter((req) => req.status === "In Progress" || req.status === "Assigned").length
    const rejected = requests.filter((req) => req.status === "Rejected").length

    return { total, solved, inProgress, rejected }
  },
}

// Event system for real-time updates
type EventCallback = () => void
const eventCallbacks: EventCallback[] = []

export const subscribeToUpdates = (callback: EventCallback) => {
  eventCallbacks.push(callback)
  return () => {
    const index = eventCallbacks.indexOf(callback)
    if (index > -1) eventCallbacks.splice(index, 1)
  }
}

export const notifyUpdates = () => {
  eventCallbacks.forEach((callback) => callback())
}

// Simulate real-time updates
if (typeof window !== "undefined") {
  setInterval(() => {
    // Randomly update some request statuses for demo
    const pendingRequests = demoRequests.filter((req) => req.status === "Pending")
    if (pendingRequests.length > 0 && Math.random() < 0.1) {
      const randomRequest = pendingRequests[Math.floor(Math.random() * pendingRequests.length)]
      const availableVolunteers = demoStore.getAvailableVolunteers()
      if (availableVolunteers.length > 0) {
        const randomVolunteer = availableVolunteers[Math.floor(Math.random() * availableVolunteers.length)]
        demoStore.acceptRequest(randomRequest.id, randomVolunteer.id)
        notifyUpdates()
      }
    }
  }, 10000) // Check every 10 seconds
}
