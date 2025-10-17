"use client"

import { type LandingPageBlock, useBuilderStore } from "@/lib/store"

interface FeaturesBlockProps {
  block: LandingPageBlock
}

export function FeaturesBlock({ block }: FeaturesBlockProps) {
  const { updateBlock, theme } = useBuilderStore()
  const items = block.content.items || []

  return (
    <div
      className="py-20 px-6 bg-secondary border-b border-border"
      style={{
        fontFamily: theme.fontFamily === "serif" ? "serif" : theme.fontFamily === "mono" ? "monospace" : "sans-serif",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <input
          type="text"
          value={block.content.title || ""}
          onChange={(e) => updateBlock(block.id, { title: e.target.value })}
          className="w-full text-4xl font-bold text-foreground bg-transparent focus:outline-none focus:ring-2 rounded px-2 mb-4"
          placeholder="Features Title"
          style={{
            boxShadow: `0 0 0 2px ${theme.primaryColor}`,
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-muted rounded-lg border"
              style={{
                borderColor: theme.primaryColor,
              }}
            >
              <input
                type="text"
                value={item.title || ""}
                onChange={(e) => {
                  const newItems = [...items]
                  newItems[idx].title = e.target.value
                  updateBlock(block.id, { items: newItems })
                }}
                className="w-full text-lg font-semibold text-foreground bg-transparent focus:outline-none focus:ring-2 rounded px-2 mb-2"
                placeholder="Feature title"
                style={{
                  boxShadow: `0 0 0 2px ${theme.primaryColor}`,
                }}
              />
              <textarea
                value={item.description || ""}
                onChange={(e) => {
                  const newItems = [...items]
                  newItems[idx].description = e.target.value
                  updateBlock(block.id, { items: newItems })
                }}
                className="w-full text-sm text-muted-foreground bg-transparent focus:outline-none focus:ring-2 rounded px-2 resize-none"
                placeholder="Feature description"
                rows={3}
                style={{
                  boxShadow: `0 0 0 2px ${theme.primaryColor}`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
