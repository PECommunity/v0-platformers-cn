"use client"

import type React from "react"

import { useEffect, useState } from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { navigation } from "@/data/navigation"
import { frameworks } from "@/data/frameworks"
import { tools } from "@/data/tools"
import { Kbd } from "@/components/ui/kbd"
import { Home, Layers, Wrench, BookOpen, Users, ExternalLink, FileText, Calculator } from "lucide-react"

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onNavigate: (section: string) => void
  onSelectFramework: (id: string) => void
  onSelectTool: (id: string) => void
}

const iconMap: Record<string, React.ReactNode> = {
  home: <Home className="h-4 w-4" />,
  frameworks: <Layers className="h-4 w-4" />,
  tools: <Wrench className="h-4 w-4" />,
  resources: <BookOpen className="h-4 w-4" />,
  community: <Users className="h-4 w-4" />,
}

export function CommandPalette({
  open,
  onOpenChange,
  onNavigate,
  onSelectFramework,
  onSelectTool,
}: CommandPaletteProps) {
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (!open) setSearch("")
  }, [open])

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="搜索页面、框架、工具..." value={search} onValueChange={setSearch} />
      <CommandList>
        <CommandEmpty>未找到相关内容</CommandEmpty>

        <CommandGroup heading="导航">
          {navigation.map((item) => (
            <CommandItem
              key={item.id}
              value={`${item.title} ${item.description}`}
              onSelect={() => {
                if (item.external) {
                  window.open(item.href, "_blank")
                } else {
                  onNavigate(item.id)
                }
                onOpenChange(false)
              }}
            >
              <span className="mr-2">{iconMap[item.id]}</span>
              <span>{item.title}</span>
              {item.external && <ExternalLink className="ml-auto h-3 w-3 text-muted-foreground" />}
              {item.shortcut && <Kbd className="ml-auto">{item.shortcut}</Kbd>}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="方法框架">
          {frameworks.map((framework) => (
            <CommandItem
              key={framework.id}
              value={`${framework.title} ${framework.description} ${framework.tags.join(" ")}`}
              onSelect={() => {
                onSelectFramework(framework.id)
                onOpenChange(false)
              }}
            >
              <FileText className="mr-2 h-4 w-4" />
              <div className="flex flex-col">
                <span>{framework.title}</span>
                <span className="text-xs text-muted-foreground line-clamp-1">{framework.description}</span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="度量工具">
          {tools.map((tool) => (
            <CommandItem
              key={tool.id}
              value={`${tool.title} ${tool.description}`}
              onSelect={() => {
                onSelectTool(tool.id)
                onOpenChange(false)
              }}
            >
              <Calculator className="mr-2 h-4 w-4" />
              <div className="flex flex-col">
                <span>{tool.title}</span>
                <span className="text-xs text-muted-foreground line-clamp-1">{tool.description}</span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
