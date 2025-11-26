// 导航配置数据
export interface NavItem {
  id: string
  title: string
  href?: string
  shortcut?: string
  description?: string
  children?: NavItem[]
  external?: boolean
}

export const navigation: NavItem[] = [
  {
    id: "home",
    title: "首页",
    href: "#home",
    shortcut: "g h",
    description: "返回首页",
  },
  {
    id: "frameworks",
    title: "方法框架",
    href: "#frameworks",
    shortcut: "g f",
    description: "平台工程方法与框架",
  },
  {
    id: "tools",
    title: "度量工具",
    href: "#tools",
    shortcut: "g t",
    description: "度量和测算工具",
  },
  {
    id: "resources",
    title: "资源库",
    href: "#resources",
    shortcut: "g r",
    description: "学习资源和参考资料",
  },
  {
    id: "community",
    title: "社区",
    href: "https://pecommunity.cn/",
    shortcut: "g c",
    description: "PECommunity 平台工程社区",
    external: true,
  },
]

export const shortcuts = [
  { keys: ["g", "h"], description: "跳转到首页", action: "navigate-home" },
  { keys: ["g", "f"], description: "跳转到方法框架", action: "navigate-frameworks" },
  { keys: ["g", "t"], description: "跳转到度量工具", action: "navigate-tools" },
  { keys: ["g", "r"], description: "跳转到资源库", action: "navigate-resources" },
  { keys: ["g", "c"], description: "跳转到社区", action: "navigate-community" },
  { keys: ["/"], description: "打开搜索", action: "open-search" },
  { keys: ["?"], description: "显示快捷键帮助", action: "show-shortcuts" },
  { keys: ["Escape"], description: "关闭弹窗", action: "close-modal" },
]
