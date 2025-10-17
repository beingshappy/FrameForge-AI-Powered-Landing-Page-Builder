"use client"

import { useState } from "react"
import { useBuilderStore } from "@/lib/store"
import { Users, Share2, Copy, Trash2, Shield } from "lucide-react"

interface TeamMember {
  id: string
  email: string
  role: "owner" | "editor" | "viewer"
  joinedAt: string
}

export function CollaborationPanel() {
  const { projectMetadata, updateProjectMetadata } = useBuilderStore()
  const [newMemberEmail, setNewMemberEmail] = useState("")
  const [shareLink, setShareLink] = useState("")

  const teamMembers: TeamMember[] = projectMetadata.teamMembers || []

  const handleAddMember = () => {
    if (newMemberEmail) {
      const newMember: TeamMember = {
        id: Date.now().toString(),
        email: newMemberEmail,
        role: "editor",
        joinedAt: new Date().toISOString(),
      }
      updateProjectMetadata({
        teamMembers: [...teamMembers, newMember],
      })
      setNewMemberEmail("")
    }
  }

  const handleRemoveMember = (id: string) => {
    updateProjectMetadata({
      teamMembers: teamMembers.filter((m) => m.id !== id),
    })
  }

  const handleChangeRole = (id: string, newRole: TeamMember["role"]) => {
    updateProjectMetadata({
      teamMembers: teamMembers.map((m) => (m.id === id ? { ...m, role: newRole } : m)),
    })
  }

  const handleGenerateShareLink = () => {
    const link = `${window.location.origin}?project=${projectMetadata.id}&share=${Math.random().toString(36).substr(2, 9)}`
    setShareLink(link)
  }

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(shareLink)
  }

  return (
    <div className="flex flex-col h-full bg-secondary">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Users size={18} />
          Collaboration
        </h3>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Share Link */}
        <div className="p-4 bg-muted border border-border rounded-lg">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Share2 size={16} />
            Share Project
          </h4>
          {shareLink ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={shareLink}
                readOnly
                className="flex-1 px-3 py-2 bg-secondary border border-border rounded text-sm text-foreground"
              />
              <button
                onClick={handleCopyShareLink}
                className="px-3 py-2 bg-accent text-accent-foreground rounded hover:opacity-90 transition-opacity"
              >
                <Copy size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleGenerateShareLink}
              className="w-full px-3 py-2 bg-accent text-accent-foreground rounded hover:opacity-90 transition-opacity font-medium text-sm"
            >
              Generate Share Link
            </button>
          )}
        </div>

        {/* Add Team Member */}
        <div className="p-4 bg-muted border border-border rounded-lg">
          <h4 className="text-sm font-medium text-foreground mb-3">Invite Team Member</h4>
          <div className="flex gap-2">
            <input
              type="email"
              value={newMemberEmail}
              onChange={(e) => setNewMemberEmail(e.target.value)}
              placeholder="email@example.com"
              className="flex-1 px-3 py-2 bg-secondary border border-border rounded text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              onClick={handleAddMember}
              className="px-4 py-2 bg-accent text-accent-foreground rounded hover:opacity-90 transition-opacity font-medium text-sm"
            >
              Invite
            </button>
          </div>
        </div>

        {/* Team Members */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Team Members ({teamMembers.length})</h4>
          <div className="space-y-2">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-3 bg-muted border border-border rounded-lg"
              >
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">{member.email}</div>
                  <div className="text-xs text-muted-foreground">
                    Joined {new Date(member.joinedAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={member.role}
                    onChange={(e) => handleChangeRole(member.id, e.target.value as TeamMember["role"])}
                    className="px-2 py-1 bg-secondary border border-border rounded text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="viewer">Viewer</option>
                    <option value="editor">Editor</option>
                    <option value="owner">Owner</option>
                  </select>
                  <button
                    onClick={() => handleRemoveMember(member.id)}
                    className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Permissions Info */}
        <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <h4 className="text-sm font-medium text-blue-700 dark:text-blue-400 mb-2 flex items-center gap-2">
            <Shield size={16} />
            Role Permissions
          </h4>
          <ul className="space-y-1 text-xs text-blue-600 dark:text-blue-300">
            <li>
              • <strong>Owner:</strong> Full access, can manage team
            </li>
            <li>
              • <strong>Editor:</strong> Can edit content and design
            </li>
            <li>
              • <strong>Viewer:</strong> Read-only access
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
