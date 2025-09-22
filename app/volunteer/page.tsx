"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  MapPin,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle,
  MessageCircle,
  Phone,
  Mail,
  Navigation,
  Heart,
  Truck,
  Stethoscope,
  Zap,
  Shield,
  Activity,
  RefreshCw,
  Star,
  Award,
} from "lucide-react"
import Link from "next/link"
import { demoStore, subscribeToUpdates, type Request } from "@/lib/demo-store"
import { useLanguage } from "@/contexts/language-context"

export default function VolunteerDashboard() {
  const [selectedTask, setSelectedTask] = useState<string | null>(null)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [availableRequests, setAvailableRequests] = useState<Request[]>([])
  const [assignedRequests, setAssignedRequests] = useState<Request[]>([])
  const [completedRequests, setCompletedRequests] = useState<Request[]>([])
  const [volunteerStats, setVolunteerStats] = useState({ completed: 0, rating: 4.8, status: "Available" })
  const [isAccepting, setIsAccepting] = useState<string | null>(null)
  const [isCompleting, setIsCompleting] = useState<string | null>(null)

  const { language, t } = useLanguage()

  useEffect(() => {
    const user = localStorage.getItem("sahara_user")
    if (user) {
      setCurrentUser(JSON.parse(user))
    }

    refreshData()

    const unsubscribe = subscribeToUpdates(() => {
      refreshData()
    })

    return unsubscribe
  }, [])

  const refreshData = () => {
    const allRequests = demoStore.getRequests()
    const volunteers = demoStore.getVolunteers()

    // Get current volunteer data
    const currentVolunteer = volunteers.find((v) => v.email === currentUser?.email) || volunteers[0]

    setAvailableRequests(allRequests.filter((r) => r.status === "Pending"))
    setAssignedRequests(
      allRequests.filter((r) => r.status === "Assigned" && r.assignedVolunteerId === currentVolunteer?.id),
    )
    setCompletedRequests(
      allRequests.filter((r) => r.status === "Completed" && r.assignedVolunteerId === currentVolunteer?.id),
    )

    setVolunteerStats({
      completed: currentVolunteer?.completedTasks || 0,
      rating: currentVolunteer?.rating || 4.8,
      status: currentVolunteer?.status || "Available",
    })
  }

  const handleAcceptTask = async (requestId: string) => {
    setIsAccepting(requestId)

    const volunteers = demoStore.getVolunteers()
    const currentVolunteer = volunteers.find((v) => v.email === currentUser?.email) || volunteers[0]

    if (currentVolunteer) {
      const success = demoStore.acceptRequest(requestId, currentVolunteer.id)
      if (success) {
        refreshData()
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsAccepting(null)
  }

  const handleCompleteTask = async (requestId: string) => {
    setIsCompleting(requestId)

    const volunteers = demoStore.getVolunteers()
    const currentVolunteer = volunteers.find((v) => v.email === currentUser?.email) || volunteers[0]

    if (currentVolunteer) {
      const success = demoStore.completeRequest(requestId, currentVolunteer.id)
      if (success) {
        refreshData()
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsCompleting(null)
  }

  // Mock SOS alerts - these would be real-time in production
  const sosAlerts = [
    {
      id: "SOS-001",
      location: "Riverside Avenue, Block 12",
      description: "Person trapped in flooded basement",
      priority: "Critical",
      distance: "0.8 km",
      timeAgo: "2 minutes ago",
      responders: 3,
    },
    {
      id: "SOS-002",
      location: "Main Street Shopping Center",
      description: "Medical emergency - chest pain",
      priority: "Critical",
      distance: "1.5 km",
      timeAgo: "8 minutes ago",
      responders: 2,
    },
    {
      id: "SOS-003",
      location: "Oak Park Residential",
      description: "Family needs immediate evacuation",
      priority: "High",
      distance: "2.1 km",
      timeAgo: "15 minutes ago",
      responders: 5,
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "High":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getSkillIcon = (category: string) => {
    switch (category) {
      case "medical":
        return <Stethoscope className="h-4 w-4" />
      case "transport":
        return <Truck className="h-4 w-4" />
      case "food":
      case "supplies":
        return <Heart className="h-4 w-4" />
      default:
        return <Heart className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-50 text-green-700 border-green-200"
      case "On Mission":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "Offline":
        return "bg-gray-50 text-gray-700 border-gray-200"
      default:
        return "bg-green-50 text-green-700 border-green-200"
    }
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-background via-muted/20 to-background ${language === "hi" ? "hindi-text hindi-responsive" : ""}`}
    >
      <header className="bg-gradient-to-r from-card via-card/95 to-card backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4 sm:gap-6">
              <Link
                href="/"
                className="flex items-center gap-3 text-primary hover:text-primary/80 transition-colors group"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <span className="font-bold text-lg sm:text-xl gradient-text">Sahara</span>
              </Link>
              <div className="hidden sm:block h-8 w-px bg-border/50" />
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Users className="h-3 w-3 sm:h-4 sm:w-4 text-secondary" />
                </div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">{t("volunteer.title")}</h1>
                {currentUser && (
                  <div className="ml-4 text-xs sm:text-sm text-muted-foreground">Welcome, {currentUser.name}</div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-6 w-full lg:w-auto">
              <Button
                onClick={refreshData}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 bg-transparent text-xs sm:text-sm"
              >
                <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4" />
                {t("common.refresh")}
              </Button>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Live Updates
              </div>

              <Badge
                variant="outline"
                className={`${getStatusColor(volunteerStats.status)} px-3 py-1 text-xs sm:text-sm font-semibold rounded-xl`}
              >
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full mr-2 animate-pulse" />
                {volunteerStats.status}
              </Badge>

              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-current" />
                <span className="font-semibold">{volunteerStats.rating}</span>
                <span className="text-muted-foreground">({volunteerStats.completed} tasks)</span>
              </div>

              <Avatar className="h-8 w-8 sm:h-12 sm:w-12 ring-2 ring-primary/20">
                <AvatarImage src="/placeholder.svg?height=48&width=48" />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs sm:text-sm">
                  {currentUser?.name
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("") || "VL"}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="mb-8 text-center">
          <p className="text-base sm:text-lg text-muted-foreground">{t("volunteer.welcome")}</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 sm:gap-10">
          <div className="lg:col-span-1 space-y-6 sm:space-y-8">
            <Card className="card-hover forest-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl">{t("volunteer.liveMap")}</CardTitle>
                </div>
                <CardDescription className="text-sm sm:text-base">Real-time disaster zone overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 rounded-2xl flex items-center justify-center relative overflow-hidden border border-border/50">
                  <img
                    src="/placeholder.svg?height=300&width=300&text=Interactive+Map+View"
                    alt="Live disaster map"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                    <Button
                      size="lg"
                      className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-md rounded-xl font-semibold text-sm sm:text-base"
                    >
                      <Navigation className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      Navigate
                    </Button>
                  </div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className="glass-effect px-2 sm:px-3 py-1 rounded-lg text-white text-xs sm:text-sm font-medium">
                      <Activity className="h-3 w-3 mr-1 inline" />
                      Live
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover sky-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-destructive/10 rounded-lg flex items-center justify-center animate-pulse-glow">
                    <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-destructive" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl">{t("volunteer.sosAlerts")}</CardTitle>
                </div>
                <CardDescription className="text-sm sm:text-base">Incoming emergency requests</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {sosAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="p-4 sm:p-5 border border-destructive/20 rounded-2xl bg-gradient-to-r from-destructive/5 to-destructive/10 hover:from-destructive/10 hover:to-destructive/15 transition-all duration-300 card-hover"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="outline" className={`${getPriorityColor(alert.priority)} font-semibold text-xs`}>
                        {alert.priority}
                      </Badge>
                      <span className="text-xs sm:text-sm text-muted-foreground font-medium">{alert.timeAgo}</span>
                    </div>
                    <p className="font-semibold text-sm sm:text-base mb-3">{alert.description}</p>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-4">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="truncate">{alert.location}</span>
                      <span>•</span>
                      <span className="font-medium">{alert.distance}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-muted-foreground font-medium">
                        <Users className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1" />
                        {alert.responders} responders
                      </span>
                      <Button
                        size="sm"
                        className="bg-destructive hover:bg-destructive/90 text-white font-semibold px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm"
                      >
                        <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        Respond
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <Card className="card-hover earth-card">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-secondary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg sm:text-2xl">Task Management</CardTitle>
                      <CardDescription className="text-sm sm:text-lg">
                        View and manage your volunteer assignments
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                    <span className="font-semibold text-base sm:text-lg">
                      {volunteerStats.completed} {t("volunteer.tasksCompleted")}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="available" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-1 rounded-xl">
                    <TabsTrigger value="available" className="rounded-lg font-semibold text-xs sm:text-sm">
                      {t("volunteer.availableTasks")} ({availableRequests.length})
                    </TabsTrigger>
                    <TabsTrigger value="assigned" className="rounded-lg font-semibold text-xs sm:text-sm">
                      {t("volunteer.assignedTasks")} ({assignedRequests.length})
                    </TabsTrigger>
                    <TabsTrigger value="completed" className="rounded-lg font-semibold text-xs sm:text-sm">
                      {t("volunteer.completedTasks")} ({completedRequests.length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="available" className="space-y-6 mt-8">
                    {availableRequests.map((request) => (
                      <Card key={request.id} className="card-hover forest-card">
                        <CardContent className="p-6 sm:p-8">
                          <div className="flex items-start justify-between mb-6">
                            <div>
                              <h3 className="font-bold text-lg sm:text-xl mb-2">{request.title}</h3>
                              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                                {request.description}
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className={`${getPriorityColor(request.priority)} font-semibold text-xs sm:text-sm px-2 sm:px-3 py-1`}
                            >
                              {request.priority}
                            </Badge>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                            <div className="flex items-center gap-3 text-sm sm:text-base text-muted-foreground">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                              </div>
                              <span className="font-medium truncate">{request.location}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm sm:text-base text-muted-foreground">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                                <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-secondary" />
                              </div>
                              <span className="font-medium">{new Date(request.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm sm:text-base text-muted-foreground">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                                {getSkillIcon(request.category)}
                              </div>
                              <span className="font-medium capitalize">{request.category}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm sm:text-base text-muted-foreground">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-muted rounded-lg flex items-center justify-center">
                                <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                              </div>
                              <span className="font-medium">{request.victimName}</span>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                              className="flex-1 h-10 sm:h-12 text-sm sm:text-base font-semibold rounded-xl bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
                              onClick={() => handleAcceptTask(request.id)}
                              disabled={isAccepting === request.id}
                            >
                              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                              {isAccepting === request.id ? t("common.loading") : t("volunteer.accept")}
                            </Button>
                            <Button
                              variant="outline"
                              className="h-10 sm:h-12 px-4 sm:px-6 text-sm sm:text-base font-semibold rounded-xl border-border/50 hover:bg-muted/50 bg-transparent"
                            >
                              {t("common.view")} Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {availableRequests.length === 0 && (
                      <div className="text-center py-12">
                        <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">No Available Tasks</h3>
                        <p className="text-muted-foreground text-sm sm:text-base">
                          All current requests have been assigned. Check back later for new opportunities to help.
                        </p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="assigned" className="space-y-6 mt-8">
                    {assignedRequests.map((request) => (
                      <Card
                        key={request.id}
                        className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 card-hover"
                      >
                        <CardContent className="p-6 sm:p-8">
                          <div className="flex items-start justify-between mb-6">
                            <div>
                              <h3 className="font-bold text-lg sm:text-xl mb-2">{request.title}</h3>
                              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                                {request.description}
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className="bg-blue-100 text-blue-800 border-blue-200 font-semibold text-xs sm:text-sm px-2 sm:px-3 py-1"
                            >
                              <Activity className="h-3 w-3 mr-1" />
                              In Progress
                            </Badge>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                            <div className="flex items-center gap-3 text-sm sm:text-base text-muted-foreground">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                              </div>
                              <span className="font-medium truncate">{request.location}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm sm:text-base text-muted-foreground">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                                <Users className="h-3 w-3 sm:h-4 sm:w-4 text-secondary" />
                              </div>
                              <span className="font-medium">{request.victimName}</span>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                              variant="outline"
                              className="flex-1 h-10 sm:h-12 text-sm sm:text-base font-semibold rounded-xl bg-white/50 hover:bg-white/80 border-primary/20"
                              onClick={() => handleCompleteTask(request.id)}
                              disabled={isCompleting === request.id}
                            >
                              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                              {isCompleting === request.id ? t("common.loading") : t("volunteer.complete")}
                            </Button>
                            <Button
                              variant="outline"
                              className="h-10 sm:h-12 px-4 sm:px-6 text-sm sm:text-base font-semibold rounded-xl border-border/50 hover:bg-muted/50 bg-transparent"
                            >
                              <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                              Contact Coordinator
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {assignedRequests.length === 0 && (
                      <div className="text-center py-12">
                        <Clock className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">No Assigned Tasks</h3>
                        <p className="text-muted-foreground text-sm sm:text-base">
                          You don't have any tasks assigned yet. Check the Available tab for new opportunities.
                        </p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="completed" className="space-y-6 mt-8">
                    {completedRequests.map((request) => (
                      <Card
                        key={request.id}
                        className="border-green-200 bg-gradient-to-br from-green-50 to-green-100/50 card-hover"
                      >
                        <CardContent className="p-6 sm:p-8">
                          <div className="flex items-start justify-between mb-6">
                            <div>
                              <h3 className="font-bold text-lg sm:text-xl mb-2">{request.title}</h3>
                              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                                {request.description}
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className="bg-green-100 text-green-800 border-green-200 font-semibold text-xs sm:text-sm px-2 sm:px-3 py-1"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              {t("volunteer.completedTasks")}
                            </Badge>
                          </div>

                          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 text-sm sm:text-base text-muted-foreground">
                            <div className="font-medium">
                              Completed: {new Date(request.updatedAt).toLocaleDateString()}
                            </div>
                            <div className="font-medium">Victim: {request.victimName}</div>
                            <div className="font-medium">Location: {request.location}</div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {completedRequests.length === 0 && (
                      <div className="text-center py-12">
                        <Award className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">No Completed Tasks Yet</h3>
                        <p className="text-muted-foreground text-sm sm:text-base">
                          Complete your first task to see your achievements here.
                        </p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1 space-y-6 sm:space-y-8">
            <Card className="card-hover sky-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                    <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 text-accent" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl">{t("volunteer.communications")}</CardTitle>
                </div>
                <CardDescription className="text-sm sm:text-base">Stay connected with your team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-3 sm:p-4 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl border border-border/30">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                        <AvatarFallback className="text-xs sm:text-sm bg-primary/10 text-primary font-semibold">
                          TC
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-semibold text-sm sm:text-base">Team Coordinator</span>
                      <span className="text-xs sm:text-sm text-muted-foreground ml-auto">2m ago</span>
                    </div>
                    <p className="text-sm sm:text-base leading-relaxed">
                      New medical supplies have arrived at Zone A distribution center.
                    </p>
                  </div>

                  <div className="p-3 sm:p-4 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl border border-border/30">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                        <AvatarFallback className="text-xs sm:text-sm bg-secondary/10 text-secondary font-semibold">
                          VS
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-semibold text-sm sm:text-base">Volunteer Sarah</span>
                      <span className="text-xs sm:text-sm text-muted-foreground ml-auto">15m ago</span>
                    </div>
                    <p className="text-sm sm:text-base leading-relaxed">
                      Food distribution at Community Center is running ahead of schedule!
                    </p>
                  </div>

                  <div className="p-3 sm:p-4 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl border border-border/30">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                        <AvatarFallback className="text-xs sm:text-sm bg-accent/10 text-accent font-semibold">
                          EM
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-semibold text-sm sm:text-base">Emergency Manager</span>
                      <span className="text-xs sm:text-sm text-muted-foreground ml-auto">1h ago</span>
                    </div>
                    <p className="text-sm sm:text-base leading-relaxed">
                      Weather update: Rain expected to stop by 3 PM. Continue outdoor operations.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Textarea
                    placeholder="Type your message..."
                    rows={3}
                    className="text-sm sm:text-base border-border/50 focus:border-primary/50 rounded-xl resize-none"
                  />
                  <Button className="w-full h-10 sm:h-12 text-sm sm:text-base font-semibold rounded-xl bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300">
                    <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover earth-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-secondary" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl">{t("volunteer.quickContacts")}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/10 hover:border-primary/20 transition-colors">
                  <div>
                    <div className="font-semibold text-sm sm:text-base">Team Leader</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Zone A Coordinator</div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/50 hover:bg-white/80 border-primary/20 rounded-lg h-8 w-8 sm:h-10 sm:w-10 p-0"
                    >
                      <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/50 hover:bg-white/80 border-primary/20 rounded-lg h-8 w-8 sm:h-10 sm:w-10 p-0"
                    >
                      <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-destructive/5 to-destructive/10 rounded-xl border border-destructive/10 hover:border-destructive/20 transition-colors">
                  <div>
                    <div className="font-semibold text-sm sm:text-base">Emergency Dispatch</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">24/7 Support</div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/50 hover:bg-white/80 border-destructive/20 rounded-lg h-8 w-8 sm:h-10 sm:w-10 p-0"
                    >
                      <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/50 hover:bg-white/80 border-destructive/20 rounded-lg h-8 w-8 sm:h-10 sm:w-10 p-0"
                    >
                      <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-secondary/5 to-secondary/10 rounded-xl border border-secondary/10 hover:border-secondary/20 transition-colors">
                  <div>
                    <div className="font-semibold text-sm sm:text-base">Medical Team</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Health Services</div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/50 hover:bg-white/80 border-secondary/20 rounded-lg h-8 w-8 sm:h-10 sm:w-10 p-0"
                    >
                      <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/50 hover:bg-white/80 border-secondary/20 rounded-lg h-8 w-8 sm:h-10 sm:w-10 p-0"
                    >
                      <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
