"use client"

import { useState } from "react"
import { BLOCK_REGISTRY, getAllCategories } from "@/lib/block-registry"
import { useBuilderStore } from "@/lib/store"
import { Search, Plus, Star } from "lucide-react"

export function BlockLibrary() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const { addBlock } = useBuilderStore()

  const categories = getAllCategories()
  const filteredBlocks = Object.values(BLOCK_REGISTRY).filter((block) => {
    const matchesSearch =
      block.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      block.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || block.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddBlock = (blockId: string) => {
    addBlock(blockId as any)
  }

  return (
    <div className="flex flex-col h-full bg-secondary">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-foreground mb-3">Block Library</h3>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-3 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search blocks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-muted border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 py-3 border-b border-border overflow-x-auto">
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === null
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-muted-foreground hover:bg-border"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-colors capitalize ${
                selectedCategory === category
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground hover:bg-border"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Blocks Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 gap-3">
          {filteredBlocks.map((block) => (
            <div
              key={block.id}
              className="p-3 bg-muted border border-border rounded-lg hover:border-accent hover:bg-card transition-all cursor-pointer group"
              onClick={() => handleAddBlock(block.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground text-sm">{block.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{block.description}</p>
                </div>
                <Plus size={16} className="text-muted-foreground group-hover:text-accent transition-colors" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 bg-secondary rounded capitalize text-muted-foreground">
                  {block.category}
                </span>
                {block.isNew && (
                  <span className="text-xs px-2 py-1 bg-accent/20 text-accent rounded font-medium">New</span>
                )}
                {block.isPremium && <Star size={12} className="text-yellow-500 fill-yellow-500" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
