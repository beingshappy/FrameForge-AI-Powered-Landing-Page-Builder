"use client"

import type React from "react"

import { useState } from "react"
import { Monitor, Tablet, Smartphone } from "lucide-react"

type DeviceType = "desktop" | "tablet" | "mobile"

interface ResponsivePreviewProps {
  children: React.ReactNode
}

export function ResponsivePreview({ children }: ResponsivePreviewProps) {
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop")

  const getDeviceWidth = () => {
    switch (deviceType) {
      case "mobile":
        return "w-96"
      case "tablet":
        return "w-2xl"
      case "desktop":
        return "w-full"
    }
  }

  const getDeviceLabel = () => {
    switch (deviceType) {
      case "mobile":
        return "375px"
      case "tablet":
        return "768px"
      case "desktop":
        return "Full Width"
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Device Selector */}
      <div className="flex items-center justify-center gap-2 p-4 border-b border-border bg-secondary">
        <button
          onClick={() => setDeviceType("mobile")}
          className={`p-2 rounded-lg transition-colors ${
            deviceType === "mobile"
              ? "bg-accent text-accent-foreground"
              : "bg-muted text-muted-foreground hover:bg-border"
          }`}
          title="Mobile (375px)"
        >
          <Smartphone size={20} />
        </button>
        <button
          onClick={() => setDeviceType("tablet")}
          className={`p-2 rounded-lg transition-colors ${
            deviceType === "tablet"
              ? "bg-accent text-accent-foreground"
              : "bg-muted text-muted-foreground hover:bg-border"
          }`}
          title="Tablet (768px)"
        >
          <Tablet size={20} />
        </button>
        <button
          onClick={() => setDeviceType("desktop")}
          className={`p-2 rounded-lg transition-colors ${
            deviceType === "desktop"
              ? "bg-accent text-accent-foreground"
              : "bg-muted text-muted-foreground hover:bg-border"
          }`}
          title="Desktop (Full Width)"
        >
          <Monitor size={20} />
        </button>
        <div className="ml-4 text-sm text-muted-foreground font-medium">{getDeviceLabel()}</div>
      </div>

      {/* Preview Container */}
      <div className="flex-1 overflow-auto bg-background flex items-start justify-center p-4">
        <div
          className={`${getDeviceWidth()} transition-all duration-300 bg-white rounded-lg shadow-lg overflow-hidden`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
