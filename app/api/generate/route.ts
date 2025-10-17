import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    if (!prompt || typeof prompt !== "string") {
      return Response.json({ error: "Invalid prompt" }, { status: 400 })
    }

    const systemPrompt = `You are an expert landing page designer. Generate a JSON array of landing page blocks based on the user's description.

Each block should have:
- id: unique identifier (e.g., "hero-1", "features-2")
- type: one of 'hero', 'features', 'pricing', 'contact', 'testimonials', 'cta'
- content: object with relevant fields

Return ONLY valid JSON, no markdown or extra text.

Example:
[
  {
    "id": "hero-1",
    "type": "hero",
    "content": {
      "title": "Welcome to Our Product",
      "description": "The best solution for your needs",
      "cta": "Get Started",
      "image": "https://placeholder.svg?height=400&width=600&query=hero"
    }
  },
  {
    "id": "features-1",
    "type": "features",
    "content": {
      "title": "Key Features",
      "items": [
        { "title": "Fast", "description": "Lightning quick performance" },
        { "title": "Secure", "description": "Enterprise-grade security" },
        { "title": "Scalable", "description": "Grows with your business" }
      ]
    }
  }
]`

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      system: systemPrompt,
      prompt: `Create a landing page for: ${prompt}`,
      temperature: 0.7,
      maxTokens: 2000,
    })

    // Parse and validate JSON
    const blocks = JSON.parse(text)

    if (!Array.isArray(blocks)) {
      throw new Error("Response is not an array")
    }

    return Response.json({ blocks })
  } catch (error) {
    console.error("[v0] AI generation error:", error)
    return Response.json({ error: "Failed to generate landing page. Please try again." }, { status: 500 })
  }
}
