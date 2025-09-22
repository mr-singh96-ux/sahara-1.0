"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Heart, Users, Shield, ArrowRight, Zap, Globe, Clock, Star, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export function HomePageContent() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-pattern">
        <div className="hero-glow absolute inset-0" />

        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-foreground">
                <div className="w-12 h-12 glass-effect rounded-2xl flex items-center justify-center animate-pulse-glow">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <span className="font-bold text-3xl gradient-text">Sahara</span>
              </div>
              <Navigation />
            </div>
          </div>
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-6 animate-slide-up">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect text-sm text-muted-foreground mb-5 mt-20">
              <Star className="h-4 w-4 text-primary" />
              {t("home.trusted")}
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 text-balance hero-text leading-tight">
              {t("home.title")}
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto text-balance leading-relaxed mb-12">
              {t("home.subtitle")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/victim">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105"
              >
                {t("home.getHelp")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link href="/volunteer">
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:bg-secondary/50 px-8 py-6 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105 bg-transparent"
              >
                {t("home.volunteer")}
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="stats-card p-6 rounded-2xl text-center">
              <div className="text-3xl font-bold text-foreground mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">{t("stats.emergency")}</div>
            </div>
            <div className="stats-card p-6 rounded-2xl text-center">
              <div className="text-3xl font-bold text-foreground mb-2">1000+</div>
              <div className="text-sm text-muted-foreground">{t("stats.volunteers")}</div>
            </div>
            <div className="stats-card p-6 rounded-2xl text-center">
              <div className="text-3xl font-bold text-foreground mb-2">50+</div>
              <div className="text-sm text-muted-foreground">{t("stats.ngos")}</div>
            </div>
            <div className="stats-card p-6 rounded-2xl text-center">
              <div className="text-3xl font-bold text-foreground mb-2">99%</div>
              <div className="text-sm text-muted-foreground">{t("stats.response")}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground text-balance">
              {t("features.title")} <span className="gradient-text">{t("features.subtitle")}</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
              {t("features.description")}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="feature-card p-8 card-hover">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">{t("feature.victims.title")}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">{t("feature.victims.description")}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>{t("common.instantSos")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>{t("common.realTimeUpdates")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="feature-card p-8 card-hover">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">{t("feature.volunteers.title")}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  {t("feature.volunteers.description")}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span>{t("common.liveMap")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span>{t("common.teamCoordination")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="feature-card p-8 card-hover">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center mb-6">
                  <Shield className="h-8 w-8 text-destructive" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">{t("feature.organizations.title")}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  {t("feature.organizations.description")}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-destructive" />
                    <span>{t("common.aiInsights")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-destructive" />
                    <span>{t("common.resourceManagement")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-muted-foreground text-lg">{t("home.trusted1")}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">Red Cross</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">KHALSA AID</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">WHO</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">GLOBAL SIKHS</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">SARBAT DA BHALLA</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="feature-card p-6 rounded-2xl">
              <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-destructive" />
              </div>
              <h4 className="font-bold text-lg text-foreground mb-2">{t("footer.emergency")}</h4>
              <p className="text-muted-foreground">{t("footer.emergency.desc")}</p>
            </div>

            <div className="feature-card p-6 rounded-2xl">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-bold text-lg text-foreground mb-2">{t("footer.hotline")}</h4>
              <p className="text-muted-foreground">{t("footer.hotline.desc")}</p>
            </div>

            <div className="feature-card p-6 rounded-2xl">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <h4 className="font-bold text-lg text-foreground mb-2">{t("footer.support")}</h4>
              <p className="text-muted-foreground">support@sahara-relief.org</p>
            </div>
          </div>

          <div className="text-center mt-16 pt-8 border-t border-border">
            <p className="text-muted-foreground">{t("footer.copyright")}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
