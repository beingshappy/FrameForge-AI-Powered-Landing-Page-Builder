"use client"

import type React from "react"

import { useBuilderStore } from "@/lib/store"
import { useState } from "react"

export function ThemePanel() {
  const { theme, setTheme } = useBuilderStore()
  const [customColor, setCustomColor] = useState(theme.primaryColor)

  const colors = [
    { name: "Emerald", value: "#10b981" },
    { name: "Blue", value: "#3b82f6" },
    { name: "Purple", value: "#a855f7" },
    { name: "Pink", value: "#ec4899" },
    { name: "Orange", value: "#f97316" },
    { name: "Red", value: "#ef4444" },
    { name: "Cyan", value: "#06b6d4" },
    { name: "Indigo", value: "#6366f1" },
    { name: "Lime", value: "#84cc16" },
    { name: "Rose", value: "#f43f5e" },
  ]

  const fonts = [
    { name: "Sans", value: "sans" },
    { name: "Serif", value: "serif" },
    { name: "Mono", value: "mono" },
  ]

  const handleCustomColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value
    setCustomColor(color)
    setTheme({ primaryColor: color })
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Primary Color</h3>
        <div className="grid grid-cols-5 gap-2 mb-4">
          {colors.map((color) => (
            <button
              key={color.value}
              onClick={() => {
                setCustomColor(color.value)
                setTheme({ primaryColor: color.value })
              }}
              className={`w-full aspect-square rounded-lg border-2 transition-all ${
                theme.primaryColor === color.value ? "border-foreground scale-110" : "border-border"
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="color"
            value={customColor}
            onChange={handleCustomColor}
            className="w-12 h-10 rounded-lg border border-border cursor-pointer"
          />
          <input
            type="text"
            value={customColor}
            onChange={(e) => handleCustomColor({ target: { value: e.target.value } } as any)}
            className="flex-1 px-3 py-2 bg-muted border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-accent"
            placeholder="#000000"
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Font Family</h3>
        <div className="space-y-2">
          {fonts.map((font) => (
            <button
              key={font.value}
              onClick={() => setTheme({ fontFamily: font.value })}
              className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                theme.fontFamily === font.value
                  ? "bg-accent text-background border-accent"
                  : "bg-muted border-border text-foreground hover:border-accent"
              }`}
              style={{
                fontFamily: font.value === "serif" ? "serif" : font.value === "mono" ? "monospace" : "sans-serif",
              }}
            >
              {font.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Theme Presets</h3>
        <div className="space-y-2">
          {[
            { name: "Dark Mode", colors: { primaryColor: "#3b82f6", secondaryColor: "#1a1a1a" } },
            { name: "Light Mode", colors: { primaryColor: "#10b981", secondaryColor: "#ffffff" } },
            { name: "Vibrant", colors: { primaryColor: "#ec4899", secondaryColor: "#1a1a1a" } },
          ].map((preset) => (
            <button
              key={preset.name}
              onClick={() => setTheme(preset.colors)}
              className="w-full px-4 py-2 bg-muted hover:bg-border text-foreground rounded-lg transition-colors text-sm"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <h3 className="text-sm font-semibold text-foreground mb-2">Current Theme</h3>
        <div className="space-y-2 text-xs text-muted-foreground">
          <p>
            <strong>Primary Color:</strong>{" "}
            <span
              className="inline-block w-4 h-4 rounded border border-border ml-1 align-middle"
              style={{ backgroundColor: theme.primaryColor }}
            />
            {theme.primaryColor}
          </p>
          <p>
            <strong>Font:</strong> {theme.fontFamily}
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <h4 className="text-xs font-semibold text-foreground mb-3">Preview</h4>
        <div
          className="p-4 rounded-lg text-center space-y-2"
          style={{
            backgroundColor: `${theme.primaryColor}20`,
            borderColor: theme.primaryColor,
            borderWidth: "1px",
          }}
        >
          <p
            className="font-semibold"
            style={{
              color: theme.primaryColor,
              fontFamily:
                theme.fontFamily === "serif" ? "serif" : theme.fontFamily === "mono" ? "monospace" : "sans-serif",
            }}
          >
            Preview Text
          </p>
          <button
            className="w-full px-3 py-2 rounded text-white text-sm font-medium"
            style={{ backgroundColor: theme.primaryColor }}
          >
            Button
          </button>
        </div>
      </div>
    </div>
  )
}
