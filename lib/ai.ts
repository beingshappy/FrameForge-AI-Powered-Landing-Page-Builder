import type { LandingPageBlock } from "./store"

export async function generateLandingPage(prompt: string): Promise<LandingPageBlock[]> {
  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to generate landing page")
    }

    const { blocks } = await response.json()
    return blocks as LandingPageBlock[]
  } catch (error) {
    console.error("[v0] AI generation error:", error)
    throw error instanceof Error ? error : new Error("Failed to generate landing page")
  }
}
