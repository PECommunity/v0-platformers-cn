// 平台工程方法与框架数据
export interface Framework {
  id: string
  title: string
  description: string
  category: "methodology" | "framework" | "pattern"
  tags: string[]
  content: string
  references?: { title: string; url: string }[]
}

export const frameworks: Framework[] = [
  {
    id: "team-topologies",
    title: "团队拓扑 (Team Topologies)",
    description: "一种组织设计和团队交互的方法论，定义了四种基本团队类型和三种交互模式",
    category: "methodology",
    tags: ["组织设计", "团队协作", "康威定律"],
    content: `## 核心概念

团队拓扑定义了四种基本团队类型：

1. **流对齐团队 (Stream-aligned Team)**: 与业务流程对齐，负责端到端的价值交付
2. **赋能团队 (Enabling Team)**: 帮助其他团队克服障碍，传播知识和能力
3. **复杂子系统团队 (Complicated Subsystem Team)**: 处理需要专业知识的复杂领域
4. **平台团队 (Platform Team)**: 提供内部服务，减少其他团队的认知负荷

## 三种交互模式

- **协作 (Collaboration)**: 紧密合作，共同发现新解决方案
- **服务即产品 (X-as-a-Service)**: 提供标准化服务，最小化协调成本
- **促进 (Facilitating)**: 帮助团队学习和成长`,
    references: [
      { title: "Team Topologies 官网", url: "https://teamtopologies.com/" },
      { title: "相关书籍", url: "https://teamtopologies.com/book" },
    ],
  },
  {
    id: "platform-as-product",
    title: "平台即产品 (Platform as a Product)",
    description: "将内部开发者平台视为产品来运营，关注用户体验和价值交付",
    category: "framework",
    tags: ["产品思维", "开发者体验", "平台运营"],
    content: `## 核心理念

平台即产品将内部开发者平台视为面向内部用户（开发者）的产品，强调：

- **用户中心**: 深入了解开发者的需求和痛点
- **价值驱动**: 关注平台为组织带来的实际价值
- **持续迭代**: 采用产品管理实践进行持续改进

## 关键实践

1. **建立产品团队**: 配备产品经理、设计师和工程师
2. **用户研究**: 定期收集开发者反馈
3. **度量驱动**: 建立关键指标体系
4. **文档优先**: 提供优秀的文档和自助服务`,
    references: [{ title: "CNCF Platform Engineering", url: "https://platformengineering.org/" }],
  },
  {
    id: "internal-developer-platform",
    title: "内部开发者平台 (IDP)",
    description: "为开发者提供自助服务能力的工具链和工作流程",
    category: "framework",
    tags: ["自助服务", "开发者工具", "自动化"],
    content: `## 什么是 IDP

内部开发者平台是一套集成的工具和服务，帮助开发者：

- 快速创建和部署应用
- 管理基础设施和环境
- 监控和调试应用
- 遵循组织最佳实践

## 核心组件

1. **应用配置管理**: 定义应用的期望状态
2. **基础设施编排**: 自动化资源配置
3. **环境管理**: 开发、测试、生产环境一致性
4. **部署流水线**: CI/CD 自动化
5. **可观测性**: 日志、指标、追踪一体化`,
    references: [
      { title: "Backstage", url: "https://backstage.io/" },
      { title: "Port", url: "https://getport.io/" },
    ],
  },
  {
    id: "golden-paths",
    title: "黄金路径 (Golden Paths)",
    description: "为开发者提供经过验证的最佳实践路径，降低认知负荷",
    category: "pattern",
    tags: ["最佳实践", "标准化", "开发者体验"],
    content: `## 概念

黄金路径是组织推荐的、经过验证的技术选择和实践方式。它们：

- 不是强制性的，而是推荐性的
- 经过优化，能够快速交付价值
- 降低开发者的决策负担

## 实施要点

1. **模板化**: 提供项目模板和脚手架
2. **自动化**: 集成 CI/CD 和基础设施即代码
3. **文档化**: 清晰说明使用方法和原因
4. **可扩展**: 允许在需要时偏离黄金路径`,
    references: [],
  },
  {
    id: "platform-maturity-model",
    title: "平台成熟度模型",
    description: "评估和规划平台工程实践成熟度的框架",
    category: "methodology",
    tags: ["成熟度评估", "路线图", "能力建设"],
    content: `## 成熟度级别

### Level 1: 临时性 (Ad-hoc)
- 没有统一的平台战略
- 工具选择分散
- 手动流程为主

### Level 2: 基础性 (Basic)
- 开始建立平台团队
- 基础的 CI/CD 流水线
- 部分自动化

### Level 3: 标准化 (Standardized)
- 统一的开发者门户
- 标准化的黄金路径
- 自助服务能力

### Level 4: 优化 (Optimized)
- 数据驱动的决策
- 持续优化开发者体验
- 高度自动化

### Level 5: 创新 (Innovative)
- 平台赋能业务创新
- 行业领先实践
- 开源贡献`,
    references: [],
  },
]
