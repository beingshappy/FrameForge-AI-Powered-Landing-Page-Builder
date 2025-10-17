"use client"

import { type LandingPageBlock, useBuilderStore } from "@/lib/store"

interface GalleryBlockProps {
  block: LandingPageBlock
}

export function GalleryBlock({ block }: GalleryBlockProps) {
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
          placeholder="Gallery Title"
          style={{
            boxShadow: `0 0 0 2px ${theme.primaryColor}`,
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="rounded-lg overflow-hidden border"
              style={{
                borderColor: theme.primaryColor,
              }}
            >
              <img
                src={item.image || "/placeholder.svg?height=300&width=400&query=gallery"}
                alt={item.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 bg-muted">
                <input
                  type="text"
                  value={item.title || ""}
                  onChange={(e) => {
                    const newItems = [...items]
                    newItems[idx].title = e.target.value
                    updateBlock(block.id, { items: newItems })
                  }}
                  className="w-full text-sm font-semibold text-foreground bg-transparent focus:outline-none focus:ring-2 rounded px-2"
                  placeholder="Image title"
                  style={{
                    boxShadow: `0 0 0 2px ${theme.primaryColor}`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
