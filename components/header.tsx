"use client"

import { useState } from "react"
import Link from "next/link"
import { navigation } from "@/data/navigation"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X, ExternalLink, Search, Command } from "lucide-react"

interface HeaderProps {
  onOpenSearch: () => void
  onOpenShortcuts: () => void
  activeSection: string
}

export function Header({ onOpenSearch, onOpenShortcuts, activeSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="#home" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">道</span>
          </div>
          <span className="text-lg font-semibold">平台之道</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.id}
              href={item.external ? item.href! : item.href!}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className={`flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                activeSection === item.id
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {item.title}
              {item.external && <ExternalLink className="h-3 w-3" />}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden gap-2 md:flex bg-transparent" onClick={onOpenSearch}>
            <Search className="h-4 w-4" />
            <span className="text-muted-foreground">搜索</span>
            <Kbd>/</Kbd>
          </Button>

          <Button variant="ghost" size="sm" className="hidden md:flex" onClick={onOpenShortcuts}>
            <Command className="h-4 w-4" />
            <span className="ml-1 text-muted-foreground">
              <Kbd>?</Kbd>
            </span>
          </Button>

          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="space-y-1 px-4 py-4">
            {navigation.map((item) => (
              <Link
                key={item.id}
                href={item.external ? item.href! : item.href!}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className={`flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="flex items-center gap-2">
                  {item.title}
                  {item.external && <ExternalLink className="h-3 w-3" />}
                </span>
                {item.shortcut && <Kbd>{item.shortcut}</Kbd>}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
