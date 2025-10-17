"use client"

import { useBuilderStore } from "@/lib/store"
import { Activity, Zap, ImageIcon, Code } from "lucide-react"

export function PerformancePanel() {
  const { blocks } = useBuilderStore()

  const calculateMetrics = () => {
    let totalImages = 0
    let totalText = 0
    let estimatedLoadTime = 0

    blocks.forEach((block) => {
      if (block.type === "gallery") totalImages += 3
      if (block.type === "hero") totalImages += 1
      if (block.content.text) totalText += block.content.text.length
    })

    // Rough estimation: 100ms per image + 50ms per 1000 chars
    estimatedLoadTime = totalImages * 100 + (totalText / 1000) * 50

    return {
      totalImages,
      totalText,
      estimatedLoadTime: Math.max(500, estimatedLoadTime),
      blockCount: blocks.length,
    }
  }

  const metrics = calculateMetrics()

  const getPerformanceScore = () => {
    let score = 100
    if (metrics.totalImages > 10) score -= 20
    if (metrics.blockCount > 15) score -= 10
    if (metrics.estimatedLoadTime > 3000) score -= 15
    return Math.max(0, score)
  }

  const performanceScore = getPerformanceScore()

  const getScoreColor = () => {
    if (performanceScore >= 80) return "text-green-500"
    if (performanceScore >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <div className="flex flex-col h-full bg-secondary">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Performance</h3>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Performance Score */}
        <div className="p-4 bg-muted border border-border rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Performance Score</span>
            <span className={`text-3xl font-bold ${getScoreColor()}`}>{performanceScore}</span>
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                performanceScore >= 80 ? "bg-green-500" : performanceScore >= 60 ? "bg-yellow-500" : "bg-red-500"
              }`}
              style={{ width: `${performanceScore}%` }}
            />
          </div>
        </div>

        {/* Metrics */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-muted border border-border rounded-lg">
            <ImageIcon size={20} className="text-accent" />
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground">Images</div>
              <div className="text-xs text-muted-foreground">{metrics.totalImages} images detected</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-muted border border-border rounded-lg">
            <Code size={20} className="text-accent" />
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground">Blocks</div>
              <div className="text-xs text-muted-foreground">{metrics.blockCount} content blocks</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-muted border border-border rounded-lg">
            <Zap size={20} className="text-accent" />
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground">Load Time</div>
              <div className="text-xs text-muted-foreground">~{(metrics.estimatedLoadTime / 1000).toFixed(1)}s</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-muted border border-border rounded-lg">
            <Activity size={20} className="text-accent" />
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground">Content Size</div>
              <div className="text-xs text-muted-foreground">~{(metrics.totalText / 1024).toFixed(1)}KB</div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <h4 className="text-sm font-medium text-blue-700 dark:text-blue-400 mb-2">Optimization Tips</h4>
          <ul className="space-y-1 text-xs text-blue-600 dark:text-blue-300">
            <li>• Optimize images to reduce file size</li>
            <li>• Use lazy loading for below-the-fold content</li>
            <li>• Minimize CSS and JavaScript</li>
            <li>• Enable caching for static assets</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
