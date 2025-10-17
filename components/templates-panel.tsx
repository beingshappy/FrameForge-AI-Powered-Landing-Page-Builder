"use client"

import { useBuilderStore } from "@/lib/store"
import type { LandingPageBlock } from "@/lib/store"

export function TemplatesPanel() {
  const { setBlocks, setTheme } = useBuilderStore()

  const templates: Record<string, { blocks: LandingPageBlock[]; theme: any }> = {
    saas: {
      blocks: [
        {
          id: "hero-1",
          type: "hero",
          content: {
            title: "Modern SaaS Platform",
            description: "Build, deploy, and scale your applications with ease",
            cta: "Start Free Trial",
          },
        },
        {
          id: "features-1",
          type: "features",
          content: {
            title: "Powerful Features",
            items: [
              { title: "Real-time Collaboration", description: "Work together seamlessly" },
              { title: "Advanced Analytics", description: "Deep insights into your data" },
              { title: "Enterprise Security", description: "Bank-level security standards" },
            ],
          },
        },
        {
          id: "pricing-1",
          type: "pricing",
          content: {
            title: "Simple, Transparent Pricing",
            items: [
              { title: "Starter", price: "$29/mo", description: "Perfect for individuals" },
              { title: "Professional", price: "$99/mo", description: "For growing teams" },
              { title: "Enterprise", price: "Custom", description: "For large organizations" },
            ],
          },
        },
      ],
      theme: { primaryColor: "#3b82f6", fontFamily: "sans" },
    },
    ecommerce: {
      blocks: [
        {
          id: "hero-1",
          type: "hero",
          content: {
            title: "Shop the Latest Collection",
            description: "Discover premium products curated just for you",
            cta: "Shop Now",
          },
        },
        {
          id: "features-1",
          type: "features",
          content: {
            title: "Why Choose Us",
            items: [
              { title: "Free Shipping", description: "On orders over $50" },
              { title: "Easy Returns", description: "30-day return policy" },
              { title: "24/7 Support", description: "Always here to help" },
            ],
          },
        },
        {
          id: "testimonials-1",
          type: "testimonials",
          content: {
            title: "Customer Reviews",
            items: [
              {
                title: "Amazing quality and fast shipping!",
                author: "Sarah Johnson",
                role: "Verified Buyer",
              },
              {
                title: "Best customer service ever",
                author: "Mike Chen",
                role: "Verified Buyer",
              },
              {
                title: "Highly recommend!",
                author: "Emma Davis",
                role: "Verified Buyer",
              },
            ],
          },
        },
      ],
      theme: { primaryColor: "#ec4899", fontFamily: "sans" },
    },
    agency: {
      blocks: [
        {
          id: "hero-1",
          type: "hero",
          content: {
            title: "Creative Agency",
            description: "We bring your ideas to life with stunning design and strategy",
            cta: "View Our Work",
          },
        },
        {
          id: "gallery-1",
          type: "gallery",
          content: {
            title: "Recent Projects",
            items: [
              { title: "Project 1", image: "/project-management-team.png" },
              { title: "Project 2", image: "/project-management-team.png" },
              { title: "Project 3", image: "/project-management-team.png" },
            ],
          },
        },
        {
          id: "cta-1",
          type: "cta",
          content: {
            title: "Ready to Start Your Project?",
            description: "Let's create something amazing together",
            cta: "Get In Touch",
          },
        },
      ],
      theme: { primaryColor: "#a855f7", fontFamily: "serif" },
    },
  }

  const handleSelectTemplate = (templateKey: string) => {
    const template = templates[templateKey]
    if (template) {
      setBlocks(template.blocks)
      setTheme(template.theme)
    }
  }

  return (
    <div className="p-6 space-y-4">
      <h3 className="text-sm font-semibold text-foreground">Choose a Template</h3>

      <div className="space-y-3">
        {Object.entries(templates).map(([key, template]) => (
          <button
            key={key}
            onClick={() => handleSelectTemplate(key)}
            className="w-full p-4 bg-muted hover:bg-border rounded-lg border border-border transition-colors text-left"
          >
            <p className="font-medium text-foreground capitalize">{key}</p>
            <p className="text-xs text-muted-foreground mt-1">{template.blocks.length} sections</p>
          </button>
        ))}
      </div>
    </div>
  )
}
