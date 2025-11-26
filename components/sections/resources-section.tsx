"use client"

import { useState } from "react"
import { resources } from "@/data/resources"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, FileText, Video, Book, Wrench, Users } from "lucide-react"

const typeIcons = {
  article: FileText,
  video: Video,
  book: Book,
  tool: Wrench,
  community: Users,
}

const typeLabels = {
  article: "文章",
  video: "视频",
  book: "书籍",
  tool: "工具",
  community: "社区",
}

export function ResourcesSection() {
  const [activeType, setActiveType] = useState<string>("all")

  const types = [
    { id: "all", label: "全部" },
    { id: "article", label: "文章" },
    { id: "book", label: "书籍" },
    { id: "tool", label: "工具" },
    { id: "community", label: "社区" },
  ]

  const filteredResources = activeType === "all" ? resources : resources.filter((r) => r.type === activeType)

  return (
    <section id="resources" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="mb-4 text-3xl font-bold tracking-tight">资源库</h2>
          <p className="max-w-2xl text-muted-foreground">精选的平台工程学习资源，包括文章、书籍、工具和社区。</p>
        </div>

        <Tabs value={activeType} onValueChange={setActiveType} className="mb-8">
          <TabsList>
            {types.map((type) => (
              <TabsTrigger key={type.id} value={type.id}>
                {type.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource) => {
            const Icon = typeIcons[resource.type]
            return (
              <a key={resource.id} href={resource.url} target="_blank" rel="noopener noreferrer" className="group">
                <Card className="h-full transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                  <CardHeader>
                    <div className="mb-2 flex items-center gap-2">
                      <Icon className="h-4 w-4 text-primary" />
                      <Badge variant="secondary" className="text-xs">
                        {typeLabels[resource.type]}
                      </Badge>
                    </div>
                    <CardTitle className="flex items-center gap-2 text-lg group-hover:text-primary">
                      {resource.title}
                      <ExternalLink className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                    </CardTitle>
                    <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {resource.author && <p className="mb-3 text-sm text-muted-foreground">作者: {resource.author}</p>}
                    <div className="flex flex-wrap gap-2">
                      {resource.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
