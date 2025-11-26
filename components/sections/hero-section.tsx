"use client"

import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { ArrowRight, ExternalLink } from "lucide-react"

interface HeroSectionProps {
  onNavigate: (section: string) => void
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section id="home" className="relative min-h-[calc(100vh-4rem)] flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-5" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5">
            <span className="text-sm text-muted-foreground">来自</span>
            <a
              href="https://pecommunity.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              PECommunity 社区
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-balance">构建卓越的</span>
            <br />
            <span className="text-primary">开发者平台</span>
          </h1>

          <p className="mb-8 max-w-2xl text-lg text-muted-foreground text-pretty">
            平台之道汇集了平台工程的方法论、框架和实用工具，帮助团队构建高效的内部开发者平台，
            提升开发者体验，加速价值交付。
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button size="lg" className="gap-2" onClick={() => onNavigate("frameworks")}>
              探索方法框架
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="gap-2 bg-transparent" onClick={() => onNavigate("tools")}>
              使用度量工具
            </Button>
          </div>

          <div className="mt-12 flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>按</span>
              <Kbd>/</Kbd>
              <span>快速搜索</span>
            </div>
            <div className="flex items-center gap-2">
              <span>按</span>
              <Kbd>?</Kbd>
              <span>查看快捷键</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
