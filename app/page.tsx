"use client"

import { useState } from "react"
import { PromptInput } from "@/components/prompt-input"
import { PreviewPanel } from "@/components/preview-panel"
import { ThemePanel } from "@/components/theme-panel"
import { ExportPanel } from "@/components/export-panel"
import { TemplatesPanel } from "@/components/templates-panel"
import { SettingsPanel } from "@/components/settings-panel"
import { AnalyticsPanel } from "@/components/analytics-panel"
import { BlockLibrary } from "@/components/block-library"
import { SEOPanel } from "@/components/seo-panel"
import { PerformancePanel } from "@/components/performance-panel"
import { CollaborationPanel } from "@/components/collaboration-panel"
import { VersionHistoryPanel } from "@/components/version-history-panel"
import { PublishingPanel } from "@/components/publishing-panel"
import { AIAssistantPanel } from "@/components/ai-assistant-panel"
import { Settings, BarChart3, Zap, Users, Clock, Globe, Sparkles, Blocks } from "lucide-react"

export default function Home() {
  const [showTheme, setShowTheme] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showBlockLibrary, setShowBlockLibrary] = useState(false)
  const [showSEO, setShowSEO] = useState(false)
  const [showPerformance, setShowPerformance] = useState(false)
  const [showCollaboration, setShowCollaboration] = useState(false)
  const [showVersionHistory, setShowVersionHistory] = useState(false)
  const [showPublishing, setShowPublishing] = useState(false)
  const [showAI, setShowAI] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar - Controls */}
      <div className="w-96 border-r border-border flex flex-col bg-secondary">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <h1 className="text-2xl font-bold text-foreground">FrameForge</h1>
          <p className="text-sm text-muted-foreground mt-1">AI-powered landing page builder</p>
        </div>

        {/* Prompt Input */}
        <div className="flex-1 overflow-y-auto p-6">
          <PromptInput />
        </div>

        {/* Bottom Controls */}
        <div className="p-6 border-t border-border space-y-2 max-h-96 overflow-y-auto">
          <button
            onClick={() => setShowBlockLibrary(!showBlockLibrary)}
            className="w-full px-4 py-2 bg-muted hover:bg-border text-foreground rounded-lg transition-colors text-sm font-medium flex items-center gap-2"
          >
            <Blocks size={16} />
            {showBlockLibrary ? "Hide" : "Show"} Blocks
          </button>
          <button
            onClick={() => setShowTemplates(!showTemplates)}
            className="w-full px-4 py-2 bg-muted hover:bg-border text-foreground rounded-lg transition-colors text-sm font-medium"
          >
            {showTemplates ? "Hide" : "Show"} Templates
          </button>
          <button
            onClick={() => setShowTheme(!showTheme)}
            className="w-full px-4 py-2 bg-muted hover:bg-border text-foreground rounded-lg transition-colors text-sm font-medium"
          >
            {showTheme ? "Hide" : "Show"} Theme
          </button>
          <button
            onClick={() => setShowSEO(!showSEO)}
            className="w-full px-4 py-2 bg-muted hover:bg-border text-foreground rounded-lg transition-colors text-sm font-medium"
          >
            {showSEO ? "Hide" : "Show"} SEO
          </button>
          <button
            onClick={() => setShowExport(!showExport)}
            className="w-full px-4 py-2 bg-accent hover:bg-accent-hover text-background rounded-lg transition-colors text-sm font-medium"
          >
            Export
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="h-16 border-b border-border bg-secondary flex items-center justify-between px-6">
          <h2 className="text-lg font-semibold text-foreground">Live Preview</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAI(!showAI)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              title="AI Assistant"
            >
              <Sparkles size={20} className="text-muted-foreground" />
            </button>
            <button
              onClick={() => setShowPerformance(!showPerformance)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              title="Performance"
            >
              <Zap size={20} className="text-muted-foreground" />
            </button>
            <button
              onClick={() => setShowAnalytics(!showAnalytics)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              title="Analytics"
            >
              <BarChart3 size={20} className="text-muted-foreground" />
            </button>
            <button
              onClick={() => setShowCollaboration(!showCollaboration)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              title="Collaboration"
            >
              <Users size={20} className="text-muted-foreground" />
            </button>
            <button
              onClick={() => setShowVersionHistory(!showVersionHistory)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              title="Version History"
            >
              <Clock size={20} className="text-muted-foreground" />
            </button>
            <button
              onClick={() => setShowPublishing(!showPublishing)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              title="Publishing"
            >
              <Globe size={20} className="text-muted-foreground" />
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              title="Settings"
            >
              <Settings size={20} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Preview and Panels */}
        <div className="flex-1 overflow-hidden flex">
          <div className="flex-1 overflow-auto">
            <PreviewPanel />
          </div>

          {/* Right Sidebars */}
          {showBlockLibrary && (
            <div className="w-80 border-l border-border bg-secondary overflow-y-auto">
              <BlockLibrary />
            </div>
          )}

          {showTemplates && (
            <div className="w-80 border-l border-border bg-secondary overflow-y-auto">
              <TemplatesPanel />
            </div>
          )}

          {showTheme && (
            <div className="w-80 border-l border-border bg-secondary overflow-y-auto">
              <ThemePanel />
            </div>
          )}

          {showSEO && (
            <div className="w-80 border-l border-border bg-secondary overflow-y-auto">
              <SEOPanel />
            </div>
          )}

          {showExport && (
            <div className="w-80 border-l border-border bg-secondary overflow-y-auto">
              <ExportPanel />
            </div>
          )}

          {showAnalytics && (
            <div className="w-80 border-l border-border bg-secondary overflow-y-auto">
              <AnalyticsPanel />
            </div>
          )}

          {showPerformance && (
            <div className="w-80 border-l border-border bg-secondary overflow-y-auto">
              <PerformancePanel />
            </div>
          )}

          {showCollaboration && (
            <div className="w-80 border-l border-border bg-secondary overflow-y-auto">
              <CollaborationPanel />
            </div>
          )}

          {showVersionHistory && (
            <div className="w-80 border-l border-border bg-secondary overflow-y-auto">
              <VersionHistoryPanel />
            </div>
          )}

          {showPublishing && (
            <div className="w-80 border-l border-border bg-secondary overflow-y-auto">
              <PublishingPanel />
            </div>
          )}

          {showAI && (
            <div className="w-80 border-l border-border bg-secondary overflow-y-auto">
              <AIAssistantPanel />
            </div>
          )}

          {showSettings && (
            <div className="w-80 border-l border-border bg-secondary overflow-y-auto">
              <SettingsPanel />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
