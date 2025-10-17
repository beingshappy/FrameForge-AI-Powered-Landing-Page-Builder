"use client"

import { useState } from "react"
import { useBuilderStore } from "@/lib/store"
import { generateLandingPage } from "@/lib/ai"
import { RotateCcw } from "lucide-react"

export function PromptInput() {
  const { prompt, setPrompt, setBlocks, isGenerating, setIsGenerating, undo, history } = useBuilderStore()
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a description for your landing page")
      return
    }

    setError(null)
    setIsGenerating(true)

    try {
      const blocks = await generateLandingPage(prompt)
      setBlocks(blocks)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate landing page")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Describe your landing page</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A modern SaaS landing page for a project management tool with pricing and testimonials..."
          className="w-full h-32 px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent resize-none"
          disabled={isGenerating}
        />
      </div>

      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full px-4 py-3 bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-background rounded-lg transition-colors font-medium"
      >
        {isGenerating ? "Generating..." : "Generate Landing Page"}
      </button>

      {history.length > 0 && (
        <button
          onClick={undo}
          className="w-full px-4 py-2 bg-muted hover:bg-border text-foreground rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
        >
          <RotateCcw size={16} />
          Undo
        </button>
      )}

      {error && (
        <div className="p-3 bg-red-900/20 border border-red-700/50 rounded-lg text-red-200 text-sm">{error}</div>
      )}

      <div className="pt-4 border-t border-border">
        <h3 className="text-sm font-medium text-foreground mb-3">Add Blocks</h3>
        <div className="grid grid-cols-2 gap-2">
          {(["hero", "features", "pricing", "contact", "testimonials", "cta", "gallery"] as const).map((type) => (
            <button
              key={type}
              onClick={() => {
                const { addBlock } = useBuilderStore.getState()
                addBlock(type)
              }}
              className="px-3 py-2 text-xs bg-muted hover:bg-border text-foreground rounded transition-colors capitalize"
            >
              + {type}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <h3 className="text-sm font-medium text-foreground mb-3">Quick Examples</h3>
        <div className="space-y-2">
          {[
            "SaaS product with pricing and testimonials",
            "E-commerce store with featured products",
            "Agency portfolio with case studies",
            "Tech startup with features and CTA",
            "Photography portfolio with gallery",
          ].map((example) => (
            <button
              key={example}
              onClick={() => setPrompt(example)}
              className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:bg-muted rounded transition-colors"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
