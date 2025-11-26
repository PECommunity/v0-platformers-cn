"use client"

import { useState } from "react"
import { frameworks } from "@/data/frameworks"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ExternalLink, ArrowRight } from "lucide-react"

interface FrameworksSectionProps {
  selectedFramework: string | null
  onSelectFramework: (id: string | null) => void
}

export function FrameworksSection({ selectedFramework, onSelectFramework }: FrameworksSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const categories = [
    { id: "all", label: "全部" },
    { id: "methodology", label: "方法论" },
    { id: "framework", label: "框架" },
    { id: "pattern", label: "模式" },
  ]

  const filteredFrameworks =
    activeCategory === "all" ? frameworks : frameworks.filter((f) => f.category === activeCategory)

  const selected = frameworks.find((f) => f.id === selectedFramework)

  return (
    <section id="frameworks" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="mb-4 text-3xl font-bold tracking-tight">方法框架</h2>
          <p className="max-w-2xl text-muted-foreground">
            探索平台工程领域的核心方法论、框架和模式，为你的平台建设提供理论指导。
          </p>
        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
          <TabsList>
            {categories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id}>
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredFrameworks.map((framework) => (
            <Card
              key={framework.id}
              className="cursor-pointer transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              onClick={() => onSelectFramework(framework.id)}
            >
              <CardHeader>
                <div className="mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {categories.find((c) => c.id === framework.category)?.label}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{framework.title}</CardTitle>
                <CardDescription className="line-clamp-2">{framework.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {framework.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button variant="ghost" size="sm" className="mt-4 gap-1 p-0">
                  了解更多 <ArrowRight className="h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Framework Detail Sheet */}
        <Sheet open={!!selected} onOpenChange={(open) => !open && onSelectFramework(null)}>
          <SheetContent className="w-full sm:max-w-xl">
            {selected && (
              <>
                <SheetHeader>
                  <div className="mb-2">
                    <Badge variant="secondary">{categories.find((c) => c.id === selected.category)?.label}</Badge>
                  </div>
                  <SheetTitle className="text-xl">{selected.title}</SheetTitle>
                  <p className="text-sm text-muted-foreground">{selected.description}</p>
                </SheetHeader>
                <ScrollArea className="mt-6 h-[calc(100vh-200px)]">
                  <div className="prose prose-invert prose-sm max-w-none">
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {selected.content.split("\n").map((line, i) => {
                        if (line.startsWith("## ")) {
                          return (
                            <h3 key={i} className="mt-6 mb-3 text-lg font-semibold text-foreground">
                              {line.replace("## ", "")}
                            </h3>
                          )
                        }
                        if (line.startsWith("### ")) {
                          return (
                            <h4 key={i} className="mt-4 mb-2 text-base font-medium text-foreground">
                              {line.replace("### ", "")}
                            </h4>
                          )
                        }
                        if (line.startsWith("- ")) {
                          return (
                            <li key={i} className="ml-4 text-muted-foreground">
                              {line.replace("- ", "")}
                            </li>
                          )
                        }
                        if (line.match(/^\d+\./)) {
                          return (
                            <li key={i} className="ml-4 text-muted-foreground">
                              {line}
                            </li>
                          )
                        }
                        if (line.trim() === "") {
                          return <br key={i} />
                        }
                        return (
                          <p key={i} className="text-muted-foreground">
                            {line}
                          </p>
                        )
                      })}
                    </div>
                  </div>

                  {selected.references && selected.references.length > 0 && (
                    <div className="mt-8 border-t border-border pt-6">
                      <h4 className="mb-4 font-semibold">参考资料</h4>
                      <div className="space-y-2">
                        {selected.references.map((ref, i) => (
                          <a
                            key={i}
                            href={ref.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-primary hover:underline"
                          >
                            <ExternalLink className="h-3 w-3" />
                            {ref.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-8 flex flex-wrap gap-2">
                    {selected.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </ScrollArea>
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </section>
  )
}
