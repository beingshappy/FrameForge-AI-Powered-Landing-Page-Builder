"use client"

import { useState } from "react"
import { useBuilderStore } from "@/lib/store"
import { Trash2, Plus, Copy } from "lucide-react"

interface FormField {
  id: string
  type: "text" | "email" | "phone" | "textarea" | "select" | "checkbox"
  label: string
  placeholder: string
  required: boolean
}

export function FormBuilderBlock({ blockId }: { blockId: string }) {
  const { blocks, updateBlock } = useBuilderStore()
  const block = blocks.find((b) => b.id === blockId)
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null)

  if (!block || block.type !== "form") return null

  const fields: FormField[] = block.content.fields || [
    { id: "1", type: "text", label: "Full Name", placeholder: "John Doe", required: true },
    { id: "2", type: "email", label: "Email", placeholder: "john@example.com", required: true },
    { id: "3", type: "textarea", label: "Message", placeholder: "Your message here...", required: false },
  ]

  const handleUpdateField = (id: string, updates: Partial<FormField>) => {
    const updatedFields = fields.map((field) => (field.id === id ? { ...field, ...updates } : field))
    updateBlock(blockId, { fields: updatedFields })
  }

  const handleDeleteField = (id: string) => {
    updateBlock(blockId, { fields: fields.filter((f) => f.id !== id) })
  }

  const handleAddField = () => {
    const newField: FormField = {
      id: Date.now().toString(),
      type: "text",
      label: "New Field",
      placeholder: "Enter value",
      required: false,
    }
    updateBlock(blockId, { fields: [...fields, newField] })
  }

  const handleDuplicateField = (id: string) => {
    const fieldToDuplicate = fields.find((f) => f.id === id)
    if (fieldToDuplicate) {
      const newField = { ...fieldToDuplicate, id: Date.now().toString() }
      updateBlock(blockId, { fields: [...fields, newField] })
    }
  }

  return (
    <div className="w-full bg-card rounded-lg border border-border p-8 my-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-2">Get in Touch</h2>
        <p className="text-muted-foreground mb-8">Fill out the form below and we'll get back to you soon.</p>

        <form className="space-y-6">
          {fields.map((field) => (
            <div key={field.id} className="group">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-foreground">
                  <input
                    type="text"
                    value={field.label}
                    onChange={(e) => handleUpdateField(field.id, { label: e.target.value })}
                    className="bg-transparent focus:outline-none focus:ring-2 focus:ring-accent rounded px-2 py-1"
                  />
                  {field.required && <span className="text-destructive ml-1">*</span>}
                </label>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() => handleDuplicateField(field.id)}
                    className="p-1 text-muted-foreground hover:text-accent transition-colors"
                  >
                    <Copy size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteField(field.id)}
                    className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="flex gap-2 mb-2">
                <select
                  value={field.type}
                  onChange={(e) => handleUpdateField(field.id, { type: e.target.value as FormField["type"] })}
                  className="px-3 py-2 bg-secondary border border-border rounded text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="text">Text</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="textarea">Textarea</option>
                  <option value="select">Select</option>
                  <option value="checkbox">Checkbox</option>
                </select>

                <label className="flex items-center gap-2 px-3 py-2 bg-secondary border border-border rounded text-sm cursor-pointer hover:bg-muted transition-colors">
                  <input
                    type="checkbox"
                    checked={field.required}
                    onChange={(e) => handleUpdateField(field.id, { required: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-foreground">Required</span>
                </label>
              </div>

              {field.type === "textarea" ? (
                <textarea
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                  rows={3}
                />
              ) : (
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              )}
            </div>
          ))}
        </form>

        <button
          onClick={handleAddField}
          className="mt-6 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity font-medium flex items-center gap-2"
        >
          <Plus size={16} />
          Add Field
        </button>

        <div className="mt-8 p-4 bg-secondary border border-border rounded-lg">
          <h3 className="font-semibold text-foreground mb-3">Form Settings</h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-muted-foreground">Submit Button Text</label>
              <input
                type="text"
                defaultValue={block.content.submitText || "Send Message"}
                onChange={(e) => updateBlock(blockId, { submitText: e.target.value })}
                className="w-full mt-1 px-3 py-2 bg-muted border border-border rounded text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Success Message</label>
              <input
                type="text"
                defaultValue={block.content.successMessage || "Thank you! We'll be in touch soon."}
                onChange={(e) => updateBlock(blockId, { successMessage: e.target.value })}
                className="w-full mt-1 px-3 py-2 bg-muted border border-border rounded text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Notification Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                defaultValue={block.content.notificationEmail || ""}
                onChange={(e) => updateBlock(blockId, { notificationEmail: e.target.value })}
                className="w-full mt-1 px-3 py-2 bg-muted border border-border rounded text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
