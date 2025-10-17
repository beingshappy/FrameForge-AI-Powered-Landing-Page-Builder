"use client"

import { useBuilderStore } from "@/lib/store"
import { HeroBlock } from "./blocks/hero-block"
import { FeaturesBlock } from "./blocks/features-block"
import { PricingBlock } from "./blocks/pricing-block"
import { ContactBlock } from "./blocks/contact-block"
import { TestimonialsBlock } from "./blocks/testimonials-block"
import { CTABlock } from "./blocks/cta-block"
import { GalleryBlock } from "./blocks/gallery-block"
import { BlockControls } from "./block-controls"

export function PreviewPanel() {
  const { blocks } = useBuilderStore()

  if (blocks.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-text-secondary text-lg">Generate a landing page to see preview</p>
          <p className="text-text-secondary text-sm mt-2">Enter a description and click Generate</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background relative">
      {blocks.map((block, index) => (
        <div key={block.id} className="relative group">
          <BlockControls block={block} index={index} totalBlocks={blocks.length} />

          {block.type === "hero" && <HeroBlock block={block} />}
          {block.type === "features" && <FeaturesBlock block={block} />}
          {block.type === "pricing" && <PricingBlock block={block} />}
          {block.type === "contact" && <ContactBlock block={block} />}
          {block.type === "testimonials" && <TestimonialsBlock block={block} />}
          {block.type === "cta" && <CTABlock block={block} />}
          {block.type === "gallery" && <GalleryBlock block={block} />}
        </div>
      ))}
    </div>
  )
}
