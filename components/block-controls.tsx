"use client"

import { type LandingPageBlock, useBuilderStore } from "@/lib/store"
import { Trash2, ChevronUp, ChevronDown } from "lucide-react"

interface BlockControlsProps {
  block: LandingPageBlock
  index: number
  totalBlocks: number
}

export function BlockControls({ block, index, totalBlocks }: BlockControlsProps) {
  const { deleteBlock, moveBlock } = useBuilderStore()

  return (
    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 z-10">
      {index > 0 && (
        <button
          onClick={() => moveBlock(block.id, "up")}
          className="p-2 bg-secondary hover:bg-muted border border-border rounded-lg text-muted-foreground hover:text-foreground transition-colors"
          title="Move up"
        >
          <ChevronUp size={16} />
        </button>
      )}

      {index < totalBlocks - 1 && (
        <button
          onClick={() => moveBlock(block.id, "down")}
          className="p-2 bg-secondary hover:bg-muted border border-border rounded-lg text-muted-foreground hover:text-foreground transition-colors"
          title="Move down"
        >
          <ChevronDown size={16} />
        </button>
      )}

      <button
        onClick={() => deleteBlock(block.id)}
        className="p-2 bg-red-900/20 hover:bg-red-900/40 border border-red-700/50 rounded-lg text-red-400 hover:text-red-300 transition-colors"
        title="Delete block"
      >
        <Trash2 size={16} />
      </button>
    </div>
  )
}
