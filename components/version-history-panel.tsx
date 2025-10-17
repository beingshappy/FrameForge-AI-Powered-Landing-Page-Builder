"use client"

import { useState } from "react"
import { useBuilderStore } from "@/lib/store"
import { Clock, RotateCcw, Trash2 } from "lucide-react"

interface Version {
  id: string
  timestamp: string
  name: string
  author: string
  changes: string
}

export function VersionHistoryPanel() {
  const { projectMetadata, updateProjectMetadata } = useBuilderStore()
  const [versions, setVersions] = useState<Version[]>([
    {
      id: "1",
      timestamp: new Date().toISOString(),
      name: "Current Version",
      author: "You",
      changes: "Updated hero section and added testimonials",
    },
    {
      id: "2",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      name: "Version 2",
      author: "You",
      changes: "Added pricing section",
    },
    {
      id: "3",
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      name: "Version 1",
      author: "You",
      changes: "Initial project creation",
    },
  ])

  const handleCreateVersion = () => {
    const newVersion: Version = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      name: `Version ${versions.length + 1}`,
      author: "You",
      changes: "Manual save",
    }
    setVersions([newVersion, ...versions])
  }

  const handleRestoreVersion = (id: string) => {
    console.log("[v0] Restoring version:", id)
    // In a real app, this would restore the project state
  }

  const handleDeleteVersion = (id: string) => {
    setVersions(versions.filter((v) => v.id !== id))
  }

  return (
    <div className="flex flex-col h-full bg-secondary">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Clock size={18} />
          Version History
        </h3>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <button
          onClick={handleCreateVersion}
          className="w-full px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity font-medium text-sm"
        >
          Save Current Version
        </button>

        <div className="space-y-2">
          {versions.map((version, index) => (
            <div key={version.id} className="p-3 bg-muted border border-border rounded-lg group">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="font-medium text-foreground text-sm">{version.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {new Date(version.timestamp).toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">{version.changes}</div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {index > 0 && (
                    <button
                      onClick={() => handleRestoreVersion(version.id)}
                      className="p-1 text-muted-foreground hover:text-accent transition-colors"
                      title="Restore this version"
                    >
                      <RotateCcw size={16} />
                    </button>
                  )}
                  {index > 0 && (
                    <button
                      onClick={() => handleDeleteVersion(version.id)}
                      className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                      title="Delete this version"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
              {index === 0 && <div className="text-xs px-2 py-1 bg-accent/20 text-accent rounded w-fit">Current</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
