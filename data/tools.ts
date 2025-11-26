// 度量和测算工具数据
export interface Tool {
  id: string
  title: string
  description: string
  category: "metric" | "calculator" | "assessment"
  icon: string
}

export interface MetricDefinition {
  id: string
  name: string
  description: string
  formula?: string
  benchmark?: string
  category: string
}

export interface AssessmentQuestion {
  id: string
  question: string
  category: string
  options: {
    value: number
    label: string
    description?: string
  }[]
}

export const tools: Tool[] = [
  {
    id: "dora-metrics",
    title: "DORA 指标计算器",
    description: "计算部署频率、变更前置时间、变更失败率和恢复时间",
    category: "calculator",
    icon: "chart-bar",
  },
  {
    id: "space-framework",
    title: "SPACE 框架评估",
    description: "从满意度、性能、活动、沟通、效率五个维度评估开发者生产力",
    category: "assessment",
    icon: "compass",
  },
  {
    id: "platform-roi",
    title: "平台 ROI 计算器",
    description: "计算平台工程投资回报率",
    category: "calculator",
    icon: "calculator",
  },
  {
    id: "cognitive-load",
    title: "认知负荷评估",
    description: "评估团队的认知负荷水平",
    category: "assessment",
    icon: "brain",
  },
  {
    id: "developer-experience",
    title: "开发者体验评分",
    description: "评估和跟踪开发者体验指标",
    category: "metric",
    icon: "heart",
  },
]

export const doraMetrics: MetricDefinition[] = [
  {
    id: "deployment-frequency",
    name: "部署频率",
    description: "组织成功将代码部署到生产环境的频率",
    category: "throughput",
    benchmark: "精英: 按需（每天多次）| 高: 每天至每周 | 中: 每周至每月 | 低: 每月至每六个月",
  },
  {
    id: "lead-time",
    name: "变更前置时间",
    description: "从代码提交到代码成功运行在生产环境的时间",
    category: "throughput",
    benchmark: "精英: 少于1天 | 高: 1天至1周 | 中: 1周至1月 | 低: 1月至6月",
  },
  {
    id: "change-failure-rate",
    name: "变更失败率",
    description: "部署到生产环境后导致服务降级或需要修复的变更百分比",
    category: "stability",
    benchmark: "精英: 0-15% | 高: 16-30% | 中: 16-30% | 低: 16-30%",
  },
  {
    id: "mttr",
    name: "服务恢复时间",
    description: "从服务中断到恢复正常的时间",
    category: "stability",
    benchmark: "精英: 少于1小时 | 高: 少于1天 | 中: 1天至1周 | 低: 1周至1月",
  },
]

export const platformMaturityQuestions: AssessmentQuestion[] = [
  {
    id: "q1",
    question: "你们的开发者如何获取开发环境？",
    category: "自助服务",
    options: [
      { value: 1, label: "手动配置", description: "需要 IT 或运维团队手动配置" },
      { value: 2, label: "部分自动化", description: "有一些脚本，但仍需人工介入" },
      { value: 3, label: "自助服务", description: "开发者可以自行申请和配置" },
      { value: 4, label: "即时可用", description: "几分钟内即可获得完整环境" },
    ],
  },
  {
    id: "q2",
    question: "部署到生产环境需要多长时间？",
    category: "部署效率",
    options: [
      { value: 1, label: "数周", description: "需要多个审批和手动步骤" },
      { value: 2, label: "数天", description: "有 CI/CD 但仍有手动步骤" },
      { value: 3, label: "数小时", description: "大部分自动化，少量审批" },
      { value: 4, label: "数分钟", description: "完全自动化的流水线" },
    ],
  },
  {
    id: "q3",
    question: "开发者如何了解可用的服务和工具？",
    category: "服务发现",
    options: [
      { value: 1, label: "口口相传", description: "依赖同事之间的信息传递" },
      { value: 2, label: "文档", description: "有文档但可能不完整或过时" },
      { value: 3, label: "内部门户", description: "有统一的服务目录" },
      { value: 4, label: "智能推荐", description: "平台主动推荐相关服务" },
    ],
  },
  {
    id: "q4",
    question: "平台团队如何收集用户反馈？",
    category: "用户反馈",
    options: [
      { value: 1, label: "被动接收", description: "等待用户报告问题" },
      { value: 2, label: "定期调查", description: "每季度进行满意度调查" },
      { value: 3, label: "持续收集", description: "内置反馈机制和使用分析" },
      { value: 4, label: "数据驱动", description: "基于数据主动改进体验" },
    ],
  },
  {
    id: "q5",
    question: "你们的基础设施是如何管理的？",
    category: "基础设施",
    options: [
      { value: 1, label: "手动管理", description: "通过控制台或 SSH 手动操作" },
      { value: 2, label: "脚本化", description: "有自动化脚本但非版本控制" },
      { value: 3, label: "基础设施即代码", description: "使用 Terraform/Pulumi 等工具" },
      { value: 4, label: "GitOps", description: "完全声明式，Git 为唯一真相源" },
    ],
  },
]
