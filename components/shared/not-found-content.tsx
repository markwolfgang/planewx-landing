import { BrandLogo } from "./brand-logo"

export const NOT_FOUND_LINKS = [
  { href: "/", label: "Home", testId: "not-found-home" },
  { href: "https://app.planewx.ai/?view=dashboard", label: "My Trips", testId: "not-found-trips" },
  { href: "https://app.planewx.ai/help", label: "Help", testId: "not-found-help" },
] as const

/** Branded 404 body for planewx.ai. Replaces the bare Next.js default page. */
export function NotFoundContent() {
  return (
    <main
      data-testid="planewx-not-found"
      className="flex min-h-[70vh] items-center justify-center bg-[#0b0b0e] px-5 py-12 text-slate-100"
    >
      <div className="w-full max-w-sm text-center">
        <BrandLogo className="mx-auto h-8 w-auto" />
        <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-sky-400">404</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          This link is out of date or the page has moved.
        </p>
        <nav aria-label="Page not found" className="mt-8 flex flex-col gap-3">
          {NOT_FOUND_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              data-testid={link.testId}
              className={
                i === 0
                  ? "inline-flex min-h-11 items-center justify-center rounded-xl bg-sky-600 px-5 text-base font-semibold text-white transition-colors hover:bg-sky-500"
                  : "inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-700 px-5 text-base font-medium text-slate-100 transition-colors hover:bg-slate-800"
              }
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </main>
  )
}
