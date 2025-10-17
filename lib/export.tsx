import type { LandingPageBlock, Theme } from "./store"

export function generateJSX(blocks: LandingPageBlock[], theme: Theme): string {
  const blockComponents = blocks
    .map((block) => {
      const content = block.content
      switch (block.type) {
        case "hero":
          return `
      <section className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl w-full text-center space-y-6">
          <h1 className="text-6xl font-bold text-white">${content.title || "Welcome"}</h1>
          <p className="text-xl text-gray-300">${content.description || ""}</p>
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">${content.cta || "Get Started"}</button>
        </div>
      </section>`
        case "features":
          return `
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">${content.title || "Features"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            ${(content.items || [])
              .map(
                (item: any) => `
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">${item.title}</h3>
              <p className="text-gray-600">${item.description}</p>
            </div>`,
              )
              .join("")}
          </div>
        </div>
      </section>`
        case "pricing":
          return `
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">${content.title || "Pricing"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            ${(content.items || [])
              .map(
                (item: any) => `
            <div className="p-8 bg-white rounded-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold mb-2">${item.title}</h3>
              <p className="text-4xl font-bold text-blue-600 mb-6">${item.price}</p>
              <p className="text-gray-600 mb-6">${item.description}</p>
              <button className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Choose Plan</button>
            </div>`,
              )
              .join("")}
          </div>
        </div>
      </section>`
        case "testimonials":
          return `
      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">${content.title || "Testimonials"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            ${(content.items || [])
              .map(
                (item: any) => `
            <div className="p-6 bg-slate-800 rounded-lg border border-slate-700">
              <div className="flex gap-1 mb-3">
                ${[...Array(5)].map(() => '<span className="text-yellow-400">★</span>').join("")}
              </div>
              <p className="text-gray-300 italic mb-4">"${item.title}"</p>
              <p className="text-white font-semibold">${item.author}</p>
              <p className="text-gray-400 text-sm">${item.role}</p>
            </div>`,
              )
              .join("")}
          </div>
        </div>
      </section>`
        case "cta":
          return `
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold text-white">${content.title || "Ready to Get Started?"}</h2>
          <p className="text-xl text-blue-100">${content.description || ""}</p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">${content.cta || "Get Started"}</button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors">Learn More</button>
          </div>
        </div>
      </section>`
        case "gallery":
          return `
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">${content.title || "Gallery"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${(content.items || [])
              .map(
                (item: any) => `
            <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img src="${item.image || "/placeholder.svg"}" alt="${item.title}" className="w-full h-64 object-cover" />
              <div className="p-4 bg-gray-50">
                <h3 className="font-semibold text-gray-900">${item.title}</h3>
              </div>
            </div>`,
              )
              .join("")}
          </div>
        </div>
      </section>`
        case "contact":
          return `
      <section className="py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">${content.title || "Get In Touch"}</h2>
          <form className="space-y-6">
            <input type="text" placeholder="Your Name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
            <input type="email" placeholder="Your Email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
            <textarea placeholder="Your Message" rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"></textarea>
            <button type="submit" className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors">Send Message</button>
          </form>
        </div>
      </section>`
        default:
          return ""
      }
    })
    .join("")

  return `'use client'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      ${blockComponents}
    </div>
  )
}`
}

