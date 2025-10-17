"use client"

import { useState } from "react"
import { useBuilderStore } from "@/lib/store"
import { Sparkles, Send, Loader } from "lucide-react"

interface AIMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

export function AIAssistantPanel() {
  const { blocks } = useBuilderStore()
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm your AI assistant. I can help you improve your landing page. What would you like to do?",
      timestamp: new Date().toISOString(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const assistantMessage: AIMessage = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: generateAIResponse(input),
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, assistantMessage])
    setIsLoading(false)
  }

  const generateAIResponse = (userInput: string): string => {
    const responses: Record<string, string> = {
      improve: `I can help improve your landing page! Here are some suggestions:
1. Add more compelling headlines
2. Include social proof (testimonials)
3. Improve call-to-action buttons
4. Add FAQ section for common questions
5. Optimize images for faster loading`,
      content: `I can generate content for you. What type of content would you like?
- Hero section headline
- Feature descriptions
- Testimonials
- Product descriptions
- Blog post content`,
      design: `For design improvements, consider:
1. Better color contrast for accessibility
2. Consistent spacing and alignment
3. Larger, more readable fonts
4. Better use of whitespace
5. Mobile-responsive design`,
      seo: `SEO recommendations:
1. Add descriptive meta tags
2. Use header tags (H1, H2, H3)
3. Add alt text to images
4. Improve page load speed
5. Create quality content`,
    }

    for (const [key, value] of Object.entries(responses)) {
      if (userInput.toLowerCase().includes(key)) {
        return value
      }
    }

    return `I can help with that! You currently have ${blocks.length} content blocks. Would you like me to suggest improvements or generate new content?`
  }

  return (
    <div className="flex flex-col h-full bg-secondary">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Sparkles size={18} className="text-accent" />
          AI Assistant
        </h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.role === "user"
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted border border-border text-foreground"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <p className="text-xs opacity-70 mt-1">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted border border-border text-foreground px-4 py-2 rounded-lg flex items-center gap-2">
              <Loader size={16} className="animate-spin" />
              <span className="text-sm">Thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Ask me anything..."
            className="flex-1 px-3 py-2 bg-muted border border-border rounded text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="px-3 py-2 bg-accent text-accent-foreground rounded hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
