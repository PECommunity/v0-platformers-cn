import Link from "next/link"
import { ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="#home" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">道</span>
              </div>
              <span className="text-lg font-semibold">平台之道</span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              平台之道是 PECommunity 平台工程社区出品的知识平台， 致力于分享平台工程的方法论、框架和实用工具。
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-4 font-semibold">导航</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#frameworks" className="text-muted-foreground hover:text-foreground">
                  方法框架
                </Link>
              </li>
              <li>
                <Link href="#tools" className="text-muted-foreground hover:text-foreground">
                  度量工具
                </Link>
              </li>
              <li>
                <Link href="#resources" className="text-muted-foreground hover:text-foreground">
                  资源库
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="mb-4 font-semibold">社区</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://pecommunity.cn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                >
                  PECommunity
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/pecommunity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                >
                  GitHub
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PECommunity. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            域名:{" "}
            <a href="https://platformers.cn" className="text-primary hover:underline">
              platformers.cn
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
