"use client"

import { useBuilderStore } from "@/lib/store"
import { BarChart3, TrendingUp } from "lucide-react"

export function AnalyticsPanel() {
  const { blocks, theme } = useBuilderStore()

  const blockTypeDistribution = blocks.reduce(
    (acc, block) => {
      acc[block.type] = (acc[block.type] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const totalWords = blocks.reduce((acc, block) => {
    const title = block.content.title || ""
    const description = block.content.description || ""
    return acc + title.split(" ").length + description.split(" ").length
  }, 0)

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 size={18} className="text-accent" />
        <h3 className="text-sm font-semibold text-foreground">Page Analytics</h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-muted rounded-lg border border-border">
          <p className="text-xs text-muted-foreground mb-1">Total Blocks</p>
          <p className="text-2xl font-bold text-accent">{blocks.length}</p>
        </div>

        <div className="p-3 bg-muted rounded-lg border border-border">
          <p className="text-xs text-muted-foreground mb-1">Block Types</p>
          <p className="text-2xl font-bold text-accent">{Object.keys(blockTypeDistribution).length}</p>
        </div>

        <div className="p-3 bg-muted rounded-lg border border-border">
          <p className="text-xs text-muted-foreground mb-1">Total Words</p>
          <p className="text-2xl font-bold text-accent">{totalWords}</p>
        </div>

        <div className="p-3 bg-muted rounded-lg border border-border">
          <p className="text-xs text-muted-foreground mb-1">Est. Read Time</p>
          <p className="text-2xl font-bold text-accent">{Math.ceil(totalWords / 200)}m</p>
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <h4 className="text-xs font-semibold text-foreground mb-3 flex items-center gap-2">
          <TrendingUp size={14} />
          Block Distribution
        </h4>
        <div className="space-y-2">
          {Object.entries(blockTypeDistribution).map(([type, count]) => (
            <div key={type} className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground capitalize">{type}</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full"
                    style={{ width: `${(count / blocks.length) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-foreground w-6 text-right">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <h4 className="text-xs font-semibold text-foreground mb-2">Performance Tips</h4>
        <ul className="space-y-2 text-xs text-muted-foreground">
          <li>✓ {blocks.length > 0 ? "Page has content" : "Add blocks to get started"}</li>
          <li>
            ✓{" "}
            {Object.keys(blockTypeDistribution).length >= 3
              ? "Good variety of sections"
              : "Consider adding more section types"}
          </li>
          <li>✓ {totalWords > 100 ? "Sufficient content" : "Add more descriptive text"}</li>
        </ul>
      </div>
    </div>
  )
}
