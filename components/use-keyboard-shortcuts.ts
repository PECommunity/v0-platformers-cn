"use client"

import { useEffect, useCallback } from "react"

interface KeyboardShortcutsOptions {
  onNavigate: (section: string) => void
  onOpenSearch: () => void
  onOpenShortcuts: () => void
}

export function useKeyboardShortcuts({ onNavigate, onOpenSearch, onOpenShortcuts }: KeyboardShortcutsOptions) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Ignore if typing in an input
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return
      }

      // Handle single key shortcuts
      if (event.key === "/" && !event.metaKey && !event.ctrlKey) {
        event.preventDefault()
        onOpenSearch()
        return
      }

      if (event.key === "?" && event.shiftKey) {
        event.preventDefault()
        onOpenShortcuts()
        return
      }

      // Handle g + key navigation
      if (event.key === "g") {
        const handleNextKey = (e: KeyboardEvent) => {
          switch (e.key) {
            case "h":
              e.preventDefault()
              onNavigate("home")
              break
            case "f":
              e.preventDefault()
              onNavigate("frameworks")
              break
            case "t":
              e.preventDefault()
              onNavigate("tools")
              break
            case "r":
              e.preventDefault()
              onNavigate("resources")
              break
            case "c":
              e.preventDefault()
              window.open("https://pecommunity.cn/", "_blank")
              break
          }
          document.removeEventListener("keydown", handleNextKey)
        }

        document.addEventListener("keydown", handleNextKey, { once: true })

        // Remove listener after timeout
        setTimeout(() => {
          document.removeEventListener("keydown", handleNextKey)
        }, 1000)
      }
    },
    [onNavigate, onOpenSearch, onOpenShortcuts],
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])
}
