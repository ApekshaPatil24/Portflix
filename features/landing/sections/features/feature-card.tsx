import FeatureIcon from "./feature-icon"

type Props = {
  title: string
  description: string
  tag: string
  icon: any
  variant: "cyan" | "pink" | "purple"
  large?: boolean
}

export default function FeatureCard({
  title,
  description,
  tag,
  icon,
  variant,
  large,
}: Props) {
  return (
    <div
      className={`
        feature-card

        ${
          variant === "cyan"
            ? "feature-cyan"
            : variant === "pink"
            ? "feature-pink"
            : "feature-purple"
        }

        rounded-[28px]
        p-5
        md:p-6

        ${large ? "md:col-span-2" : ""}
      `}
    >
      {/* GLOW */}
      <div
        className={`
          feature-glow

          ${
            variant === "cyan"
              ? "bg-cyan-400"
              : variant === "pink"
              ? "bg-pink-400"
              : "bg-violet-400"
          }

          ${
            large
              ? "-top-12 -right-12"
              : "-bottom-12 -left-12"
          }
        `}
      />

      <div className="relative z-10">
        <FeatureIcon
          icon={icon}
          variant={variant}
        />

        <h3
          className="
            text-[18px]
            font-black
            tracking-[-0.03em]
            text-white
            mb-3
          "
          style={{
            fontFamily: "var(--font-display)",
          }}
        >
          {title}
        </h3>

        <p
          className="
            text-[13px]
            leading-7
            text-white/55
            max-w-[95%]
          "
        >
          {description}
        </p>

        <div
          className={`
            inline-flex
            items-center
            mt-3
            px-3
            py-1.5
            rounded-full

            text-[10px]
            uppercase
            tracking-[0.08em]
            font-bold

            ${
              variant === "cyan"
                ? "bg-cyan-400/10 text-cyan-300 border border-cyan-400/15"
                : variant === "pink"
                ? "bg-pink-400/10 text-pink-300 border border-pink-400/15"
                : "bg-violet-400/10 text-violet-300 border border-violet-400/15"
            }
          `}
        >
          {tag}
        </div>

        {/* TERMINAL */}
        {large && (
          <div className="ai-terminal">
            <div className="t-line">
              <span className="t-prompt">$</span>

              <span className="t-cmd">
                portlix generate --github alexkumar
              </span>
            </div>

            <div className="t-line">
              <span className="t-out">
                ✓ Fetched 847 commits across 23 repos
              </span>
            </div>

            <div className="t-line">
              <span className="t-out">
                ✓ Detected skills: Go, Rust, Next.js, TypeScript
              </span>
            </div>

            <div className="t-line">
              <span className="t-out">
                ✓ AI story generated in 3.2s
                <span className="t-cursor"></span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}