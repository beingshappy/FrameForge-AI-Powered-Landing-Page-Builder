import { create } from "zustand"

export interface LandingPageBlock {
  id: string
  type:
    | "hero"
    | "features"
    | "pricing"
    | "contact"
    | "testimonials"
    | "cta"
    | "gallery"
    | "faq"
    | "team"
    | "newsletter"
    | "stats"
    | "video"
    | "timeline"
    | "comparison"
    | "form"
  content: {
    title?: string
    description?: string
    cta?: string
    items?: Array<{
      title: string
      description: string
      price?: string
      image?: string
      author?: string
      role?: string
      question?: string
      answer?: string
      name?: string
      bio?: string
      id?: string
    }>
    image?: string
    fields?: Array<{
      id: string
      type: string
      label: string
      placeholder: string
      required: boolean
    }>
    members?: Array<{
      id: string
      name: string
      role: string
      image: string
      bio: string
    }>
    submitText?: string
    successMessage?: string
    notificationEmail?: string
    [key: string]: any
  }
}

export interface Theme {
  primaryColor: string
  secondaryColor: string
  fontFamily: string
  accentColor: string
}

export interface ProjectMetadata {
  id: string
  name: string
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  canonicalUrl?: string
  customDomain?: string
  publishedUrl?: string
  publishedAt?: string
  indexable?: boolean
  passwordProtected?: boolean
  teamMembers?: Array<{
    id: string
    email: string
    role: "owner" | "editor" | "viewer"
    joinedAt: string
  }>
}

interface BuilderStore {
  prompt: string
  setPrompt: (prompt: string) => void
  blocks: LandingPageBlock[]
  setBlocks: (blocks: LandingPageBlock[]) => void
  updateBlock: (id: string, content: Partial<LandingPageBlock["content"]>) => void
  deleteBlock: (id: string) => void
  addBlock: (type: LandingPageBlock["type"]) => void
  moveBlock: (id: string, direction: "up" | "down") => void
  theme: Theme
  setTheme: (theme: Partial<Theme>) => void
  isGenerating: boolean
  setIsGenerating: (generating: boolean) => void
  templates: string[]
  currentTemplate: string | null
  setCurrentTemplate: (template: string | null) => void
  history: LandingPageBlock[][]
  addToHistory: (blocks: LandingPageBlock[]) => void
  undo: () => void
  projectMetadata: ProjectMetadata
  updateProjectMetadata: (metadata: Partial<ProjectMetadata>) => void
}

export const useBuilderStore = create<BuilderStore>((set, get) => ({
  prompt: "",
  setPrompt: (prompt) => set({ prompt }),
  blocks: [],
  setBlocks: (blocks) => {
    set((state) => {
      get().addToHistory(blocks)
      return { blocks }
    })
  },
  updateBlock: (id, content) =>
    set((state) => ({
      blocks: state.blocks.map((block) =>
        block.id === id ? { ...block, content: { ...block.content, ...content } } : block,
      ),
    })),
  deleteBlock: (id) =>
    set((state) => ({
      blocks: state.blocks.filter((block) => block.id !== id),
    })),
  addBlock: (type) =>
    set((state) => {
      const newBlock: LandingPageBlock = {
        id: `${type}-${Date.now()}`,
        type,
        content: {
          title: `New ${type} section`,
          description: "Edit this content",
          ...(type === "features" && { items: [{ title: "Feature 1", description: "Description" }] }),
          ...(type === "pricing" && { items: [{ title: "Plan", price: "$99", description: "Description" }] }),
          ...(type === "testimonials" && {
            items: [{ title: "Great product!", description: "Amazing experience", author: "John Doe", role: "CEO" }],
          }),
          ...(type === "gallery" && { items: [{ title: "Image 1", image: "/art-gallery.png" }] }),
          ...(type === "faq" && { items: [{ question: "Your question?", answer: "Your answer here" }] }),
          ...(type === "team" && { members: [{ id: "1", name: "Team Member", role: "Position", image: "", bio: "" }] }),
          ...(type === "form" && { fields: [], submitText: "Submit", successMessage: "Thank you!" }),
        },
      }
      return { blocks: [...state.blocks, newBlock] }
    }),
  moveBlock: (id, direction) =>
    set((state) => {
      const index = state.blocks.findIndex((b) => b.id === id)
      if (index === -1) return state
      if (direction === "up" && index === 0) return state
      if (direction === "down" && index === state.blocks.length - 1) return state

      const newBlocks = [...state.blocks]
      const targetIndex = direction === "up" ? index - 1 : index + 1
      ;[newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]]
      return { blocks: newBlocks }
    }),
  theme: {
    primaryColor: "#10b981",
    secondaryColor: "#1a1a1a",
    fontFamily: "sans",
    accentColor: "#ffffff",
  },
  setTheme: (theme) =>
    set((state) => ({
      theme: { ...state.theme, ...theme },
    })),
  isGenerating: false,
  setIsGenerating: (generating) => set({ isGenerating: generating }),
  templates: ["SaaS", "E-commerce", "Agency", "Blog", "Portfolio"],
  currentTemplate: null,
  setCurrentTemplate: (template) => set({ currentTemplate: template }),
  history: [],
  addToHistory: (blocks) =>
    set((state) => ({
      history: [...state.history.slice(-9), blocks],
    })),
  undo: () =>
    set((state) => {
      if (state.history.length > 0) {
        const previousBlocks = state.history[state.history.length - 1]
        return {
          blocks: previousBlocks,
          history: state.history.slice(0, -1),
        }
      }
      return state
    }),
  projectMetadata: {
    id: `project-${Date.now()}`,
    name: "Untitled Project",
  },
  updateProjectMetadata: (metadata) =>
    set((state) => ({
      projectMetadata: { ...state.projectMetadata, ...metadata },
    })),
}))
