import { signals } from "../../constants/signals"
import SignalCard from "./signal-card"

export default function SignalSection() {
  return (
    <section
      className="
        relative
        z-10

        px-[6%]
        pb-32
      "
    >
      {/* heading */}
      <div
        className="
          mb-12
          flex
          items-end
          justify-between
          gap-8

          flex-wrap
        "
      >
        <div>
          <div
            className="
              mb-3

              text-[11px]
              uppercase
              tracking-[2px]

              text-cyan-300
            "
          >
            Developer Signals
          </div>

          <h2
            className="
              max-w-[720px]

              text-[clamp(34px,4vw,62px)]
              leading-[1]

              font-black

              text-white
            "
            style={{
              fontFamily:
                "var(--font-display)",
            }}
          >
            Your developer identity,
            <br />
            analyzed in real time.
          </h2>
        </div>

        <p
          className="
            max-w-[420px]

            text-[15px]
            leading-[1.7]

            text-zinc-400
          "
        >
          Portlix continuously analyzes your
          GitHub, portfolio, resume, and job-fit
          signals to maximize recruiter discovery.
        </p>
      </div>

      {/* cards */}
      <div
        className="
          grid
          gap-5

          md:grid-cols-2
          xl:grid-cols-4
        "
      >
        {signals.map((signal) => (
          <SignalCard
            key={signal.title}
            title={signal.title}
            value={signal.value}
            status={signal.status}
            glow={signal.glow as any}
          />
        ))}
      </div>
    </section>
  )
}