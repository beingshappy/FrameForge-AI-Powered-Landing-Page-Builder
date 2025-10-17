"use client"

import { useBuilderStore } from "@/lib/store"
import { Trash2 } from "lucide-react"

interface TeamMember {
  id: string
  name: string
  role: string
  image: string
  bio: string
}

export function TeamBlock({ blockId }: { blockId: string }) {
  const { blocks, updateBlock } = useBuilderStore()
  const block = blocks.find((b) => b.id === blockId)

  if (!block || block.type !== "team") return null

  const members: TeamMember[] = block.content.members || [
    {
      id: "1",
      name: "John Doe",
      role: "CEO",
      image: "/professional-man.png",
      bio: "Visionary leader with 10+ years experience",
    },
    {
      id: "2",
      name: "Jane Smith",
      role: "CTO",
      image: "/professional-woman.png",
      bio: "Tech innovator and product strategist",
    },
    {
      id: "3",
      name: "Mike Johnson",
      role: "Head of Design",
      image: "/professional-designer.jpg",
      bio: "Creative director with award-winning portfolio",
    },
  ]

  const handleUpdateMember = (id: string, field: string, value: string) => {
    const updatedMembers = members.map((member) => (member.id === id ? { ...member, [field]: value } : member))
    updateBlock(blockId, { members: updatedMembers })
  }

  const handleDeleteMember = (id: string) => {
    updateBlock(blockId, { members: members.filter((m) => m.id !== id) })
  }

  return (
    <div className="w-full bg-card rounded-lg border border-border p-8 my-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-2">Our Team</h2>
        <p className="text-muted-foreground mb-12">Meet the talented people behind our success.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {members.map((member) => (
            <div key={member.id} className="group">
              <div className="relative mb-4 overflow-hidden rounded-lg bg-secondary aspect-square">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <input
                type="text"
                value={member.name}
                onChange={(e) => handleUpdateMember(member.id, "name", e.target.value)}
                className="w-full bg-transparent text-lg font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-accent rounded px-2 py-1"
                placeholder="Name"
              />
              <input
                type="text"
                value={member.role}
                onChange={(e) => handleUpdateMember(member.id, "role", e.target.value)}
                className="w-full bg-transparent text-sm text-accent focus:outline-none focus:ring-2 focus:ring-accent rounded px-2 py-1"
                placeholder="Role"
              />
              <textarea
                value={member.bio}
                onChange={(e) => handleUpdateMember(member.id, "bio", e.target.value)}
                className="w-full bg-transparent text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent rounded px-2 py-1 mt-2 resize-none"
                rows={2}
                placeholder="Bio"
              />
              <button
                onClick={() => handleDeleteMember(member.id)}
                className="mt-3 text-xs text-destructive hover:bg-destructive/10 px-2 py-1 rounded transition-colors flex items-center gap-1"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
