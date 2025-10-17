"use client"

import { useBuilderStore } from "@/lib/store"
import { generateJSX, generateHTML, generateJSON, downloadFile } from "@/lib/export"
import { Copy, Download, Share2 } from "lucide-react"
import { useState } from "react"

export function ExportPanel() {
  const { blocks, theme } = useBuilderStore()
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = (format: "jsx" | "html" | "json") => {
    let content = ""
    if (format === "jsx") content = generateJSX(blocks, theme)
    else if (format === "html") content = generateHTML(blocks, theme)
    else content = generateJSON(blocks, theme)

    navigator.clipboard.writeText(content)
    setCopied(format)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleDownload = (format: "jsx" | "html" | "json") => {
    let content = ""
    let filename = ""
    let type = ""

    if (format === "jsx") {
      content = generateJSX(blocks, theme)
      filename = "landing-page.tsx"
      type = "text/plain"
    } else if (format === "html") {
      content = generateHTML(blocks, theme)
      filename = "landing-page.html"
      type = "text/html"
    } else {
      content = generateJSON(blocks, theme)
      filename = "landing-page.json"
      type = "application/json"
    }

    downloadFile(content, filename, type)
  }

  const exportOptions = [
    { format: "jsx" as const, label: "React/JSX", description: "Next.js compatible component", icon: "⚛️" },
    { format: "html" as const, label: "HTML", description: "Standalone HTML file", icon: "🌐" },
    { format: "json" as const, label: "JSON", description: "Backup & share configuration", icon: "📋" },
  ]

  return (
    <div className="p-6 space-y-4">
      <h3 className="text-sm font-semibold text-foreground">Export Your Landing Page</h3>

      <div className="space-y-3">
        {exportOptions.map((option) => (
          <div key={option.format} className="p-4 bg-muted rounded-lg border border-border">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-medium text-foreground">{option.label}</p>
                <p className="text-xs text-muted-foreground">{option.description}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleCopy(option.format)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-secondary hover:bg-border text-foreground rounded transition-colors text-sm"
              >
                <Copy size={14} />
                {copied === option.format ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={() => handleDownload(option.format)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-accent hover:bg-accent-hover text-background rounded transition-colors text-sm font-medium"
              >
                <Download size={14} />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-border">
        <h4 className="text-xs font-semibold text-foreground mb-3 uppercase">Summary</h4>
        <div className="space-y-2 text-xs text-muted-foreground">
          <p>
            <strong>Blocks:</strong> {blocks.length}
          </p>
          <p>
            <strong>Block Types:</strong> {[...new Set(blocks.map((b) => b.type))].join(", ")}
          </p>
          <p>
            <strong>Primary Color:</strong>{" "}
            <span
              className="inline-block w-3 h-3 rounded border border-border ml-1 align-middle"
              style={{ backgroundColor: theme.primaryColor }}
            />
            {theme.primaryColor}
          </p>
          <p>
            <strong>Font:</strong> {theme.fontFamily}
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-muted hover:bg-border text-foreground rounded transition-colors text-sm font-medium">
          <Share2 size={14} />
          Share Landing Page
        </button>
      </div>
    </div>
  )
}
