import { LearnChrome } from "./learn-chrome"

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <LearnChrome>{children}</LearnChrome>
}
