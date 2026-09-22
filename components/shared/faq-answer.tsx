import type { FaqAnswer } from "./landing-data"

const linkClassName =
  "text-sky-400 underline underline-offset-2 decoration-sky-400/50 hover:text-sky-300"

export function FaqAnswerBody({
  answer,
  className = "text-sm text-white/60 leading-relaxed",
}: {
  answer: FaqAnswer
  className?: string
}) {
  if (typeof answer === "string") {
    return <p className={className}>{answer}</p>
  }

  return (
    <div className="space-y-3">
      {answer.map((paragraph, i) => (
        <p key={i} className={className}>
          {paragraph.map((segment, j) =>
            typeof segment === "string" ? (
              <span key={j}>{segment}</span>
            ) : (
              <a
                key={j}
                href={segment.href}
                className={linkClassName}
                {...(segment.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {segment.label}
              </a>
            )
          )}
        </p>
      ))}
    </div>
  )
}
