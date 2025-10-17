export interface PageAnalytics {
  blockCount: number
  blockTypes: string[]
  themeColor: string
  fontFamily: string
  generatedAt: string
  exportCount: number
  editCount: number
}

export function trackPageGeneration(blockCount: number, blockTypes: string[]) {
  if (typeof window !== "undefined") {
    const event = {
      type: "page_generated",
      blockCount,
      blockTypes,
      timestamp: new Date().toISOString(),
    }
    console.log("[Analytics]", event)
  }
}

export function trackExport(format: "jsx" | "html" | "json") {
  if (typeof window !== "undefined") {
    const event = {
      type: "export",
      format,
      timestamp: new Date().toISOString(),
    }
    console.log("[Analytics]", event)
  }
}

export function trackBlockEdit(blockType: string) {
  if (typeof window !== "undefined") {
    const event = {
      type: "block_edited",
      blockType,
      timestamp: new Date().toISOString(),
    }
    console.log("[Analytics]", event)
  }
}
