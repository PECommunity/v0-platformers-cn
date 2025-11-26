"use client"

import { useState, useCallback, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CommandPalette } from "@/components/command-palette"
import { ShortcutsDialog } from "@/components/shortcuts-dialog"
import { useKeyboardShortcuts } from "@/components/use-keyboard-shortcuts"
import { HeroSection } from "@/components/sections/hero-section"
import { FrameworksSection } from "@/components/sections/frameworks-section"
import { ToolsSection } from "@/components/sections/tools-section"
import { ResourcesSection } from "@/components/sections/resources-section"
import { CommunitySection } from "@/components/sections/community-section"

export default function HomePage() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const [shortcutsDialogOpen, setShortcutsDialogOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null)
  const [selectedTool, setSelectedTool] = useState<string | null>(null)

  const handleNavigate = useCallback((section: string) => {
    if (section === "community") {
      window.open("https://pecommunity.cn/", "_blank")
      return
    }

    setActiveSection(section)
    const element = document.getElementById(section)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }, [])

  // Track active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "frameworks", "tools", "resources"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useKeyboardShortcuts({
    onNavigate: handleNavigate,
    onOpenSearch: () => setCommandPaletteOpen(true),
    onOpenShortcuts: () => setShortcutsDialogOpen(true),
  })

  return (
    <div className="min-h-screen bg-background">
      <Header
        onOpenSearch={() => setCommandPaletteOpen(true)}
        onOpenShortcuts={() => setShortcutsDialogOpen(true)}
        activeSection={activeSection}
      />

      <main className="pt-16">
        <HeroSection onNavigate={handleNavigate} />
        <FrameworksSection selectedFramework={selectedFramework} onSelectFramework={setSelectedFramework} />
        <ToolsSection selectedTool={selectedTool} onSelectTool={setSelectedTool} />
        <ResourcesSection />
        <CommunitySection />
      </main>

      <Footer />

      <CommandPalette
        open={commandPaletteOpen}
        onOpenChange={setCommandPaletteOpen}
        onNavigate={handleNavigate}
        onSelectFramework={(id) => {
          setSelectedFramework(id)
          handleNavigate("frameworks")
        }}
        onSelectTool={(id) => {
          setSelectedTool(id)
          handleNavigate("tools")
        }}
      />

      <ShortcutsDialog open={shortcutsDialogOpen} onOpenChange={setShortcutsDialogOpen} />
    </div>
  )
}
