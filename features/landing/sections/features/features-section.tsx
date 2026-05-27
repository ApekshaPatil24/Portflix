import FeatureGrid from "./feature-grid"

export default function FeaturesSection() {
  return (
    <section
      className="
        relative
        z-10
        px-[6%]
        py-24
      "
    >
      {/* TOP GRADIENT */}
      <div
        className="
          absolute
          top-0
          left-1/2
          -translate-x-1/2
          w-[900px]
          h-[500px]
          bg-cyan-500/10
          blur-[140px]
          pointer-events-none
        "
      />

      <div className="relative z-10">
        <div
  className="
    text-[13px]

    uppercase

    tracking-[0.22em]

    font-extrabold

    text-cyan-300

    mb-7
  "
>
  Platform Features
</div>

        <h2
 className="
  max-w-[980px]

  text-white

  font-[900]

  leading-[0.94]

  tracking-[-0.06em]

  text-[54px]
  sm:text-[62px]
  md:text-[50px]
  lg:text-[50px]
  xl:text-[50px]

  mb-7
  "
  style={{
    fontFamily: "var(--font-display)",
  }}
>
  Everything you need to

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
    get hired faster
  </span>
</h2>

        <p
  className="
    max-w-[520px]

    text-white/58

    text-[18px]
    md:text-[15px]

    leading-[1.8]

    mb-20
  "
>
  Built for freshers, juniors, and senior engineers
  who want their work to speak for itself.
</p>

        <FeatureGrid />
      </div>
    </section>
  )
}