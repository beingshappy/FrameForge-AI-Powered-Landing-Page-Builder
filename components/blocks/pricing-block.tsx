"use client"

import { type LandingPageBlock, useBuilderStore } from "@/lib/store"

interface PricingBlockProps {
  block: LandingPageBlock
}

export function PricingBlock({ block }: PricingBlockProps) {
  const { updateBlock, theme } = useBuilderStore()
  const items = block.content.items || []

  return (
    <div
      className="py-20 px-6 bg-background border-b border-border"
      style={{
        fontFamily: theme.fontFamily === "serif" ? "serif" : theme.fontFamily === "mono" ? "monospace" : "sans-serif",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <input
          type="text"
          value={block.content.title || ""}
          onChange={(e) => updateBlock(block.id, { title: e.target.value })}
          className="w-full text-4xl font-bold text-foreground bg-transparent focus:outline-none focus:ring-2 rounded px-2 mb-4 text-center"
          placeholder="Pricing Title"
          style={{
            boxShadow: `0 0 0 2px ${theme.primaryColor}`,
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="p-8 bg-secondary rounded-lg border transition-colors"
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
                className="w-full text-2xl font-bold text-foreground bg-transparent focus:outline-none focus:ring-2 rounded px-2 mb-2"
                placeholder="Plan name"
                style={{
                  boxShadow: `0 0 0 2px ${theme.primaryColor}`,
                }}
              />
              <input
                type="text"
                value={item.price || ""}
                onChange={(e) => {
                  const newItems = [...items]
                  newItems[idx].price = e.target.value
                  updateBlock(block.id, { items: newItems })
                }}
                className="w-full text-3xl font-bold bg-transparent focus:outline-none focus:ring-2 rounded px-2 mb-4"
                placeholder="$99"
                style={{
                  color: theme.primaryColor,
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
                placeholder="Plan description"
                rows={4}
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
