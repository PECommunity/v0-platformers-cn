// 资源数据
export interface Resource {
  id: string
  title: string
  description: string
  type: "article" | "video" | "book" | "tool" | "community"
  url: string
  tags: string[]
  author?: string
  date?: string
}

export const resources: Resource[] = [
  {
    id: "platform-engineering-guide",
    title: "平台工程完全指南",
    description: "CNCF 发布的平台工程白皮书，全面介绍平台工程的概念和实践",
    type: "article",
    url: "https://tag-app-delivery.cncf.io/whitepapers/platforms/",
    tags: ["入门", "CNCF", "白皮书"],
    author: "CNCF TAG App Delivery",
  },
  {
    id: "backstage",
    title: "Backstage",
    description: "Spotify 开源的开发者门户平台，用于构建内部开发者平台",
    type: "tool",
    url: "https://backstage.io/",
    tags: ["开源", "开发者门户", "IDP"],
  },
  {
    id: "team-topologies-book",
    title: "Team Topologies",
    description: "Matthew Skelton 和 Manuel Pais 的经典著作，介绍团队拓扑方法论",
    type: "book",
    url: "https://teamtopologies.com/book",
    tags: ["团队", "组织设计", "经典"],
    author: "Matthew Skelton, Manuel Pais",
  },
  {
    id: "platform-engineering-org",
    title: "Platform Engineering Community",
    description: "全球平台工程社区，提供资源、会议和交流机会",
    type: "community",
    url: "https://platformengineering.org/",
    tags: ["社区", "国际"],
  },
  {
    id: "dora-research",
    title: "DORA Research",
    description: "DevOps 研究与评估，提供行业基准数据和最佳实践",
    type: "article",
    url: "https://dora.dev/",
    tags: ["研究", "DORA", "度量"],
  },
  {
    id: "humanitec",
    title: "Humanitec",
    description: "企业级内部开发者平台解决方案",
    type: "tool",
    url: "https://humanitec.com/",
    tags: ["商业", "IDP", "企业"],
  },
]
