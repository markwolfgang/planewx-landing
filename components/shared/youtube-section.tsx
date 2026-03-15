"use client"

export function YouTubeSection({ variant }: { variant: string }) {
  return (
    <section className="relative py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <p className="text-white/50 text-sm uppercase tracking-widest font-medium mb-3">Don't take our word for it</p>
          <h2 className="text-2xl md:text-3xl font-bold">
            Hear what pilots are saying
          </h2>
        </div>
        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/qu7ppznhcGM?si=MnoooX_Fu66IxwRg"
            title="Pilots: Meet PlaneWX — The AI Tool That Scores Your Flight Risk"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}
