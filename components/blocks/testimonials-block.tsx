"use client"

import { type LandingPageBlock, useBuilderStore } from "@/lib/store"
import { Star } from "lucide-react"

interface TestimonialsBlockProps {
  block: LandingPageBlock
}

export function TestimonialsBlock({ block }: TestimonialsBlockProps) {
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
          className="w-full text-4xl font-bold text-foreground bg-transparent focus:outline-none focus:ring-2 rounded px-2 mb-4 text-center"
          placeholder="Testimonials Title"
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
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={theme.primaryColor} color={theme.primaryColor} />
                ))}
              </div>
              <textarea
                value={item.title || ""}
                onChange={(e) => {
                  const newItems = [...items]
                  newItems[idx].title = e.target.value
                  updateBlock(block.id, { items: newItems })
                }}
                className="w-full text-sm text-foreground bg-transparent focus:outline-none focus:ring-2 rounded px-2 mb-4 resize-none italic"
                placeholder="Testimonial text"
                rows={3}
                style={{
                  boxShadow: `0 0 0 2px ${theme.primaryColor}`,
                }}
              />
              <input
                type="text"
                value={item.author || ""}
                onChange={(e) => {
                  const newItems = [...items]
                  newItems[idx].author = e.target.value
                  updateBlock(block.id, { items: newItems })
                }}
                className="w-full text-sm font-semibold text-foreground bg-transparent focus:outline-none focus:ring-2 rounded px-2 mb-1"
                placeholder="Author name"
                style={{
                  boxShadow: `0 0 0 2px ${theme.primaryColor}`,
                }}
              />
              <input
                type="text"
                value={item.role || ""}
                onChange={(e) => {
                  const newItems = [...items]
                  newItems[idx].role = e.target.value
                  updateBlock(block.id, { items: newItems })
                }}
                className="w-full text-xs text-muted-foreground bg-transparent focus:outline-none focus:ring-2 rounded px-2"
                placeholder="Author role"
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
