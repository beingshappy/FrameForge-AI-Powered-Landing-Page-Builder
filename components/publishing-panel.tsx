"use client"

import { useState } from "react"
import { useBuilderStore } from "@/lib/store"
import { Globe, Copy, Check, AlertCircle } from "lucide-react"

export function PublishingPanel() {
  const { projectMetadata, updateProjectMetadata } = useBuilderStore()
  const [publishStatus, setPublishStatus] = useState<"draft" | "published" | "publishing">("draft")
  const [copied, setCopied] = useState(false)

  const publishedUrl = projectMetadata.publishedUrl || `https://frameforge.app/${projectMetadata.id}`

  const handlePublish = async () => {
    setPublishStatus("publishing")
    // Simulate publishing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setPublishStatus("published")
    updateProjectMetadata({ publishedUrl, publishedAt: new Date().toISOString() })
  }

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(publishedUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleUnpublish = () => {
    setPublishStatus("draft")
    updateProjectMetadata({ publishedUrl: null })
  }

  return (
    <div className="flex flex-col h-full bg-secondary">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Globe size={18} />
          Publishing
        </h3>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Status */}
        <div className="p-4 bg-muted border border-border rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">Status</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                publishStatus === "published"
                  ? "bg-green-500/20 text-green-700 dark:text-green-400"
                  : publishStatus === "publishing"
                    ? "bg-blue-500/20 text-blue-700 dark:text-blue-400"
                    : "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400"
              }`}
            >
              {publishStatus === "published" ? "Published" : publishStatus === "publishing" ? "Publishing..." : "Draft"}
            </span>
          </div>

          {publishStatus === "draft" ? (
            <button
              onClick={handlePublish}
              className="w-full px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              Publish Now
            </button>
          ) : (
            <button
              onClick={handleUnpublish}
              className="w-full px-4 py-2 bg-destructive/20 text-destructive rounded-lg hover:bg-destructive/30 transition-colors font-medium"
            >
              Unpublish
            </button>
          )}
        </div>

        {/* Published URL */}
        {publishStatus === "published" && (
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <h4 className="text-sm font-medium text-green-700 dark:text-green-400 mb-3">Your Site is Live</h4>
            <div className="flex gap-2">
              <input
                type="text"
                value={publishedUrl}
                readOnly
                className="flex-1 px-3 py-2 bg-secondary border border-border rounded text-sm text-foreground"
              />
              <button
                onClick={handleCopyUrl}
                className="px-3 py-2 bg-accent text-accent-foreground rounded hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
            <p className="text-xs text-green-600 dark:text-green-300 mt-2">
              Published on {projectMetadata.publishedAt ? new Date(projectMetadata.publishedAt).toLocaleString() : ""}
            </p>
          </div>
        )}

        {/* Custom Domain */}
        <div className="p-4 bg-muted border border-border rounded-lg">
          <h4 className="text-sm font-medium text-foreground mb-3">Custom Domain</h4>
          <input
            type="text"
            placeholder="example.com"
            defaultValue={projectMetadata.customDomain || ""}
            onChange={(e) => updateProjectMetadata({ customDomain: e.target.value })}
            className="w-full px-3 py-2 bg-secondary border border-border rounded text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Point your domain to: <code className="bg-secondary px-2 py-1 rounded">ns1.frameforge.app</code>
          </p>
        </div>

        {/* Publishing Settings */}
        <div className="p-4 bg-muted border border-border rounded-lg">
          <h4 className="text-sm font-medium text-foreground mb-3">Publishing Settings</h4>
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked={projectMetadata.indexable !== false}
                onChange={(e) => updateProjectMetadata({ indexable: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm text-foreground">Allow search engines to index</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked={projectMetadata.passwordProtected === true}
                onChange={(e) => updateProjectMetadata({ passwordProtected: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm text-foreground">Password protect site</span>
            </label>
          </div>
        </div>

        {/* Info */}
        <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg flex gap-2">
          <AlertCircle size={16} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-blue-600 dark:text-blue-300">
            Your site will be available at the URL above. You can update it anytime before publishing.
          </div>
        </div>
      </div>
    </div>
  )
}
