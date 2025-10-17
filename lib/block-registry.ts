// Advanced block registry with metadata and categorization
export interface BlockMetadata {
  id: string
  name: string
  category: "layout" | "content" | "form" | "media" | "social" | "ecommerce"
  icon: string
  description: string
  thumbnail?: string
  isNew?: boolean
  isPremium?: boolean
}

export const BLOCK_REGISTRY: Record<string, BlockMetadata> = {
  hero: {
    id: "hero",
    name: "Hero Section",
    category: "layout",
    icon: "Zap",
    description: "Eye-catching hero section with headline and CTA",
  },
  features: {
    id: "features",
    name: "Features Grid",
    category: "content",
    icon: "Grid3x3",
    description: "Showcase features in a responsive grid",
  },
  pricing: {
    id: "pricing",
    name: "Pricing Table",
    category: "ecommerce",
    icon: "DollarSign",
    description: "Pricing plans with comparison",
  },
  contact: {
    id: "contact",
    name: "Contact Form",
    category: "form",
    icon: "Mail",
    description: "Contact form with validation",
  },
  testimonials: {
    id: "testimonials",
    name: "Testimonials",
    category: "content",
    icon: "MessageSquare",
    description: "Customer testimonials carousel",
  },
  gallery: {
    id: "gallery",
    name: "Image Gallery",
    category: "media",
    icon: "Images",
    description: "Responsive image gallery with lightbox",
  },
  cta: {
    id: "cta",
    name: "Call to Action",
    category: "layout",
    icon: "Zap",
    description: "Prominent CTA section",
  },
  faq: {
    id: "faq",
    name: "FAQ Accordion",
    category: "content",
    icon: "HelpCircle",
    description: "Frequently asked questions",
    isNew: true,
  },
  team: {
    id: "team",
    name: "Team Members",
    category: "content",
    icon: "Users",
    description: "Team member showcase",
    isNew: true,
  },
  newsletter: {
    id: "newsletter",
    name: "Newsletter Signup",
    category: "form",
    icon: "Mail",
    description: "Email subscription form",
    isNew: true,
  },
  stats: {
    id: "stats",
    name: "Statistics",
    category: "content",
    icon: "BarChart3",
    description: "Display key metrics and statistics",
    isNew: true,
  },
  video: {
    id: "video",
    name: "Video Section",
    category: "media",
    icon: "Play",
    description: "Embedded video with controls",
    isNew: true,
  },
  timeline: {
    id: "timeline",
    name: "Timeline",
    category: "content",
    icon: "Clock",
    description: "Timeline or process steps",
    isPremium: true,
  },
  comparison: {
    id: "comparison",
    name: "Comparison Table",
    category: "content",
    icon: "Columns3",
    description: "Side-by-side comparison",
    isPremium: true,
  },
}

export function getBlocksByCategory(category: BlockMetadata["category"]) {
  return Object.values(BLOCK_REGISTRY).filter((block) => block.category === category)
}

export function getAllCategories() {
  return Array.from(new Set(Object.values(BLOCK_REGISTRY).map((b) => b.category)))
}
