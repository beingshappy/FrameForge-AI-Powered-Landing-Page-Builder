"use client"

import { type LandingPageBlock, useBuilderStore } from "@/lib/store"

interface ContactBlockProps {
  block: LandingPageBlock
}

export function ContactBlock({ block }: ContactBlockProps) {
  const { updateBlock, theme } = useBuilderStore()

  return (
    <div
      className="py-20 px-6 bg-secondary border-b border-border"
      style={{
        fontFamily: theme.fontFamily === "serif" ? "serif" : theme.fontFamily === "mono" ? "monospace" : "sans-serif",
      }}
    >
      <div className="max-w-2xl mx-auto">
        <input
          type="text"
          value={block.content.title || ""}
          onChange={(e) => updateBlock(block.id, { title: e.target.value })}
          className="w-full text-4xl font-bold text-foreground bg-transparent focus:outline-none focus:ring-2 rounded px-2 mb-4 text-center"
          placeholder="Contact Title"
          style={{
            boxShadow: `0 0 0 2px ${theme.primaryColor}`,
          }}
        />

        <textarea
          value={block.content.description || ""}
          onChange={(e) => updateBlock(block.id, { description: e.target.value })}
          className="w-full text-center text-muted-foreground bg-transparent focus:outline-none focus:ring-2 rounded px-2 mb-8 resize-none"
          placeholder="Contact description"
          rows={3}
          style={{
            boxShadow: `0 0 0 2px ${theme.primaryColor}`,
          }}
        />

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 bg-muted border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2"
            style={{
              borderColor: theme.primaryColor,
              boxShadow: `0 0 0 2px ${theme.primaryColor}`,
            }}
          />
          <textarea
            placeholder="Your message"
            rows={5}
            className="w-full px-4 py-3 bg-muted border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 resize-none"
            style={{
              borderColor: theme.primaryColor,
              boxShadow: `0 0 0 2px ${theme.primaryColor}`,
            }}
          />
          <button
            className="w-full px-4 py-3 text-background rounded-lg font-medium transition-colors hover:opacity-90"
            style={{
              backgroundColor: theme.primaryColor,
            }}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}
