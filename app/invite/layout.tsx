import type { Metadata } from "next"

export const metadata: Metadata = {
  // Token invite funnel: reachable for invited pilots, not for search indexes.
  robots: { index: false, follow: true },
}

export default function InviteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
