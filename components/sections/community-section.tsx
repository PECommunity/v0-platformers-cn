"use client"

import { communityInfo } from "@/data/community"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"

export function CommunitySection() {
  return (
    <section id="community" className="bg-card/50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight">{communityInfo.name}</h2>
          <p className="text-xl text-primary">{communityInfo.tagline}</p>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground whitespace-pre-line">
            {communityInfo.description}
          </p>
        </div>

        {/* Stats */}
        <div className="mb-16 grid grid-cols-2 gap-6 md:grid-cols-4">
          {communityInfo.stats.map((stat) => (
            <Card key={stat.label} className="text-center">
              <CardContent className="pt-6">
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features */}
        <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {communityInfo.features.map((feature) => (
            <Card key={feature.title}>
              <CardContent className="pt-6">
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild size="lg" className="gap-2">
            <a href={communityInfo.url} target="_blank" rel="noopener noreferrer">
              访问 PECommunity 社区
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">加入我们，一起推动平台工程在中国的发展</p>
        </div>
      </div>
    </section>
  )
}
