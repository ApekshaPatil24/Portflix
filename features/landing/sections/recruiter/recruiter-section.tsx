import RecruiterCard from "./recruiter-card"

export default function RecruiterSection() {
  return (
    <section
      id="about"
      className="
        relative
        z-10

        px-[6%]
        py-28
      "
    >

      <div
        className="
          grid
          items-center
          gap-16

          lg:grid-cols-2
        "
      >
        {/* LEFT */}
        <div>
          <div
            className="
              mb-4

              text-[11px]
              font-bold
              uppercase

              tracking-[0.22em]

              text-cyan-300
            "
          >
            For Recruiters
          </div>

          <h2
            className="
              max-w-[520px]

              text-[52px]
              font-black

              leading-[0.95]
              tracking-[-0.05em]

              text-white
            "
            style={{
              fontFamily: "var(--font-display)",
            }}
          >
            The right engineer,
            <br />

            <span
              className="
                bg-gradient-to-r
                from-cyan-300
                via-sky-400
                to-violet-400

                bg-clip-text
                text-transparent
              "
            >
              instantly found
            </span>
          </h2>

          <p
            className="
              mt-7

              max-w-[440px]

              text-[15px]
              leading-8

              text-white/55
            "
          >
            Browse verified developers filtered by stack,
            open-source impact, commit consistency, and real
            availability.
          </p>

          <div
            className="
              mt-10

              flex
              flex-col
              gap-5
            "
          >
            {[
              "Verified GitHub-backed profiles",
              "AI-scored talent-to-JD match",
              "Real-time availability signals",
              "Direct async messaging",
            ].map((item) => (
              <div
                key={item}
                className="
                  flex
                  items-center
                  gap-3

                  text-[14px]
                  text-white/60
                "
              >
                <span className="text-cyan-300">
                  ✓
                </span>

                {item}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <RecruiterCard />
      </div>
    </section>
  )
}