import { RECRUITER_METRICS } from "../../constants/recruiter"
import RecruiterMetrics from "./recruiter-metrics"

export default function RecruiterCard() {
  return (
    <div
      className="
        relative

        overflow-hidden

        rounded-[30px]

        border
        border-white/[0.07]

        bg-white/[0.03]

        p-7

        shadow-[0_40px_80px_rgba(0,0,0,0.55)]

        backdrop-blur-xl

        transition-all
        duration-500

        hover:-translate-y-1
      "
    >
      {/* GLOW */}
      <div
        className="
          absolute
          -top-16
          -right-16

          h-44
          w-44

          rounded-full

          bg-violet-500/20

          blur-[90px]
        "
      />

      {/* HEADER */}
      <div
        className="
          relative
          z-10

          flex
          items-center
          justify-between

          mb-6
        "
      >
        <div
          className="
            text-[11px]
            uppercase
            tracking-[0.18em]

            text-white/40
          "
        >
          Incoming Signal
        </div>

        <div
          className="
            flex
            items-center
            gap-2

            rounded-full

            border
            border-emerald-400/20

            bg-emerald-400/10

            px-3
            py-1

            text-[11px]
            font-semibold

            text-emerald-300
          "
        >
          <div
            className="
              h-2
              w-2

              rounded-full

              bg-emerald-400

              animate-pulse
            "
          />

          Live
        </div>
      </div>

      {/* MESSAGE CARD */}
      <div
        className="
          relative
          z-10

          rounded-3xl

          border
          border-white/[0.06]

          bg-white/[0.03]

          p-5
        "
      >
        {/* USER */}
        <div
          className="
            flex
            items-center
            gap-3

            mb-5
          "
        >
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center

              rounded-full

              bg-gradient-to-br
              from-pink-400
              to-violet-500

              text-sm
              font-bold
            "
          >
            SL
          </div>

          <div>
            <div
              className="
                text-[14px]
                font-semibold
                text-white
              "
            >
              Sarah Lin
            </div>

            <div
              className="
                text-[11px]
                text-white/40
              "
            >
              Sr. Recruiter · Stripe
            </div>
          </div>
        </div>

        {/* MESSAGE */}
        <div
          className="
            rounded-2xl

            border
            border-white/[0.06]

            bg-white/[0.03]

            p-4

            text-[13px]
            leading-7

            text-white/60
          "
        >
          “Your Nexus CLI performance benchmarks are exactly
          what our Platform team is looking for. We have a
          Sr. Engineer role that’s a near-perfect match.”
        </div>

        {/* BUTTONS */}
        <div
          className="
            mt-5

            flex
            gap-3
          "
        >
          <button
            className="
              flex-1

              rounded-xl

              border
              border-cyan-400/20

              bg-gradient-to-r
              from-cyan-400/10
              to-violet-500/10

              py-3

              text-[12px]
              font-semibold

              text-cyan-300

              transition-all
              duration-300

              hover:border-cyan-300/40
            "
          >
            Accept & Reply
          </button>

          <button
            className="
              rounded-xl

              border
              border-white/[0.08]

              bg-white/[0.03]

              px-5

              text-[12px]

              text-white/50
            "
          >
            Later
          </button>
        </div>
      </div>

      {/* METRICS */}
      <div
        className="
          relative
          z-10

          mt-5

          grid
          grid-cols-3
          gap-3
        "
      >
        {RECRUITER_METRICS.map((metric) => (
          <RecruiterMetrics
            key={metric.label}
            number={metric.number}
            label={metric.label}
          />
        ))}
      </div>
    </div>
  )
}