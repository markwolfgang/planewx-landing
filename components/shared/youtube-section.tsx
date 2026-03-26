import { YouTubeFacade } from "./youtube-facade"

const VIDEO_ID = "qu7ppznhcGM"
const VIDEO_TITLE = "Pilots: Meet PlaneWX — The AI Tool That Scores Your Flight Risk"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function YouTubeSection({ variant: _variant }: { variant: string }) {
  return (
    <section className="relative py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <p className="text-white/50 text-sm uppercase tracking-widest font-medium mb-3">Don&apos;t take our word for it</p>
          <h2 className="text-2xl md:text-3xl font-bold">
            Hear what pilots are saying
          </h2>
        </div>
        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10" style={{ paddingBottom: "56.25%" }}>
          <YouTubeFacade videoId={VIDEO_ID} title={VIDEO_TITLE} />
        </div>
      </div>
    </section>
  )
}
