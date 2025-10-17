"use client"

import { useState } from "react"
import { useBuilderStore } from "@/lib/store"
import { ChevronDown, Trash2 } from "lucide-react"

interface FAQItem {
  id: string
  question: string
  answer: string
}

export function FAQBlock({ blockId }: { blockId: string }) {
  const { blocks, updateBlock, deleteBlock } = useBuilderStore()
  const block = blocks.find((b) => b.id === blockId)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  if (!block || block.type !== "faq") return null

  const faqItems: FAQItem[] = block.content.items || [
    { id: "1", question: "What is this product?", answer: "This is a great product that solves your problems." },
    { id: "2", question: "How do I get started?", answer: "Simply sign up and follow the onboarding guide." },
    { id: "3", question: "What is the pricing?", answer: "We offer flexible pricing plans for all budgets." },
  ]

  const handleUpdateItem = (id: string, field: "question" | "answer", value: string) => {
    const updatedItems = faqItems.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    updateBlock(blockId, { items: updatedItems })
  }

  const handleAddItem = () => {
    const newItem: FAQItem = {
      id: Date.now().toString(),
      question: "New question?",
      answer: "Add your answer here.",
    }
    updateBlock(blockId, { items: [...faqItems, newItem] })
  }

  const handleDeleteItem = (id: string) => {
    updateBlock(blockId, { items: faqItems.filter((item) => item.id !== id) })
  }

  return (
    <div className="w-full bg-card rounded-lg border border-border p-8 my-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-2">Frequently Asked Questions</h2>
        <p className="text-muted-foreground mb-8">Find answers to common questions about our service.</p>

        <div className="space-y-4">
          {faqItems.map((item) => (
            <div
              key={item.id}
              className="border border-border rounded-lg overflow-hidden group hover:border-accent transition-colors"
            >
              <button
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                className="w-full px-6 py-4 flex items-center justify-between bg-secondary hover:bg-muted transition-colors"
              >
                <input
                  type="text"
                  value={item.question}
                  onChange={(e) => handleUpdateItem(item.id, "question", e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 bg-transparent text-foreground font-medium focus:outline-none"
                  placeholder="Question"
                />
                <ChevronDown
                  size={20}
                  className={`text-muted-foreground transition-transform ${expandedId === item.id ? "rotate-180" : ""}`}
                />
              </button>

              {expandedId === item.id && (
                <div className="px-6 py-4 bg-background border-t border-border">
                  <textarea
                    value={item.answer}
                    onChange={(e) => handleUpdateItem(item.id, "answer", e.target.value)}
                    className="w-full bg-secondary border border-border rounded p-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    rows={3}
                    placeholder="Answer"
                  />
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="mt-3 px-3 py-1 text-sm text-destructive hover:bg-destructive/10 rounded transition-colors flex items-center gap-2"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleAddItem}
          className="mt-6 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
        >
          Add Question
        </button>
      </div>
    </div>
  )
}
