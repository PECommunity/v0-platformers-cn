"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Kbd } from "@/components/ui/kbd"
import { shortcuts } from "@/data/navigation"

interface ShortcutsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ShortcutsDialog({ open, onOpenChange }: ShortcutsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>键盘快捷键</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="rounded-lg border border-border">
            <div className="divide-y divide-border">
              {shortcuts.map((shortcut, index) => (
                <div key={index} className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-muted-foreground">{shortcut.description}</span>
                  <div className="flex items-center gap-1">
                    {shortcut.keys.map((key, i) => (
                      <span key={i} className="flex items-center gap-1">
                        <Kbd>{key}</Kbd>
                        {i < shortcut.keys.length - 1 && <span className="text-xs text-muted-foreground">+</span>}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            按 <Kbd>Escape</Kbd> 关闭此对话框
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
