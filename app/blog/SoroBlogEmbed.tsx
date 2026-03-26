"use client"

import { useEffect } from "react"

export default function SoroBlogEmbed() {
  useEffect(() => {
    const existing = document.getElementById("soro-embed-script")
    if (existing) return

    const p = new URLSearchParams(window.location.search)
    let u = "https://app.trysoro.com/api/embed/732fc303-3b9b-4f2b-a629-ca12722565ce"
    if (p.get("post")) u += "?post=" + encodeURIComponent(p.get("post")!)

    const s = document.createElement("script")
    s.id = "soro-embed-script"
    s.src = u
    s.async = true

    const target = document.getElementById("soro-blog")
    if (target) target.after(s)
  }, [])

  return <div id="soro-blog" />
}
