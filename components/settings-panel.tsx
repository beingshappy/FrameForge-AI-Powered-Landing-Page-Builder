"use client"

import { useBuilderStore } from "@/lib/store"
import { Download, Upload, Trash2 } from "lucide-react"
import { useState } from "react"

export function SettingsPanel() {
  const { blocks, theme, setBlocks, setTheme } = useBuilderStore()
  const [saved, setSaved] = useState(false)

  const handleSaveToLocalStorage = () => {
    const data = { blocks, theme }
    localStorage.setItem("frameforge-project", JSON.stringify(data))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleLoadFromLocalStorage = () => {
    const data = localStorage.getItem("frameforge-project")
    if (data) {
      const { blocks: savedBlocks, theme: savedTheme } = JSON.parse(data)
      setBlocks(savedBlocks)
      setTheme(savedTheme)
    }
  }

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all blocks? This cannot be undone.")) {
      setBlocks([])
    }
  }

  const handleExportProject = () => {
    const data = { blocks, theme, exportedAt: new Date().toISOString() }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `frameforge-project-${Date.now()}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-6 space-y-4">
      <h3 className="text-sm font-semibold text-foreground">Project Settings</h3>

      <div className="space-y-3">
        <button
          onClick={handleSaveToLocalStorage}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-muted hover:bg-border text-foreground rounded transition-colors text-sm font-medium"
        >
          <Download size={14} />
          {saved ? "Saved!" : "Save Project"}
        </button>

        <button
          onClick={handleLoadFromLocalStorage}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-muted hover:bg-border text-foreground rounded transition-colors text-sm font-medium"
        >
          <Upload size={14} />
          Load Project
        </button>

        <button
          onClick={handleExportProject}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-muted hover:bg-border text-foreground rounded transition-colors text-sm font-medium"
        >
          <Download size={14} />
          Export Project
        </button>

        <button
          onClick={handleClearAll}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-900/20 hover:bg-red-900/40 border border-red-700/50 text-red-400 rounded transition-colors text-sm font-medium"
        >
          <Trash2 size={14} />
          Clear All
        </button>
      </div>

      <div className="pt-4 border-t border-border">
        <h4 className="text-xs font-semibold text-foreground mb-3 uppercase">Project Info</h4>
        <div className="space-y-2 text-xs text-muted-foreground">
          <p>
            <strong>Total Blocks:</strong> {blocks.length}
          </p>
          <p>
            <strong>Block Types:</strong> {[...new Set(blocks.map((b) => b.type))].length}
          </p>
          <p>
            <strong>Theme Color:</strong> {theme.primaryColor}
          </p>
          <p>
            <strong>Font:</strong> {theme.fontFamily}
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <h4 className="text-xs font-semibold text-foreground mb-2 uppercase">SEO Settings</h4>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Page Title"
            defaultValue="My Landing Page"
            className="w-full px-3 py-2 bg-muted border border-border rounded text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent"
          />
          <textarea
            placeholder="Meta Description"
            defaultValue="A beautiful landing page built with FrameForge"
            rows={3}
            className="w-full px-3 py-2 bg-muted border border-border rounded text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent resize-none"
          />
        </div>
      </div>
    </div>
  )
}
