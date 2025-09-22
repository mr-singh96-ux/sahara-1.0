"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Home, Heart, Users, Shield, Menu, Phone, Info } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/contexts/language-context"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()

  const navItems = [
    { href: "/", label: t("nav.home"), icon: Home },
    { href: "/victim", label: t("nav.victim"), icon: Heart },
    { href: "/volunteer", label: t("nav.volunteer"), icon: Users },
    { href: "/admin", label: t("nav.admin"), icon: Shield },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-4">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}

        <div className="flex items-center gap-2 ml-4 pl-4 border-l border-border">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile Navigation */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="outline" size="icon">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-80">
          <div className="flex flex-col gap-4 mt-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Home className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-bold text-lg">Sahara</span>
              </div>

              <div className="flex items-center gap-2">
                <LanguageToggle />
                <ThemeToggle />
              </div>
            </div>

            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}

            <div className="border-t border-border mt-6 pt-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>Emergency: 112</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground">
                  <Info className="h-4 w-4" />
                  <span>Relief Hotline: 1800XX-RELIEF</span>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
