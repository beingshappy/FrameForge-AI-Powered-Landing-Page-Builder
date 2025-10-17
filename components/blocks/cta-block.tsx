"use client"

import { type LandingPageBlock, useBuilderStore } from "@/lib/store"

interface CTABlockProps {
  block: LandingPageBlock
}

export function CTABlock({ block }: CTABlockProps) {
  const { updateBlock, theme } = useBuilderStore()

  return (
    <div
      className="py-20 px-6 border-b border-border"
      style={{
        background: `linear-gradient(135deg, ${theme.primaryColor}20 0%, ${theme.primaryColor}10 100%)`,
        fontFamily: theme.fontFamily === "serif" ? "serif" : theme.fontFamily === "mono" ? "monospace" : "sans-serif",
      }}
    >
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <input
          type="text"
          value={block.content.title || ""}
          onChange={(e) => updateBlock(block.id, { title: e.target.value })}
          className="w-full text-4xl font-bold text-foreground bg-transparent focus:outline-none focus:ring-2 rounded px-2"
          placeholder="CTA Title"
          style={{
            boxShadow: `0 0 0 2px ${theme.primaryColor}`,
          }}
        />

        <textarea
          value={block.content.description || ""}
          onChange={(e) => updateBlock(block.id, { description: e.target.value })}
          className="w-full text-lg text-muted-foreground bg-transparent focus:outline-none focus:ring-2 rounded px-2 resize-none"
          placeholder="CTA description"
          rows={3}
          style={{
            boxShadow: `0 0 0 2px ${theme.primaryColor}`,
          }}
        />

        <div className="flex gap-4 justify-center">
          <button
            className="px-8 py-3 text-background rounded-lg font-medium transition-all hover:opacity-90"
            style={{
              backgroundColor: theme.primaryColor,
            }}
          >
            {block.content.cta || "Get Started"}
          </button>
          <button
            className="px-8 py-3 border-2 rounded-lg font-medium transition-all hover:opacity-90"
            style={{
              borderColor: theme.primaryColor,
              color: theme.primaryColor,
            }}
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}
