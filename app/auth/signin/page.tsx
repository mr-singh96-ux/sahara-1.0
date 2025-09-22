"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, Shield, Users, UserCheck } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"

// Dummy user data for demo
const dummyUsers = [
  { email: "victim@demo.com", password: "demo123", role: "victim", name: "John Doe" },
  { email: "volunteer@demo.com", password: "demo123", role: "volunteer", name: "Sarah Smith" },
  { email: "admin@demo.com", password: "demo123", role: "admin", name: "Admin User" },
]

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { language, t } = useLanguage()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check dummy credentials
    const user = dummyUsers.find((u) => u.email === email && u.password === password && u.role === role)

    if (user) {
      // Store user data in localStorage for demo
      localStorage.setItem("sahara_user", JSON.stringify(user))

      // Redirect based on role
      switch (role) {
        case "victim":
          router.push("/victim")
          break
        case "volunteer":
          router.push("/volunteer")
          break
        case "admin":
          router.push("/admin")
          break
        default:
          router.push("/")
      }
    } else {
      alert("Invalid credentials. Try: victim@demo.com, volunteer@demo.com, or admin@demo.com with password: demo123")
    }

    setIsLoading(false)
  }

  const quickLogin = (userType: string) => {
    const user = dummyUsers.find((u) => u.role === userType)
    if (user) {
      setEmail(user.email)
      setPassword(user.password)
      setRole(user.role)
    }
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4 ${language === "hi" ? "hindi-text hindi-responsive" : ""}`}
    >
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold gradient-text">{t("auth.signin.title")}</h1>
          <p className="text-sm sm:text-base text-muted-foreground">{t("auth.signin.subtitle")}</p>
        </div>

        {/* Quick Login Demo Buttons */}
        <Card className="forest-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">{t("auth.signin.demo")}</CardTitle>
            <CardDescription className="text-xs">Click to auto-fill credentials</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => quickLogin("victim")}
                className="flex flex-col items-center gap-1 h-auto py-2"
              >
                <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs">{t("auth.signin.victim")}</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => quickLogin("volunteer")}
                className="flex flex-col items-center gap-1 h-auto py-2"
              >
                <UserCheck className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs">{t("auth.signin.volunteer")}</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => quickLogin("admin")}
                className="flex flex-col items-center gap-1 h-auto py-2"
              >
                <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs">{t("auth.signin.admin")}</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sign In Form */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">{t("auth.signin.button")}</CardTitle>
            <CardDescription className="text-sm">Enter your credentials to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium">
                  {t("auth.signin.role")}
                </Label>
                <Select value={role} onValueChange={setRole} required>
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

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  {t("auth.signin.email")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-10 sm:h-11 text-sm sm:text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  {t("auth.signin.password")}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              <Button
                type="submit"
                className="w-full h-10 sm:h-11 text-sm sm:text-base font-semibold"
                disabled={isLoading}
              >
                {isLoading ? t("common.loading") : t("auth.signin.button")}
              </Button>
            </form>

            <div className="mt-4 text-center text-xs sm:text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link href="/auth/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials Info */}
        <Card className="sky-card">
          <CardContent className="pt-6">
            <div className="text-xs text-muted-foreground space-y-1">
              <p className="font-medium">Demo Credentials:</p>
              <p>• victim@demo.com / demo123</p>
              <p>• volunteer@demo.com / demo123</p>
              <p>• admin@demo.com / demo123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
