"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertTriangle,
  Phone,
  MapPin,
  Upload,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Heart,
  Zap,
  User,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"
import { useAuth, useRequests, useStats, useEmergency } from "@/contexts/app-context"
import { useLanguage } from "@/contexts/language-context"

export default function VictimDashboard() {
  const [sosAlert, setSosAlert] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
  })

  const { user } = useAuth()
  const { userRequests, addRequest, refreshData, isLoading } = useRequests()
  const { userStats } = useStats()
  const { sendSOS } = useEmergency()
  const { language, t } = useLanguage()

  const handleSOS = async () => {
    setSosAlert(true)
    try {
      await sendSOS(user?.location)
      setTimeout(() => setSosAlert(false), 3000)
    } catch (error) {
      console.error("Failed to send SOS:", error)
      setSosAlert(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newRequest = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      location: formData.location,
      priority: "Medium" as const,
      status: "Pending" as const,
      victimId: user?.id || "victim1",
      victimName: user?.name || "Demo User",
    }

    try {
      await addRequest(newRequest)
      setFormData({ title: "", description: "", category: "", location: "" })
    } catch (error) {
      console.error("Failed to submit request:", error)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "In Progress":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "Assigned":
        return <User className="h-4 w-4 text-purple-600" />
      case "Rejected":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Assigned":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-background via-muted/20 to-background ${language === "hi" ? "hindi-text hindi-responsive" : ""}`}
    >
      <header className="bg-gradient-to-r from-card via-card/95 to-card backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                </div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">{t("victim.title")}</h1>
                {user && <div className="ml-4 text-xs sm:text-sm text-muted-foreground">Welcome, {user.name}</div>}
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <Button
                onClick={refreshData}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 bg-transparent text-xs sm:text-sm"
              >
                <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4" />
                {t("common.refresh")}
              </Button>

              <Button
                onClick={handleSOS}
                className="sos-button text-white font-bold px-4 sm:px-10 py-2 sm:py-4 text-sm sm:text-xl rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex-1 sm:flex-none"
                size="lg"
              >
                <AlertTriangle className="mr-2 sm:mr-3 h-4 w-4 sm:h-6 sm:w-6 animate-pulse" />
                {t("victim.sos")}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {sosAlert && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
          <Card className="w-full max-w-lg animate-slide-up shadow-2xl border-destructive/20">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-destructive/10 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                <AlertTriangle className="h-8 w-8 sm:h-10 sm:w-10 text-destructive animate-pulse" />
              </div>
              <CardTitle className="text-destructive text-xl sm:text-2xl font-bold">SOS Alert Sent!</CardTitle>
              <CardDescription className="text-base sm:text-lg mt-4">
                Emergency services and nearby volunteers have been notified of your location and situation. Help is on
                the way.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="mb-8 text-center">
          <p className="text-base sm:text-lg text-muted-foreground">{t("victim.welcome")}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-10">
          <div className="lg:col-span-2 space-y-6 sm:space-y-10">
            <Card className="card-hover forest-card">
              <CardHeader className="pb-6 sm:pb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                  </div>
                  <CardTitle className="text-lg sm:text-2xl">{t("victim.newRequest")}</CardTitle>
                </div>
                <CardDescription className="text-sm sm:text-lg">
                  Submit a request for assistance. Our team will review and assign volunteers to help you immediately.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                  <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="title" className="text-sm sm:text-base font-semibold">
                        {t("victim.requestTitle")}
                      </Label>
                      <Input
                        id="title"
                        placeholder="Brief description of your need"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        className="h-10 sm:h-12 text-sm sm:text-base border-border/50 focus:border-primary/50 rounded-xl"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="category" className="text-sm sm:text-base font-semibold">
                        {t("victim.category")}
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger className="h-10 sm:h-12 text-sm sm:text-base border-border/50 focus:border-primary/50 rounded-xl">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="medical">🏥 {t("victim.medical")}</SelectItem>
                          <SelectItem value="food">🍽️ {t("victim.food")}</SelectItem>
                          <SelectItem value="shelter">🏠 {t("victim.shelter")}</SelectItem>
                          <SelectItem value="transport">🚗 Transportation</SelectItem>
                          <SelectItem value="supplies">📦 Supplies & Clothing</SelectItem>
                          <SelectItem value="rescue">🚁 {t("victim.rescue")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="description" className="text-sm sm:text-base font-semibold">
                      {t("victim.description")}
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Provide detailed information about your situation and what help you need..."
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      className="text-sm sm:text-base border-border/50 focus:border-primary/50 rounded-xl resize-none"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="location" className="text-sm sm:text-base font-semibold">
                      Location
                    </Label>
                    <div className="flex gap-3">
                      <Input
                        id="location"
                        placeholder="Enter your current location or address"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        required
                        className="h-10 sm:h-12 text-sm sm:text-base border-border/50 focus:border-primary/50 rounded-xl"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl border-border/50 bg-transparent"
                      >
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm sm:text-base font-semibold">Upload Images/Videos (Optional)</Label>
                    <div className="border-2 border-dashed border-border/50 rounded-2xl p-6 sm:p-10 text-center hover:border-primary/30 transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm sm:text-base text-muted-foreground font-medium">
                        Drag and drop files here, or click to browse
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                        Images and videos help volunteers understand your situation better
                      </p>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold rounded-xl bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
                    size="lg"
                    disabled={isLoading}
                  >
                    <Zap className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    {isLoading ? t("common.loading") : t("victim.submit")}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="card-hover earth-card">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-secondary" />
                    </div>
                    <CardTitle className="text-lg sm:text-2xl">{t("victim.myRequests")}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Live Updates
                  </div>
                </div>
                <CardDescription className="text-sm sm:text-lg">
                  Track the status of your assistance requests in real-time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl border border-border/50 overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/30">
                        <TableHead className="font-semibold text-xs sm:text-sm whitespace-nowrap">Request ID</TableHead>
                        <TableHead className="font-semibold text-xs sm:text-sm">Title</TableHead>
                        <TableHead className="font-semibold text-xs sm:text-sm">{t("victim.status")}</TableHead>
                        <TableHead className="font-semibold text-xs sm:text-sm">Priority</TableHead>
                        <TableHead className="font-semibold text-xs sm:text-sm whitespace-nowrap">
                          Assigned To
                        </TableHead>
                        <TableHead className="font-semibold text-xs sm:text-sm">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userRequests.map((request) => (
                        <TableRow key={request.id} className="hover:bg-muted/20 transition-colors">
                          <TableCell className="font-mono text-xs sm:text-sm font-medium">{request.id}</TableCell>
                          <TableCell className="font-semibold text-xs sm:text-sm">{request.title}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`${getStatusColor(request.status)} font-medium text-xs`}
                            >
                              <div className="flex items-center gap-1 sm:gap-2">
                                {getStatusIcon(request.status)}
                                <span className="text-xs">{request.status}</span>
                              </div>
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`${getPriorityColor(request.priority)} font-medium text-xs`}
                            >
                              {request.priority}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm">
                            {request.assignedVolunteerName || <span className="text-muted-foreground">Unassigned</span>}
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm text-muted-foreground font-medium whitespace-nowrap">
                            {new Date(request.createdAt).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <Card className="stats-card card-hover text-center p-4 sm:p-6">
                <CardContent className="p-0">
                  <div className="text-2xl sm:text-4xl font-bold text-primary mb-2">{userStats.total}</div>
                  <div className="text-xs sm:text-sm font-medium text-muted-foreground">
                    {t("victim.totalRequests")}
                  </div>
                </CardContent>
              </Card>

              <Card className="stats-card card-hover text-center p-4 sm:p-6">
                <CardContent className="p-0">
                  <div className="text-2xl sm:text-4xl font-bold text-green-600 mb-2">{userStats.solved}</div>
                  <div className="text-xs sm:text-sm font-medium text-muted-foreground">{t("victim.completed")}</div>
                </CardContent>
              </Card>

              <Card className="stats-card card-hover text-center p-4 sm:p-6">
                <CardContent className="p-0">
                  <div className="text-2xl sm:text-4xl font-bold text-blue-600 mb-2">{userStats.inProgress}</div>
                  <div className="text-xs sm:text-sm font-medium text-muted-foreground">In Progress</div>
                </CardContent>
              </Card>

              <Card className="stats-card card-hover text-center p-4 sm:p-6">
                <CardContent className="p-0">
                  <div className="text-2xl sm:text-4xl font-bold text-orange-600 mb-2">{userStats.rejected}</div>
                  <div className="text-xs sm:text-sm font-medium text-muted-foreground">{t("victim.avgResponse")}</div>
                </CardContent>
              </Card>
            </div>

            <Card className="card-hover bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border-border/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-destructive/10 rounded-lg flex items-center justify-center">
                    <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-destructive" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl">Emergency Contacts</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-destructive/5 to-destructive/10 rounded-xl border border-destructive/10 hover:border-destructive/20 transition-colors">
                  <div>
                    <div className="font-semibold text-sm sm:text-base">Emergency Services</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Police, Fire, Medical</div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/50 hover:bg-white/80 border-destructive/20 rounded-lg text-xs sm:text-sm"
                  >
                    <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    911
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/10 hover:border-primary/20 transition-colors">
                  <div>
                    <div className="font-semibold text-sm sm:text-base">Disaster Relief Hotline</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">24/7 Support</div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/50 hover:bg-white/80 border-primary/20 rounded-lg text-xs sm:text-sm"
                  >
                    <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    1-800-RELIEF
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-secondary/5 to-secondary/10 rounded-xl border border-secondary/10 hover:border-secondary/20 transition-colors">
                  <div>
                    <div className="font-semibold text-sm sm:text-base">Local Coordinator</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Regional Support</div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/50 hover:bg-white/80 border-secondary/20 rounded-lg text-xs sm:text-sm"
                  >
                    <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    (555) 123-4567
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