export function generateHTML(blocks: LandingPageBlock[], theme: Theme): string {
  const blockHTML = blocks
    .map((block) => {
      const content = block.content
      switch (block.type) {
        case "hero":
          return `
    <section style="min-height: 100vh; background: linear-gradient(to bottom right, #1e293b, #0f172a); display: flex; align-items: center; justify-content: center; padding: 80px 24px;">
      <div style="max-width: 56rem; width: 100%; text-align: center;">
        <h1 style="font-size: 48px; font-weight: bold; color: white; margin-bottom: 24px;">${content.title || "Welcome"}</h1>
        <p style="font-size: 20px; color: #d1d5db; margin-bottom: 32px;">${content.description || ""}</p>
        <button style="padding: 12px 32px; background-color: #2563eb; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 16px;">${content.cta || "Get Started"}</button>
      </div>
    </section>`
        case "features":
          return `
    <section style="padding: 80px 24px; background: white;">
      <div style="max-width: 72rem; margin: 0 auto;">
        <h2 style="font-size: 36px; font-weight: bold; text-align: center; margin-bottom: 48px;">${content.title || "Features"}</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px;">
          ${(content.items || [])
            .map(
              (item: any) => `
          <div style="padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 12px;">${item.title}</h3>
            <p style="color: #4b5563;">${item.description}</p>
          </div>`,
            )
            .join("")}
        </div>
      </div>
    </section>`
        case "pricing":
          return `
    <section style="padding: 80px 24px; background: #f9fafb;">
      <div style="max-width: 72rem; margin: 0 auto;">
        <h2 style="font-size: 36px; font-weight: bold; text-align: center; margin-bottom: 48px;">${content.title || "Pricing"}</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px;">
          ${(content.items || [])
            .map(
              (item: any) => `
          <div style="padding: 32px; background: white; border-radius: 8px; border: 1px solid #e5e7eb;">
            <h3 style="font-size: 24px; font-weight: bold; margin-bottom: 8px;">${item.title}</h3>
            <p style="font-size: 32px; font-weight: bold; color: #2563eb; margin-bottom: 24px;">${item.price}</p>
            <p style="color: #4b5563; margin-bottom: 24px;">${item.description}</p>
            <button style="width: 100%; padding: 8px 24px; background-color: #2563eb; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">Choose Plan</button>
          </div>`,
            )
            .join("")}
        </div>
      </div>
    </section>`
        case "testimonials":
          return `
    <section style="padding: 80px 24px; background: #1e293b;">
      <div style="max-width: 72rem; margin: 0 auto;">
        <h2 style="font-size: 36px; font-weight: bold; text-align: center; color: white; margin-bottom: 48px;">${content.title || "Testimonials"}</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px;">
          ${(content.items || [])
            .map(
              (item: any) => `
          <div style="padding: 24px; background: #0f172a; border-radius: 8px; border: 1px solid #334155;">
            <p style="color: #cbd5e1; font-style: italic; margin-bottom: 16px;">"${item.title}"</p>
            <p style="color: white; font-weight: 600;">${item.author}</p>
            <p style="color: #94a3b8; font-size: 14px;">${item.role}</p>
          </div>`,
            )
            .join("")}
        </div>
      </div>
    </section>`
        case "cta":
          return `
    <section style="padding: 80px 24px; background: linear-gradient(to right, #2563eb, #1d4ed8);">
      <div style="max-width: 42rem; margin: 0 auto; text-align: center;">
        <h2 style="font-size: 36px; font-weight: bold; color: white; margin-bottom: 24px;">${content.title || "Ready to Get Started?"}</h2>
        <p style="font-size: 18px; color: #dbeafe; margin-bottom: 32px;">${content.description || ""}</p>
        <div style="display: flex; gap: 16px; justify-content: center;">
          <button style="padding: 12px 32px; background-color: white; color: #2563eb; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">${content.cta || "Get Started"}</button>
          <button style="padding: 12px 32px; border: 2px solid white; background: transparent; color: white; border-radius: 8px; font-weight: 600; cursor: pointer;">Learn More</button>
        </div>
      </div>
    </section>`
        case "gallery":
          return `
    <section style="padding: 80px 24px; background: white;">
      <div style="max-width: 72rem; margin: 0 auto;">
        <h2 style="font-size: 36px; font-weight: bold; text-align: center; margin-bottom: 48px;">${content.title || "Gallery"}</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
          ${(content.items || [])
            .map(
              (item: any) => `
          <div style="border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <img src="${item.image || "/placeholder.svg"}" alt="${item.title}" style="width: 100%; height: 256px; object-fit: cover;" />
            <div style="padding: 16px; background: #f9fafb;">
              <h3 style="font-weight: 600; color: #111827;">${item.title}</h3>
            </div>
          </div>`,
            )
            .join("")}
        </div>
      </div>
    </section>`
        case "contact":
          return `
    <section style="padding: 80px 24px; background: white;">
      <div style="max-width: 42rem; margin: 0 auto;">
        <h2 style="font-size: 36px; font-weight: bold; text-align: center; margin-bottom: 48px;">${content.title || "Get In Touch"}</h2>
        <form style="display: flex; flex-direction: column; gap: 24px;">
          <input type="text" placeholder="Your Name" style="padding: 12px 16px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 16px;" />
          <input type="email" placeholder="Your Email" style="padding: 12px 16px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 16px;" />
          <textarea placeholder="Your Message" rows="5" style="padding: 12px 16px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 16px;"></textarea>
          <button type="submit" style="padding: 12px 24px; background-color: #2563eb; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 16px;">Send Message</button>
        </form>
      </div>
    </section>`
        default:
          return ""
      }
    })
    .join("")

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Landing Page</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; }
    button { transition: all 0.3s ease; }
    button:hover { opacity: 0.9; }
    input, textarea { font-family: inherit; }
  </style>
</head>
<body>
  ${blockHTML}
</body>
</html>`
}

export function generateJSON(blocks: LandingPageBlock[], theme: Theme): string {
  return JSON.stringify(
    {
      version: "1.0",
      theme,
      blocks,
      generatedAt: new Date().toISOString(),
      blockCount: blocks.length,
      blockTypes: [...new Set(blocks.map((b) => b.type))],
    },
    null,
    2,
  )
}

export function downloadFile(content: string, filename: string, type: string): void {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
