"use client"

import { type LandingPageBlock, useBuilderStore } from "@/lib/store"

interface HeroBlockProps {
  block: LandingPageBlock
}

export function HeroBlock({ block }: HeroBlockProps) {
  const { updateBlock, theme } = useBuilderStore()

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-secondary to-background flex items-center justify-center px-6 py-20 border-b border-border"
      style={{
        fontFamily: theme.fontFamily === "serif" ? "serif" : theme.fontFamily === "mono" ? "monospace" : "sans-serif",
      }}
    >
      <div className="max-w-2xl w-full text-center space-y-6">
        <input
          type="text"
          value={block.content.title || ""}
          onChange={(e) => updateBlock(block.id, { title: e.target.value })}
          className="w-full text-5xl font-bold text-foreground bg-transparent focus:outline-none focus:ring-2 rounded px-2"
          placeholder="Enter title"
          style={{
            outlineColor: theme.primaryColor,
            boxShadow: `0 0 0 2px ${theme.primaryColor}`,
          }}
        />

        <textarea
          value={block.content.description || ""}
          onChange={(e) => updateBlock(block.id, { description: e.target.value })}
          className="w-full text-xl text-muted-foreground bg-transparent focus:outline-none focus:ring-2 rounded px-2 resize-none"
          placeholder="Enter description"
          rows={3}
          style={{
            boxShadow: `0 0 0 2px ${theme.primaryColor}`,
          }}
        />

        <button
          className="inline-block px-8 py-3 text-background rounded-lg font-medium focus:outline-none focus:ring-2 transition-all hover:opacity-90"
          style={{
            backgroundColor: theme.primaryColor,
            boxShadow: `0 0 0 2px ${theme.primaryColor}`,
          }}
        >
          {block.content.cta || "Get Started"}
        </button>

        <input
          type="text"
          value={block.content.cta || ""}
          onChange={(e) => updateBlock(block.id, { cta: e.target.value })}
          className="block mx-auto text-sm text-muted-foreground bg-transparent focus:outline-none focus:ring-2 rounded px-2 w-32 text-center"
          placeholder="Button text"
          style={{
            boxShadow: `0 0 0 2px ${theme.primaryColor}`,
          }}
        />
      </div>
    </div>
  )
}
