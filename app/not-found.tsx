import type { Metadata } from "next"
import { NotFoundContent } from "@/components/shared/not-found-content"

export const metadata: Metadata = {
  title: "Page not found - PlaneWX",
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return <NotFoundContent />
}
