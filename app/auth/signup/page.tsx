"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Eye, EyeOff, Shield, MapPin, Phone } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    phone: "",
    location: "",
    skills: "",
    organization: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { language, t } = useLanguage()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      setIsLoading(false)
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Create user object
    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      phone: formData.phone,
      location: formData.location,
      skills: formData.skills,
      organization: formData.organization,
      createdAt: new Date().toISOString(),
    }

    // Store user data in localStorage for demo
    localStorage.setItem("sahara_user", JSON.stringify(newUser))

    alert("Account created successfully! You can now sign in.")
    router.push("/auth/signin")

    setIsLoading(false)
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4 ${language === "hi" ? "hindi-text hindi-responsive" : ""}`}
    >
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold gradient-text">{t("auth.signup.title")}</h1>
          <p className="text-sm sm:text-base text-muted-foreground">{t("auth.signup.subtitle")}</p>
        </div>

        {/* Sign Up Form */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">{t("auth.signup.button")}</CardTitle>
            <CardDescription className="text-sm">Fill in your details to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    {t("auth.signup.name")}
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    className="h-10 sm:h-11 text-sm sm:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm font-medium">
                    {t("auth.signin.role")}
                  </Label>
                  <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)} required>
                    <SelectTrigger className="h-10 sm:h-11">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="victim">Victim - Need Help</SelectItem>
                      <SelectItem value="volunteer">Volunteer - Provide Help</SelectItem>
                      <SelectItem value="admin">NGO Admin - Manage Operations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    {t("auth.signin.email")}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="h-10 sm:h-11 text-sm sm:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    {t("auth.signup.phone")}
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      placeholder="Enter your phone number"
                      className="pl-8 sm:pl-10 h-10 sm:h-11 text-sm sm:text-base"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium">
                  {t("auth.signup.location")}
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="Enter your city/region"
                    className="pl-8 sm:pl-10 h-10 sm:h-11 text-sm sm:text-base"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    required
                  />
                </div>
              </div>

              {formData.role === "volunteer" && (
                <div className="space-y-2">
                  <Label htmlFor="skills" className="text-sm font-medium">
                    {t("auth.signup.skills")}
                  </Label>
                  <Textarea
                    id="skills"
                    placeholder="e.g., Medical aid, Search & rescue, Food distribution, Transportation..."
                    value={formData.skills}
                    onChange={(e) => handleInputChange("skills", e.target.value)}
                    rows={3}
                    className="text-sm sm:text-base resize-none"
                  />
                </div>
              )}

              {formData.role === "admin" && (
                <div className="space-y-2">
                  <Label htmlFor="organization" className="text-sm font-medium">
                    {t("auth.signup.organization")}
                  </Label>
                  <Input
                    id="organization"
                    placeholder="Enter your NGO/Organization name"
                    value={formData.organization}
                    onChange={(e) => handleInputChange("organization", e.target.value)}
                    required
                    className="h-10 sm:h-11 text-sm sm:text-base"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    {t("auth.signin.password")}
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                      className="h-10 sm:h-11 text-sm sm:text-base pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-3 w-3 sm:h-4 sm:w-4" />
                      ) : (
                        <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">
                    {t("auth.signup.confirmPassword")}
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      required
                      className="h-10 sm:h-11 text-sm sm:text-base pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-3 w-3 sm:h-4 sm:w-4" />
                      ) : (
                        <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-10 sm:h-11 text-sm sm:text-base font-semibold"
                disabled={isLoading}
              >
                {isLoading ? t("common.loading") : t("auth.signup.button")}
              </Button>
            </form>

            <div className="mt-4 text-center text-xs sm:text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link href="/auth/signin" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
