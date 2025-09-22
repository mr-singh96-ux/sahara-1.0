"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  TrendingUp,
  Activity,
  Shield,
  Brain,
  UserCheck,
  ClipboardList,
  BarChart3,
  RefreshCw,
  Send,
  Eye,
} from "lucide-react"
import Link from "next/link"
import { demoStore, subscribeToUpdates, type Request, type Volunteer } from "@/lib/demo-store"
import { useLanguage } from "@/contexts/language-context"

export default function AdminDashboard() {
  const { t } = useLanguage()

  const [selectedRequest, setSelectedRequest] = useState<string>("")
  const [selectedVolunteer, setSelectedVolunteer] = useState<string>("")
  const [requests, setRequests] = useState<Request[]>([])
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [stats, setStats] = useState({ total: 0, completed: 0, inProgress: 0, pending: 0, rejected: 0 })
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [selectedRequestDetails, setSelectedRequestDetails] = useState<Request | null>(null)
  const [isAssigning, setIsAssigning] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem("sahara_user")
    if (user) {
      setCurrentUser(JSON.parse(user))
    }

    // Load initial data
    refreshData()

    const unsubscribe = subscribeToUpdates(() => {
      refreshData()
    })

    return unsubscribe
  }, [])

  const refreshData = () => {
    const allRequests = demoStore.getRequests()
    const allVolunteers = demoStore.getVolunteers()
    const allStats = demoStore.getStats()

    setRequests(allRequests)
    setVolunteers(allVolunteers)
    setStats(allStats)
  }

  const analytics = {
    activeVolunteers: volunteers.filter((v) => v.status === "Available" || v.status === "On Mission").length,
    totalVictims: new Set(requests.map((r) => r.victimId)).size,
    tasksInProgress: stats.inProgress,
    completedTasks: stats.completed,
    criticalAlerts: requests.filter((r) => r.priority === "Critical" && r.status === "Pending").length,
    responseTime: "12 min",
  }

  const pendingRequests = requests.filter((r) => r.status === "Pending")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800 border-green-200"
      case "On Mission":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Offline":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

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

  const handleAssignTask = async () => {
    if (selectedRequest && selectedVolunteer) {
      setIsAssigning(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const success = demoStore.acceptRequest(selectedRequest, selectedVolunteer)

      if (success) {
        refreshData()
        setSelectedRequest("")
        setSelectedVolunteer("")
        setSelectedRequestDetails(null)
      }

      setIsAssigning(false)
    }
  }

  const handleViewRequest = (requestId: string) => {
    const request = requests.find((r) => r.id === requestId)
    setSelectedRequestDetails(request || null)
    setSelectedRequest(requestId)
  }

  const handleUpdateStatus = async (requestId: string, newStatus: Request["status"]) => {
    const updated = demoStore.updateRequestStatus(requestId, newStatus)
    if (updated) {
      refreshData()
    }
  }

  const handleUpdateVolunteerStatus = async (volunteerId: string, newStatus: Volunteer["status"]) => {
    const updated = demoStore.updateVolunteerStatus(volunteerId, newStatus)
    if (updated) {
      refreshData()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="bg-gradient-to-r from-card via-card/95 to-card backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="flex items-center gap-3 text-primary hover:text-primary/80 transition-colors group"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Shield className="h-5 w-5" />
                </div>
                <span className="font-bold text-xl gradient-text">Sahara</span>
              </Link>
              <div className="h-8 w-px bg-border/50" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <h1 className="text-3xl font-bold text-foreground">{t("admin.dashboard")}</h1>
                {currentUser && (
                  <div className="ml-4 text-sm text-muted-foreground">
                    {/* Using translation for welcome message */}
                    {t("admin.welcome.user")}, {currentUser.name}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                onClick={refreshData}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 bg-transparent"
              >
                <RefreshCw className="h-4 w-4" />
                {t("admin.refresh")}
              </Button>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                {t("admin.liveUpdates")}
              </div>

              <Badge variant="outline" className="forest-card">
                <Shield className="h-3 w-3 mr-1" />
                {t("admin.administrator")}
              </Badge>

              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {currentUser?.name
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("") || "AD"}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-10">
          <Card className="forest-card card-hover">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground">{analytics.activeVolunteers}</div>
                  <div className="text-sm font-medium text-muted-foreground">{t("admin.stats.activeVolunteers")}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="earth-card card-hover">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-secondary/10 rounded-xl">
                  <UserCheck className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground">{analytics.totalVictims}</div>
                  <div className="text-sm font-medium text-muted-foreground">{t("admin.stats.totalVictims")}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="sky-card card-hover">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-accent/10 rounded-xl">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground">{analytics.tasksInProgress}</div>
                  <div className="text-sm font-medium text-muted-foreground">{t("admin.stats.tasksInProgress")}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stats-card card-hover">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-xl">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground">{analytics.completedTasks}</div>
                  <div className="text-sm font-medium text-muted-foreground">{t("admin.stats.completedTasks")}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stats-card card-hover">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-100 rounded-xl">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground">{analytics.criticalAlerts}</div>
                  <div className="text-sm font-medium text-muted-foreground">{t("admin.stats.criticalAlerts")}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stats-card card-hover">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground">{analytics.responseTime}</div>
                  <div className="text-sm font-medium text-muted-foreground">{t("admin.stats.avgResponse")}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <Card className="card-hover forest-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{t("admin.volunteer.management")}</CardTitle>
                      <CardDescription className="text-lg">{t("admin.volunteer.monitor")}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl border border-border/50 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/30">
                        <TableHead className="font-semibold">{t("admin.volunteer.name")}</TableHead>
                        <TableHead className="font-semibold">{t("admin.volunteer.status")}</TableHead>
                        <TableHead className="font-semibold">{t("admin.volunteer.location")}</TableHead>
                        <TableHead className="font-semibold">{t("admin.volunteer.skills")}</TableHead>
                        <TableHead className="font-semibold">{t("admin.volunteer.tasks")}</TableHead>
                        <TableHead className="font-semibold">{t("admin.volunteer.rating")}</TableHead>
                        <TableHead className="font-semibold">{t("admin.volunteer.actions")}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {volunteers.map((volunteer) => (
                        <TableRow key={volunteer.id} className="hover:bg-muted/20 transition-colors">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                                <AvatarFallback className="bg-primary/10 text-primary text-sm">
                                  {volunteer.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-semibold">{volunteer.name}</div>
                                <div className="text-sm text-muted-foreground">{volunteer.id}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={volunteer.status}
                              onValueChange={(value) =>
                                handleUpdateVolunteerStatus(volunteer.id, value as Volunteer["status"])
                              }
                            >
                              <SelectTrigger className="w-32">
                                <Badge variant="outline" className={getStatusColor(volunteer.status)}>
                                  {t(`admin.volunteer.${volunteer.status.toLowerCase().replace(" ", "")}`)}
                                </Badge>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Available">{t("admin.volunteer.available")}</SelectItem>
                                <SelectItem value="On Mission">{t("admin.volunteer.onMission")}</SelectItem>
                                <SelectItem value="Offline">{t("admin.volunteer.offline")}</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="font-medium">{volunteer.location}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {volunteer.skills
                                .split(", ")
                                .slice(0, 2)
                                .map((skill) => (
                                  <Badge key={skill} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold">{volunteer.completedTasks}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <span className="text-sm font-semibold">{volunteer.rating}</span>
                              <span className="text-yellow-500 text-lg">★</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="text-xs bg-transparent">
                                <Send className="h-3 w-3 mr-1" />
                                {t("admin.volunteer.contact")}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover earth-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <ClipboardList className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{t("admin.task.assignment")}</CardTitle>
                    <CardDescription className="text-lg">{t("admin.task.assignPending")}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-base font-semibold">{t("admin.task.selectRequest")}</label>
                      <Select
                        value={selectedRequest}
                        onValueChange={(value) => {
                          setSelectedRequest(value)
                          handleViewRequest(value)
                        }}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder={t("admin.task.chooseRequest")} />
                        </SelectTrigger>
                        <SelectContent>
                          {pendingRequests.map((request) => (
                            <SelectItem key={request.id} value={request.id}>
                              <div className="flex items-center gap-2 py-1">
                                <Badge variant="outline" className={getPriorityColor(request.priority)}>
                                  {t(`priority.${request.priority.toLowerCase()}`)}
                                </Badge>
                                <span className="font-medium">{request.title}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <label className="text-base font-semibold">{t("admin.task.selectVolunteer")}</label>
                      <Select value={selectedVolunteer} onValueChange={setSelectedVolunteer}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder={t("admin.task.chooseVolunteer")} />
                        </SelectTrigger>
                        <SelectContent>
                          {volunteers
                            .filter((v) => v.status === "Available")
                            .map((volunteer) => (
                              <SelectItem key={volunteer.id} value={volunteer.id}>
                                <div className="flex items-center gap-2 py-1">
                                  <span className="font-medium">{volunteer.name}</span>
                                  <span className="text-muted-foreground">({volunteer.location})</span>
                                  <Badge variant="outline" className="text-xs">
                                    {volunteer.rating}★
                                  </Badge>
                                </div>
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      onClick={handleAssignTask}
                      disabled={!selectedRequest || !selectedVolunteer || isAssigning}
                      className="w-full h-12 text-lg font-semibold"
                      size="lg"
                    >
                      {isAssigning ? t("admin.task.assigning") : t("admin.task.assignTask")}
                    </Button>

                    {selectedRequestDetails && (
                      <Card className="sky-card">
                        <CardHeader className="pb-4">
                          <CardTitle className="text-lg">{t("admin.task.requestDetails")}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <span className="font-semibold">{t("admin.task.title")}:</span>{" "}
                            {selectedRequestDetails.title}
                          </div>
                          <div>
                            <span className="font-semibold">{t("admin.task.victim")}:</span>{" "}
                            {selectedRequestDetails.victimName}
                          </div>
                          <div>
                            <span className="font-semibold">{t("admin.task.location")}:</span>{" "}
                            {selectedRequestDetails.location}
                          </div>
                          <div>
                            <span className="font-semibold">{t("admin.task.description")}:</span>
                            <p className="text-sm text-muted-foreground mt-1">{selectedRequestDetails.description}</p>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="outline" className={getPriorityColor(selectedRequestDetails.priority)}>
                              {t(`priority.${selectedRequestDetails.priority.toLowerCase()}`)}
                            </Badge>
                            <Badge variant="outline">{selectedRequestDetails.category}</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-lg">{t("admin.task.pendingRequests")}</h4>
                      <Badge variant="outline" className="bg-orange-100 text-orange-800">
                        {pendingRequests.length} {t("admin.task.pending")}
                      </Badge>
                    </div>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {pendingRequests.map((request) => (
                        <Card
                          key={request.id}
                          className="cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => handleViewRequest(request.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <h5 className="font-semibold text-base">{request.title}</h5>
                              <Badge variant="outline" className={getPriorityColor(request.priority)}>
                                {t(`priority.${request.priority.toLowerCase()}`)}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{request.description}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>{request.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{new Date(request.createdAt).toLocaleTimeString()}</span>
                              </div>
                            </div>
                            <div className="mt-3 flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleViewRequest(request.id)
                                }}
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                {t("admin.task.view")}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            {/* AI Predictive Alerts */}
            <Card className="card-hover sky-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Brain className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{t("admin.ai.alerts")}</CardTitle>
                    <CardDescription>{t("admin.ai.insights")}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-orange-800">{t("admin.ai.waterLevels")}</h4>
                      <p className="text-sm text-orange-700 mt-1">{t("admin.ai.waterDesc")}</p>
                      <div className="mt-2">
                        <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">
                          {t("admin.ai.highConfidence")}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-800">{t("admin.ai.resourceDemand")}</h4>
                      <p className="text-sm text-blue-700 mt-1">{t("admin.ai.resourceDesc")}</p>
                      <div className="mt-2">
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                          {t("admin.ai.mediumConfidence")}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-800">{t("admin.ai.volunteerAvailability")}</h4>
                      <p className="text-sm text-green-700 mt-1">{t("admin.ai.volunteerDesc")}</p>
                      <div className="mt-2">
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                          {t("admin.ai.currentStatus")}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Operations Map */}
            <Card className="card-hover forest-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{t("admin.operations.map")}</CardTitle>
                </div>
                <CardDescription>{t("admin.operations.overview")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-muted rounded-xl flex items-center justify-center relative overflow-hidden">
                  <img
                    src="/placeholder.svg?height=400&width=400&text=Operations+Map+with+Zones"
                    alt="Operations map with disaster zones"
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl" />
                  <div className="absolute bottom-6 left-6 right-6 space-y-3">
                    <div className="flex items-center justify-between text-white text-sm font-medium">
                      <span>
                        {t("admin.operations.zone")} A:{" "}
                        {
                          volunteers.filter((v) => v.location.includes("Zone A") || v.location.includes("Downtown"))
                            .length
                        }{" "}
                        {t("admin.operations.active")}
                      </span>
                      <span>
                        {t("admin.operations.zone")} B:{" "}
                        {
                          volunteers.filter((v) => v.location.includes("Zone B") || v.location.includes("Riverside"))
                            .length
                        }{" "}
                        {t("admin.operations.active")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-white text-sm font-medium">
                      <span>
                        {t("admin.operations.zone")} C:{" "}
                        {volunteers.filter((v) => v.location.includes("Zone C") || v.location.includes("North")).length}{" "}
                        {t("admin.operations.active")}
                      </span>
                      <span>
                        {t("admin.operations.zone")} D:{" "}
                        {volunteers.filter((v) => v.location.includes("Zone D") || v.location.includes("East")).length}{" "}
                        {t("admin.operations.active")}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="card-hover earth-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-secondary" />
                  </div>
                  <CardTitle className="text-xl">{t("admin.performance.metrics")}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold">{t("admin.performance.efficiency")}</span>
                    <span className="text-sm font-semibold text-muted-foreground">89%</span>
                  </div>
                  <Progress value={89} className="h-3" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold">{t("admin.performance.satisfaction")}</span>
                    <span className="text-sm font-semibold text-muted-foreground">94%</span>
                  </div>
                  <Progress value={94} className="h-3" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold">{t("admin.performance.utilization")}</span>
                    <span className="text-sm font-semibold text-muted-foreground">76%</span>
                  </div>
                  <Progress value={76} className="h-3" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold">{t("admin.performance.completion")}</span>
                    <span className="text-sm font-semibold text-muted-foreground">
                      {Math.round((stats.completed / (stats.total || 1)) * 100)}%
                    </span>
                  </div>
                  <Progress value={Math.round((stats.completed / (stats.total || 1)) * 100)} className="h-3" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
