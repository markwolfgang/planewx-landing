/**
 * Small plan tag (e.g. "Pro Plus") shown next to a feature title.
 * Styling matches the news category pill. Use <PlanBadge /> in JSX, or
 * planBadgeHtml() inside HTML-string bodies such as news-data.ts.
 */
export const PLAN_BADGE_CLASS =
  "not-prose ml-2 inline-block rounded-full bg-sky-500/15 px-2 py-0.5 align-middle text-[0.7rem] font-medium uppercase tracking-wide text-sky-300"

export function planBadgeHtml(plan = "Pro Plus"): string {
  return `<span class="${PLAN_BADGE_CLASS}" data-plan-badge>${plan}</span>`
}

export function PlanBadge({ plan = "Pro Plus" }: { plan?: string }) {
  return (
    <span className={PLAN_BADGE_CLASS} data-plan-badge>
      {plan}
    </span>
  )
}

/** "Labs" tag for features still being tested. Visually distinct from the plan badge. */
export const LABS_BADGE_CLASS =
  "not-prose ml-2 inline-block rounded-full border border-amber-400/40 bg-amber-500/10 px-2 py-0.5 align-middle text-[0.7rem] font-medium uppercase tracking-wide text-amber-300"

export function labsBadgeHtml(label = "Labs"): string {
  return `<span class="${LABS_BADGE_CLASS}" data-labs-badge>${label}</span>`
}

export function LabsBadge({ label = "Labs" }: { label?: string }) {
  return (
    <span className={LABS_BADGE_CLASS} data-labs-badge>
      {label}
    </span>
  )
}
