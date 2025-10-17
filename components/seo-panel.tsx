"use client"

import { useBuilderStore } from "@/lib/store"
import { AlertCircle, Eye } from "lucide-react"

export function SEOPanel() {
  const { projectMetadata, updateProjectMetadata } = useBuilderStore()

  const calculateSEOScore = () => {
    let score = 0
    if (projectMetadata.title && projectMetadata.title.length > 30 && projectMetadata.title.length < 60) score += 25
    if (
      projectMetadata.description &&
      projectMetadata.description.length > 120 &&
      projectMetadata.description.length < 160
    )
      score += 25
    if (projectMetadata.keywords && projectMetadata.keywords.length > 0) score += 25
    if (projectMetadata.ogImage) score += 25
    return score
  }

  const seoScore = calculateSEOScore()

  const getSEORecommendations = () => {
    const recommendations = []
    if (!projectMetadata.title || projectMetadata.title.length === 0)
      recommendations.push("Add a page title (30-60 characters)")
    if (!projectMetadata.description || projectMetadata.description.length === 0)
      recommendations.push("Add a meta description (120-160 characters)")
    if (!projectMetadata.keywords || projectMetadata.keywords.length === 0)
      recommendations.push("Add relevant keywords")
    if (!projectMetadata.ogImage) recommendations.push("Add an Open Graph image for social sharing")
    return recommendations
  }

  const recommendations = getSEORecommendations()

  return (
    <div className="flex flex-col h-full bg-secondary">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">SEO Settings</h3>
      </div>

      {/* SEO Score */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">SEO Score</span>
          <span className="text-2xl font-bold text-accent">{seoScore}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div className="bg-accent h-2 rounded-full transition-all" style={{ width: `${seoScore}%` }} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Page Title */}
        <div>
          <label className="text-sm font-medium text-foreground block mb-2">Page Title</label>
          <input
            type="text"
            value={projectMetadata.title || ""}
            onChange={(e) => updateProjectMetadata({ title: e.target.value })}
            maxLength={60}
            placeholder="Your page title (30-60 characters)"
            className="w-full px-3 py-2 bg-muted border border-border rounded text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <div className="text-xs text-muted-foreground mt-1">{projectMetadata.title?.length || 0}/60 characters</div>
        </div>

        {/* Meta Description */}
        <div>
          <label className="text-sm font-medium text-foreground block mb-2">Meta Description</label>
          <textarea
            value={projectMetadata.description || ""}
            onChange={(e) => updateProjectMetadata({ description: e.target.value })}
            maxLength={160}
            placeholder="Your meta description (120-160 characters)"
            className="w-full px-3 py-2 bg-muted border border-border rounded text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
            rows={3}
          />
          <div className="text-xs text-muted-foreground mt-1">
            {projectMetadata.description?.length || 0}/160 characters
          </div>
        </div>

        {/* Keywords */}
        <div>
          <label className="text-sm font-medium text-foreground block mb-2">Keywords</label>
          <input
            type="text"
            value={projectMetadata.keywords || ""}
            onChange={(e) => updateProjectMetadata({ keywords: e.target.value })}
            placeholder="Separate keywords with commas"
            className="w-full px-3 py-2 bg-muted border border-border rounded text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* OG Image */}
        <div>
          <label className="text-sm font-medium text-foreground block mb-2">Open Graph Image</label>
          <input
            type="text"
            value={projectMetadata.ogImage || ""}
            onChange={(e) => updateProjectMetadata({ ogImage: e.target.value })}
            placeholder="Image URL for social sharing"
            className="w-full px-3 py-2 bg-muted border border-border rounded text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Canonical URL */}
        <div>
          <label className="text-sm font-medium text-foreground block mb-2">Canonical URL</label>
          <input
            type="text"
            value={projectMetadata.canonicalUrl || ""}
            onChange={(e) => updateProjectMetadata({ canonicalUrl: e.target.value })}
            placeholder="https://example.com"
            className="w-full px-3 py-2 bg-muted border border-border rounded text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <h4 className="text-sm font-medium text-yellow-700 dark:text-yellow-400 mb-2 flex items-center gap-2">
              <AlertCircle size={16} />
              SEO Recommendations
            </h4>
            <ul className="space-y-1">
              {recommendations.map((rec, idx) => (
                <li key={idx} className="text-xs text-yellow-600 dark:text-yellow-300">
                  • {rec}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Preview */}
        <div className="p-3 bg-muted border border-border rounded-lg">
          <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <Eye size={16} />
            Search Preview
          </h4>
          <div className="text-xs space-y-1">
            <div className="text-accent font-medium truncate">{projectMetadata.title || "Your Page Title"}</div>
            <div className="text-muted-foreground truncate">
              {projectMetadata.description || "Your meta description will appear here"}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
