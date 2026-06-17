"use client"

import Image from "next/image"

export function PartnerBadges() {
  return (
    <section className="relative py-8 px-4 border-b border-white/5 bg-white/[0.015]">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
          <p className="text-[10px] font-semibold text-white/25 uppercase tracking-widest whitespace-nowrap">
            Proud supporter of
          </p>
          <div className="flex items-center gap-8 sm:gap-12">
            <Image
              src="/logos/eaa-proud-supporter.png"
              alt="Proud Supporter of EAA AirVenture"
              width={112}
              height={112}
              className="w-24 h-24 sm:w-28 sm:h-28 opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
