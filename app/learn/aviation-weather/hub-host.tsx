"use client"

import { useEffect, useRef } from "react"
import { GLOSSARY_DATA } from "./glossary-data"

type TipTerm = {
  id: string
  term: string
  expansion: string
  definition: string
  source: string
  url: string
}

/**
 * Shared Aviation Weather hub host: glossary tooltips, Key Facts matchMedia /
 * viewport cap/fade, and raw-wrap scroll fade. Ports hub-source/glossary.js.
 */
export function HubHost({ html }: { html: string }) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const terms: Record<string, TipTerm> = {}
    for (const t of GLOSSARY_DATA) {
      terms[t.id] = {
        id: t.id,
        term: t.term,
        expansion: t.expansion || "",
        definition: t.definition,
        source: t.source_title || t.source_short || "",
        url: t.url || "",
      }
    }

    const tip = document.createElement("span")
    tip.className = "gl-tip"
    tip.id = "gl-tip"
    tip.setAttribute("role", "tooltip")
    tip.hidden = true

    let cur: HTMLAnchorElement | null = null
    let shownAt = 0
    let showT: ReturnType<typeof setTimeout> | null = null
    let hideT: ReturnType<typeof setTimeout> | null = null

    function el(tag: string, cls: string, text?: string) {
      const n = document.createElement(tag)
      n.className = cls
      if (text) n.textContent = text
      return n
    }

    function info(a: HTMLAnchorElement): TipTerm {
      const id = a.dataset.gl
      if (id && terms[id]) return terms[id]
      return {
        id: "",
        term: a.dataset.term || a.textContent || "",
        expansion: a.dataset.exp || "",
        definition: a.dataset.def || "",
        source: a.dataset.srcTitle || "",
        url: a.dataset.srcUrl || "",
      }
    }

    function fill(a: HTMLAnchorElement) {
      const t = info(a)
      tip.textContent = ""
      tip.appendChild(el("span", "gl-t", t.term))
      if (t.expansion && t.expansion !== t.term) {
        tip.appendChild(el("span", "gl-x", t.expansion))
      }
      tip.appendChild(el("span", "gl-d", t.definition))
      if (t.url) {
        const s = el("span", "gl-s", "Source: ")
        const l = document.createElement("a")
        l.href = t.url
        l.textContent = t.source
        l.target = "_blank"
        l.rel = "noopener"
        s.appendChild(l)
        tip.appendChild(s)
      }
    }

    function place(a: HTMLAnchorElement) {
      const r = a.getBoundingClientRect()
      const vw = document.documentElement.clientWidth
      const vh = window.innerHeight
      const w = tip.offsetWidth
      const h = tip.offsetHeight
      const left = Math.min(Math.max(8, r.left), vw - w - 8)
      let top = r.bottom + 6
      if (top + h > vh - 8 && r.top - h - 6 > 8) top = r.top - h - 6
      tip.style.left = left + "px"
      tip.style.top = top + "px"
    }

    function hide() {
      if (showT) clearTimeout(showT)
      if (hideT) clearTimeout(hideT)
      showT = null
      hideT = null
      if (!cur) return
      tip.hidden = true
      cur.setAttribute("aria-expanded", "false")
      cur.removeAttribute("aria-describedby")
      cur = null
    }

    function show(a: HTMLAnchorElement) {
      if (hideT) clearTimeout(hideT)
      hideT = null
      if (cur && cur !== a) hide()
      cur = a
      fill(a)
      a.insertAdjacentElement("afterend", tip)
      tip.hidden = false
      place(a)
      shownAt = Date.now()
      a.setAttribute("aria-expanded", "true")
      a.setAttribute("aria-describedby", "gl-tip")
    }

    function trig(n: EventTarget | null): HTMLAnchorElement | null {
      if (!(n instanceof Element)) return null
      return n.closest("a.gl")
    }

    root.querySelectorAll("a.gl").forEach((a) => {
      a.setAttribute("aria-expanded", "false")
    })

    const onMouseOver = (e: MouseEvent) => {
      const a = trig(e.target)
      if (a) {
        if (hideT) clearTimeout(hideT)
        hideT = null
        if (a !== cur) {
          if (showT) clearTimeout(showT)
          showT = setTimeout(() => show(a), 120)
        }
      } else if (tip.contains(e.target as Node)) {
        if (hideT) clearTimeout(hideT)
        hideT = null
      }
    }

    const onMouseOut = (e: MouseEvent) => {
      const from = trig(e.target) || (tip.contains(e.target as Node) ? tip : null)
      if (!from) return
      const to = e.relatedTarget as Node | null
      if (to && (tip.contains(to) || (cur && cur.contains(to)))) return
      if (showT) clearTimeout(showT)
      showT = null
      hideT = setTimeout(hide, 250)
    }

    const onFocusIn = (e: FocusEvent) => {
      const a = trig(e.target)
      if (a) show(a)
      else if (cur && !tip.contains(e.target as Node)) hide()
    }

    const onClick = (e: MouseEvent) => {
      const a = trig(e.target)
      if (a) {
        e.preventDefault()
        if (a === cur && !tip.hidden && Date.now() - shownAt > 600) hide()
        else show(a)
        return
      }
      if (cur && !tip.contains(e.target as Node)) hide()
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "Escape" || e.key === "Esc") && cur) {
        const a = cur
        hide()
        a.focus()
        e.stopPropagation()
      }
    }

    const onScroll = () => {
      if (cur) place(cur)
    }
    const onResize = () => {
      if (cur) place(cur)
    }

    root.addEventListener("mouseover", onMouseOver)
    root.addEventListener("mouseout", onMouseOut)
    root.addEventListener("focusin", onFocusIn)
    root.addEventListener("click", onClick)
    document.addEventListener("keydown", onKeyDown)
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)

    const kf = root.querySelector("#key-facts") as HTMLDetailsElement | null
    let mq: MediaQueryList | null = null
    let sync: (() => void) | null = null
    let kfRo: ResizeObserver | null = null
    const kfCap = () => {
      if (!kf) return
      const capped = kf.scrollHeight > kf.clientHeight + 2
      kf.classList.toggle("is-capped", capped)
      kf.classList.toggle(
        "at-end",
        capped && kf.scrollTop + kf.clientHeight >= kf.scrollHeight - 4
      )
    }
    if (kf && window.matchMedia) {
      mq = window.matchMedia("(min-width: 980px)")
      sync = () => {
        kf.open = mq!.matches
        kfCap()
      }
      sync()
      if (mq.addEventListener) mq.addEventListener("change", sync)
      kf.addEventListener("scroll", kfCap, { passive: true })
      kf.addEventListener("toggle", kfCap)
      window.addEventListener("resize", kfCap)
      window.addEventListener("load", kfCap)
      if (typeof ResizeObserver !== "undefined") {
        kfRo = new ResizeObserver(() => kfCap())
        kfRo.observe(kf)
      }
    }

    const rawCleanups: Array<() => void> = []
    root.querySelectorAll(".raw-wrap").forEach((wrap) => {
      const pre = wrap.querySelector("pre")
      if (!pre) return
      const upd = () => {
        wrap.classList.toggle(
          "at-end",
          pre.scrollLeft + pre.clientWidth >= pre.scrollWidth - 2
        )
      }
      pre.addEventListener("scroll", upd, { passive: true })
      window.addEventListener("resize", upd)
      upd()
      rawCleanups.push(() => {
        pre.removeEventListener("scroll", upd)
        window.removeEventListener("resize", upd)
      })
    })

    return () => {
      root.removeEventListener("mouseover", onMouseOver)
      root.removeEventListener("mouseout", onMouseOut)
      root.removeEventListener("focusin", onFocusIn)
      root.removeEventListener("click", onClick)
      document.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      if (mq && sync && mq.removeEventListener) mq.removeEventListener("change", sync)
      if (kfRo) kfRo.disconnect()
      if (kf) {
        kf.removeEventListener("scroll", kfCap)
        kf.removeEventListener("toggle", kfCap)
        window.removeEventListener("resize", kfCap)
        window.removeEventListener("load", kfCap)
      }
      rawCleanups.forEach((fn) => fn())
      if (showT) clearTimeout(showT)
      if (hideT) clearTimeout(hideT)
      tip.remove()
    }
  }, [html])

  return (
    <div className="aw-hub" ref={rootRef}>
      <main
        className="hub-main"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
