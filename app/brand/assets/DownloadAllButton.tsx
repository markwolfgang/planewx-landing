"use client"

import JSZip from "jszip"
import { useState } from "react"

const LOGO_ASSETS = [
  { path: "/brand/planewx-og-wordmark.png",      filename: "planewx-wordmark-dark.png"  },
  { path: "/brand/planewx-wordmark-dark.svg",     filename: "planewx-wordmark-dark.svg"  },
  { path: "/brand/planewx-wordmark-light.png",    filename: "planewx-wordmark-light.png" },
  { path: "/brand/planewx-wordmark.svg",          filename: "planewx-wordmark-light.svg" },
  { path: "/brand/planewx-icon-dark.png",         filename: "planewx-icon-dark.png"      },
  { path: "/brand/planewx-icon.svg",              filename: "planewx-icon-dark.svg"      },
  { path: "/brand/planewx-icon-light.png",        filename: "planewx-icon-light.png"     },
  { path: "/brand/planewx-icon-light.svg",        filename: "planewx-icon-light.svg"     },
]

export default function DownloadAllButton() {
  const [loading, setLoading] = useState(false)

  async function handleDownloadAll() {
    setLoading(true)
    try {
      const zip = new JSZip()
      const folder = zip.folder("planewx-logos")!

      await Promise.all(
        LOGO_ASSETS.map(async ({ path, filename }) => {
          try {
            const res = await fetch(path)
            if (!res.ok) return
            const blob = await res.blob()
            folder.file(filename, blob)
          } catch {
            // skip missing assets gracefully
          }
        })
      )

      const content = await zip.generateAsync({ type: "blob" })
      const url = URL.createObjectURL(content)
      const a = document.createElement("a")
      a.href = url
      a.download = "planewx-logos.zip"
      a.click()
      URL.revokeObjectURL(url)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDownloadAll}
      disabled={loading}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-sky-500 text-white text-sm font-semibold hover:bg-sky-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {loading ? "Preparing…" : "↓ Download All Logos"}
    </button>
  )
}
