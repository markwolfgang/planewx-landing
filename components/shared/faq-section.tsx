"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { FAQS } from "./landing-data"
import { FiveX5SeesNote } from "./five-x-five-sees-note"

export function FaqSection({ variant }: { variant: string }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <section className="relative py-24 px-4 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold">Frequently asked questions</h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="rounded-xl border border-white/10 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="font-medium text-white/90 text-sm pr-4">{faq.q}</span>
                <ChevronDown
                  className={`h-5 w-5 text-white/40 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                />
              </button>
              {openFaq === i && (
                <div className="px-6 pb-5 space-y-2">
                  <p className="text-sm text-white/60 leading-relaxed">{faq.a}</p>
                  {faq.fiveX5SeesNote ? (
                    <FiveX5SeesNote className="text-sm text-white/45 leading-relaxed" />
                  ) : null}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
