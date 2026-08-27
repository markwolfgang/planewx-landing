import Link from "next/link"
import { FIVE_X_FIVE_SEES_LINE } from "@/lib/five-x-five"

/** Public disclosure next to 5X5 mentions; links to Privacy Policy. */
export function FiveX5SeesNote({ className }: { className?: string }) {
  return (
    <p className={className}>
      <Link href="/privacy#insurance-partners" className="underline underline-offset-2 hover:text-sky-300">
        {FIVE_X_FIVE_SEES_LINE}
      </Link>
    </p>
  )
}
