"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Language = "en" | "hi" | "pi"

interface Translations {
  [key: string]: {
    en: string
    hi: string
    // pi: string
  }
}

const translations: Translations = {
  // Navigation
  "nav.home": { en: "Home", hi: "होम" },
  "nav.victim": { en: "Victim Dashboard", hi: "पीड़ित डैशबोर्ड" },
  "nav.volunteer": { en: "Volunteer Dashboard", hi: "स्वयंसेवक डैशबोर्ड" },
  "nav.admin": { en: "NGO Admin", hi: "एनजीओ एडमिन" },

  // Homepage
  "home.title": { en: "The Complete Platform For Disaster Relief", hi: "आपदा राहत के लिए संपूर्ण प्लेटफॉर्म" },
  "home.subtitle": {
    en: "Connect victims, volunteers, and organizations to provide swift, coordinated disaster response through innovative technology and real-time coordination.",
    hi: "नवाचार प्रौद्योगिकी और वास्तविक समय समन्वय के माध्यम से तीव्र, समन्वित आपदा प्रतिक्रिया प्रदान करने के लिए पीड़ितों, स्वयंसेवकों और संगठनों को जोड़ें।",
  },
  "home.getHelp": { en: "Get Emergency Help", hi: "आपातकालीन सहायता प्राप्त करें" },
  "home.volunteer": { en: "Become a Volunteer", hi: "स्वयंसेवक बनें" },
  "home.trusted": { en: "Trusted by 1000+ volunteers worldwide", hi: "दुनिया भर में 1000+ स्वयंसेवकों द्वारा भरोसा" },
  "home.trusted1": { en: "Trusted by leading disaster relief organizations", hi: "प्रमुख आपदा राहत संगठनों द्वारा भरोसेमंद" },
  // Stats
  "stats.emergency": { en: "Emergency Support", hi: "आपातकालीन सहायता" },
  "stats.volunteers": { en: "Active Volunteers", hi: "सक्रिय स्वयंसेवक" },
  "stats.ngos": { en: "Partner NGOs", hi: "साझेदार एनजीओ" },
  "stats.response": { en: "Response Rate", hi: "प्रतिक्रिया दर" },

  // Features
  "features.title": { en: "Coordinated relief efforts.", hi: "समन्वित राहत प्रयास।" },
  "features.subtitle": {
    en: "Tools for your team and stakeholders to respond faster.",
    hi: "आपकी टीम और हितधारकों के लिए तेज़ी से प्रतिक्रिया देने के उपकरण।",
  },
  "features.description": {
    en: "Our platform brings together victims, volunteers, and organizations to create an efficient disaster response network.",
    hi: "हमारा प्लेटफॉर्म एक कुशल आपदा प्रतिक्रिया नेटवर्क बनाने के लिए पीड़ितों, स्वयंसेवकों और संगठनों को एक साथ लाता है।",
  },

  // Feature Cards
  "feature.victims.title": { en: "For Victims", hi: "पीड़ितों के लिए" },
  "feature.victims.description": {
    en: "Request immediate assistance, track help status, and access emergency resources with our intuitive victim portal.",
    hi: "हमारे सहज पीड़ित पोर्टल के साथ तत्काल सहायता का अनुरोध करें, सहायता की स्थिति को ट्रैक करें, और आपातकालीन संसाधनों तक पहुंचें।",
  },
  "feature.volunteers.title": { en: "For Volunteers", hi: "स्वयंसेवकों के लिए" },
  "feature.volunteers.description": {
    en: "Find nearby relief opportunities, coordinate with teams, and respond to emergency alerts in real-time.",
    hi: "आस-पास के राहत अवसरों को खोजें, टीमों के साथ समन्वय करें, और वास्तविक समय में आपातकालीन अलर्ट का जवाब दें।",
  },
  "feature.organizations.title": { en: "For Organizations", hi: "संगठनों के लिए" },
  "feature.organizations.description": {
    en: "Manage resources, coordinate volunteers, and leverage AI-powered insights for strategic disaster response.",
    hi: "संसाधनों का प्रबंधन करें, स्वयंसेवकों का समन्वय करें, और रणनीतिक आपदा प्रतिक्रिया के लिए AI-संचालित अंतर्दृष्टि का लाभ उठाएं।",
  },

  // Footer
  "footer.emergency": { en: "Emergency Services", hi: "आपातकालीन सेवाएं" },
  "footer.emergency.desc": {
    en: "Call 112 for immediate emergency assistance",
    hi: "तत्काल आपातकालीन सहायता के लिए 112 पर कॉल करें",
  },
  "footer.hotline": { en: "Disaster Relief Hotline", hi: "आपदा राहत हॉटलाइन" },
  "footer.hotline.desc": { en: "1800XX-RELIEF for 24/7 support", hi: "24/7 सहायता के लिए 1800XX-RELIEF" },
  "footer.support": { en: "Contact Support", hi: "सहायता संपर्क" },
  "footer.copyright": {
    en: "© 2025 Sahara Disaster Relief & Management System.",
    hi: "© 2025 सहारा आपदा राहत और प्रबंधन प्रणाली।",
  },

  // Common
  "common.instantSos": { en: "Instant SOS", hi: "तत्काल SOS" },
  "common.realTimeUpdates": { en: "Real-time Updates", hi: "वास्तविक समय अपडेट" },
  "common.liveMap": { en: "Live Map", hi: "लाइव मैप" },
  "common.teamCoordination": { en: "Team Coordination", hi: "टीम समन्वय" },
  "common.aiInsights": { en: "AI Insights", hi: "AI अंतर्दृष्टि" },
  "common.resourceManagement": { en: "Resource Management", hi: "संसाधन प्रबंधन" },

  // Auth Pages
  "auth.signin.title": { en: "Sign In to Sahara", hi: "सहारा में साइन इन करें" },
  "auth.signin.subtitle": { en: "Access your disaster relief dashboard", hi: "अपने आपदा राहत डैशबोर्ड तक पहुंचें" },
  "auth.signin.role": { en: "Select your role", hi: "अपनी भूमिका चुनें" },
  "auth.signin.email": { en: "Email", hi: "ईमेल" },
  "auth.signin.password": { en: "Password", hi: "पासवर्ड" },
  "auth.signin.button": { en: "Sign In", hi: "साइन इन करें" },
  "auth.signin.demo": { en: "Quick Demo Login", hi: "त्वरित डेमो लॉगिन" },
  "auth.signin.victim": { en: "Victim", hi: "पीड़ित" },
  "auth.signin.volunteer": { en: "Volunteer", hi: "स्वयंसेवक" },
  "auth.signin.admin": { en: "NGO Admin", hi: "एनजीओ एडमिन" },

  "auth.signup.title": { en: "Join Sahara Relief Network", hi: "सहारा राहत नेटवर्क में शामिल हों" },
  "auth.signup.subtitle": { en: "Create your account to help save lives", hi: "जीवन बचाने में मदद के लिए अपना खाता बनाएं" },
  "auth.signup.name": { en: "Full Name", hi: "पूरा नाम" },
  "auth.signup.phone": { en: "Phone Number", hi: "फोन नंबर" },
  "auth.signup.location": { en: "Location", hi: "स्थान" },
  "auth.signup.skills": { en: "Skills", hi: "कौशल" },
  "auth.signup.organization": { en: "Organization", hi: "संगठन" },
  "auth.signup.confirmPassword": { en: "Confirm Password", hi: "पासवर्ड की पुष्टि करें" },
  "auth.signup.button": { en: "Create Account", hi: "खाता बनाएं" },

  // Victim Dashboard
  "victim.title": { en: "Victim Emergency Dashboard", hi: "पीड़ित आपातकालीन डैशबोर्ड" },
  "victim.welcome": { en: "Emergency assistance is just one click away", hi: "आपातकालीन सहायता केवल एक क्लिक दूर है" },
  "victim.sos": { en: "Emergency SOS", hi: "आपातकालीन SOS" },
  "victim.sosDesc": { en: "Send immediate distress signal", hi: "तत्काल संकट संकेत भेजें" },
  "victim.newRequest": { en: "New Help Request", hi: "नई सहायता अनुरोध" },
  "victim.requestTitle": { en: "Request Title", hi: "अनुरोध शीर्षक" },
  "victim.description": { en: "Description", hi: "विवरण" },
  "victim.category": { en: "Category", hi: "श्रेणी" },
  "victim.medical": { en: "Medical Emergency", hi: "चिकित्सा आपातकाल" },
  "victim.food": { en: "Food & Water", hi: "भोजन और पानी" },
  "victim.shelter": { en: "Shelter", hi: "आश्रय" },
  "victim.rescue": { en: "Rescue", hi: "बचाव" },
  "victim.submit": { en: "Submit Request", hi: "अनुरोध जमा करें" },
  "victim.myRequests": { en: "My Requests", hi: "मेरे अनुरोध" },
  "victim.status": { en: "Status", hi: "स्थिति" },
  "victim.pending": { en: "Pending", hi: "लंबित" },
  "victim.assigned": { en: "Assigned", hi: "सौंपा गया" },
  "victim.completed": { en: "Completed", hi: "पूर्ण" },
  "victim.activeRequests": { en: "Active Requests", hi: "सक्रिय अनुरोध" },
  "victim.totalRequests": { en: "Total Requests", hi: "कुल अनुरोध" },
  "victim.avgResponse": { en: "Avg Response Time", hi: "औसत प्रतिक्रिया समय" },

  // Volunteer Dashboard
  "volunteer.title": { en: "Volunteer Command Center", hi: "स्वयंसेवक कमांड सेंटर" },
  "volunteer.welcome": {
    en: "Ready to make a difference? Check the map for active alerts.",
    hi: "बदलाव लाने के लिए तैयार हैं? सक्रिय अलर्ट के लिए मैप देखें।",
  },
  "volunteer.liveMap": { en: "Live Emergency Map", hi: "लाइव आपातकालीन मैप" },
  "volunteer.sosAlerts": { en: "SOS Alerts", hi: "SOS अलर्ट" },
  "volunteer.availableTasks": { en: "Available Tasks", hi: "उपलब्ध कार्य" },
  "volunteer.assignedTasks": { en: "Assigned Tasks", hi: "सौंपे गए कार्य" },
  "volunteer.completedTasks": { en: "Completed Tasks", hi: "पूर्ण कार्य" },
  "volunteer.accept": { en: "Accept", hi: "स्वीकार करें" },
  "volunteer.complete": { en: "Complete", hi: "पूर्ण करें" },
  "volunteer.communications": { en: "Team Communications", hi: "टीम संचार" },
  "volunteer.quickContacts": { en: "Quick Contacts", hi: "त्वरित संपर्क" },
  "volunteer.coordinator": { en: "Emergency Coordinator", hi: "आपातकालीन समन्वयक" },
  "volunteer.medicalTeam": { en: "Medical Team Lead", hi: "चिकित्सा टीम लीड" },
  "volunteer.logistics": { en: "Logistics Manager", hi: "रसद प्रबंधक" },
  "volunteer.tasksCompleted": { en: "Tasks Completed", hi: "कार्य पूर्ण" },
  "volunteer.hoursVolunteered": { en: "Hours Volunteered", hi: "स्वयंसेवा घंटे" },
  "volunteer.rating": { en: "Volunteer Rating", hi: "स्वयंसेवक रेटिंग" },

  // Admin Dashboard
  "admin.title": { en: "NGO Administration Dashboard", hi: "एनजीओ प्रशासन डैशबोर्ड" },
  "admin.welcome": { en: "Coordinating relief efforts across the region", hi: "क्षेत्र भर में राहत प्रयासों का समन्वय" },
  "admin.analytics": { en: "Analytics Overview", hi: "विश्लेषण अवलोकन" },
  "admin.activeVolunteers": { en: "Active Volunteers", hi: "सक्रिय स्वयंसेवक" },
  "admin.totalVictims": { en: "Total Victims Helped", hi: "कुल पीड़ित सहायता प्राप्त" },
  "admin.tasksInProgress": { en: "Tasks in Progress", hi: "प्रगति में कार्य" },
  "admin.responseTime": { en: "Avg Response Time", hi: "औसत प्रतिक्रिया समय" },
  "admin.volunteerManagement": { en: "Volunteer Management", hi: "स्वयंसेवक प्रबंधन" },
  "admin.taskAssignment": { en: "Task Assignment Center", hi: "कार्य असाइनमेंट केंद्र" },
  "admin.selectRequest": { en: "Select Request", hi: "अनुरोध चुनें" },
  "admin.selectVolunteer": { en: "Select Volunteer", hi: "स्वयंसेवक चुनें" },
  "admin.assignTask": { en: "Assign Task", hi: "कार्य सौंपें" },
  "admin.aiAlerts": { en: "AI Predictive Alerts", hi: "AI भविष्यवाणी अलर्ट" },
  "admin.operationsMap": { en: "Operations Map", hi: "संचालन मैप" },
  "admin.performance": { en: "Performance Metrics", hi: "प्रदर्शन मेट्रिक्स" },

  // Comprehensive Admin Dashboard Translations
  "admin.dashboard": { en: "NGO Admin Dashboard", hi: "एनजीओ एडमिन डैशबोर्ड" },
  "admin.welcome.user": { en: "Welcome", hi: "स्वागत है" },
  "admin.refresh": { en: "Refresh", hi: "रीफ्रेश करें" },
  "admin.liveUpdates": { en: "Live Updates", hi: "लाइव अपडेट" },
  "admin.administrator": { en: "Administrator", hi: "प्रशासक" },

  // Stats Cards
  "admin.stats.activeVolunteers": { en: "Active Volunteers", hi: "सक्रिय स्वयंसेवक" },
  "admin.stats.totalVictims": { en: "Total Victims", hi: "कुल पीड़ित" },
  "admin.stats.tasksInProgress": { en: "Tasks in Progress", hi: "प्रगति में कार्य" },
  "admin.stats.completedTasks": { en: "Completed Tasks", hi: "पूर्ण कार्य" },
  "admin.stats.criticalAlerts": { en: "Critical Alerts", hi: "गंभीर अलर्ट" },
  "admin.stats.avgResponse": { en: "Avg Response", hi: "औसत प्रतिक्रिया" },

  // Volunteer Management
  "admin.volunteer.management": { en: "Volunteer Management", hi: "स्वयंसेवक प्रबंधन" },
  "admin.volunteer.monitor": {
    en: "Monitor and manage volunteer activities in real-time",
    hi: "वास्तविक समय में स्वयंसेवक गतिविधियों की निगरानी और प्रबंधन करें",
  },
  "admin.volunteer.name": { en: "Volunteer", hi: "स्वयंसेवक" },
  "admin.volunteer.status": { en: "Status", hi: "स्थिति" },
  "admin.volunteer.location": { en: "Location", hi: "स्थान" },
  "admin.volunteer.skills": { en: "Skills", hi: "कौशल" },
  "admin.volunteer.tasks": { en: "Tasks", hi: "कार्य" },
  "admin.volunteer.rating": { en: "Rating", hi: "रेटिंग" },
  "admin.volunteer.actions": { en: "Actions", hi: "कार्य" },
  "admin.volunteer.contact": { en: "Contact", hi: "संपर्क करें" },
  "admin.volunteer.available": { en: "Available", hi: "उपलब्ध" },
  "admin.volunteer.onMission": { en: "On Mission", hi: "मिशन पर" },
  "admin.volunteer.offline": { en: "Offline", hi: "ऑफलाइन" },

  // Task Assignment
  "admin.task.assignment": { en: "Task Assignment Center", hi: "कार्य असाइनमेंट केंद्र" },
  "admin.task.assignPending": {
    en: "Assign pending requests to available volunteers",
    hi: "उपलब्ध स्वयंसेवकों को लंबित अनुरोध सौंपें",
  },
  "admin.task.selectRequest": { en: "Select Request", hi: "अनुरोध चुनें" },
  "admin.task.chooseRequest": { en: "Choose a request to assign", hi: "सौंपने के लिए एक अनुरोध चुनें" },
  "admin.task.selectVolunteer": { en: "Select Volunteer", hi: "स्वयंसेवक चुनें" },
  "admin.task.chooseVolunteer": { en: "Choose an available volunteer", hi: "एक उपलब्ध स्वयंसेवक चुनें" },
  "admin.task.assignTask": { en: "Assign Task", hi: "कार्य सौंपें" },
  "admin.task.assigning": { en: "Assigning...", hi: "सौंप रहे हैं..." },
  "admin.task.requestDetails": { en: "Request Details", hi: "अनुरोध विवरण" },
  "admin.task.title": { en: "Title", hi: "शीर्षक" },
  "admin.task.victim": { en: "Victim", hi: "पीड़ित" },
  "admin.task.location": { en: "Location", hi: "स्थान" },
  "admin.task.description": { en: "Description", hi: "विवरण" },
  "admin.task.pendingRequests": { en: "Pending Requests", hi: "लंबित अनुरोध" },
  "admin.task.pending": { en: "Pending", hi: "लंबित" },
  "admin.task.view": { en: "View", hi: "देखें" },

  // Priority levels
  "priority.critical": { en: "Critical", hi: "गंभीर" },
  "priority.high": { en: "High", hi: "उच्च" },
  "priority.medium": { en: "Medium", hi: "मध्यम" },
  "priority.low": { en: "Low", hi: "कम" },

  // AI Predictive Alerts
  "admin.ai.alerts": { en: "AI Predictive Alerts", hi: "AI भविष्यवाणी अलर्ट" },
  "admin.ai.insights": { en: "AI-powered insights and predictions", hi: "AI-संचालित अंतर्दृष्टि और भविष्यवाणियां" },
  "admin.ai.waterLevels": { en: "Rising Water Levels", hi: "बढ़ता जल स्तर" },
  "admin.ai.waterDesc": {
    en: "AI prediction indicates potential flooding in Riverside District within next 6 hours.",
    hi: "AI भविष्यवाणी अगले 6 घंटों में रिवरसाइड जिले में संभावित बाढ़ का संकेत देती है।",
  },
  "admin.ai.highConfidence": { en: "High Confidence: 87%", hi: "उच्च विश्वास: 87%" },
  "admin.ai.resourceDemand": { en: "Resource Demand Spike", hi: "संसाधन मांग में वृद्धि" },
  "admin.ai.resourceDesc": {
    en: "Expected 40% increase in medical supply requests in Zone A by evening.",
    hi: "शाम तक जोन A में चिकित्सा आपूर्ति अनुरोधों में 40% वृद्धि की अपेक्षा।",
  },
  "admin.ai.mediumConfidence": { en: "Medium Confidence: 72%", hi: "मध्यम विश्वास: 72%" },
  "admin.ai.volunteerAvailability": { en: "Volunteer Availability", hi: "स्वयंसेवक उपलब्धता" },
  "admin.ai.volunteerDesc": {
    en: "Optimal volunteer distribution achieved. Response times improved by 23%.",
    hi: "इष्टतम स्वयंसेवक वितरण प्राप्त। प्रतिक्रिया समय में 23% सुधार।",
  },
  "admin.ai.currentStatus": { en: "Current Status", hi: "वर्तमान स्थिति" },

  // Operations Map
  "admin.operations.map": { en: "Operations Map", hi: "संचालन मैप" },
  "admin.operations.overview": { en: "Real-time overview of disaster zones", hi: "आपदा क्षेत्रों का वास्तविक समय अवलोकन" },
  "admin.operations.zone": { en: "Zone", hi: "जोन" },
  "admin.operations.active": { en: "Active", hi: "सक्रिय" },

  // Performance Metrics
  "admin.performance.metrics": { en: "Performance Metrics", hi: "प्रदर्शन मेट्रिक्स" },
  "admin.performance.efficiency": { en: "Response Efficiency", hi: "प्रतिक्रिया दक्षता" },
  "admin.performance.satisfaction": { en: "Volunteer Satisfaction", hi: "स्वयंसेवक संतुष्टि" },
  "admin.performance.utilization": { en: "Resource Utilization", hi: "संसाधन उपयोग" },
  "admin.performance.completion": { en: "Task Completion Rate", hi: "कार्य पूर्णता दर" },

  // Common UI Elements
  "common.loading": { en: "Loading...", hi: "लोड हो रहा है..." },
  "common.save": { en: "Save", hi: "सेव करें" },
  "common.cancel": { en: "Cancel", hi: "रद्द करें" },
  "common.edit": { en: "Edit", hi: "संपादित करें" },
  "common.delete": { en: "Delete", hi: "हटाएं" },
  "common.view": { en: "View", hi: "देखें" },
  "common.search": { en: "Search", hi: "खोजें" },
  "common.filter": { en: "Filter", hi: "फिल्टर" },
  "common.sort": { en: "Sort", hi: "क्रमबद्ध करें" },
  "common.refresh": { en: "Refresh", hi: "रीफ्रेश करें" },
  "common.close": { en: "Close", hi: "बंद करें" },
  "common.back": { en: "Back", hi: "वापस" },
  "common.next": { en: "Next", hi: "अगला" },
  "common.previous": { en: "Previous", hi: "पिछला" },
  "common.yes": { en: "Yes", hi: "हाँ" },
  "common.no": { en: "No", hi: "नहीं" },
  "common.confirm": { en: "Confirm", hi: "पुष्टि करें" },

  // Time and Date
  "time.now": { en: "Now", hi: "अभी" },
  "time.today": { en: "Today", hi: "आज" },
  "time.yesterday": { en: "Yesterday", hi: "कल" },
  "time.minutes": { en: "minutes", hi: "मिनट" },
  "time.hours": { en: "hours", hi: "घंटे" },
  "time.days": { en: "days", hi: "दिन" },
  "time.ago": { en: "ago", hi: "पहले" },
}

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: React.ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>("en")

  // Initialize language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("sahara_language") as Language
    if (savedLanguage) {
      setLanguageState(savedLanguage)
    }
  }, [])

  // Save language to localStorage
  useEffect(() => {
    localStorage.setItem("sahara_language", language)
  }, [language])

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === "en" ? "hi" : "en"))
  }

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
  }

  const t = (key: string): string => {
    const translation = translations[key]
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`)
      return key
    }
    return translation[language] || translation.en || key
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage, t }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
