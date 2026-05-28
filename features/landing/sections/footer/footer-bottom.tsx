export default function FooterBottom() {
  return (
    <div
      className="
        mt-14

        flex
        flex-col
        gap-5

        border-t
        border-white/[0.06]

        pt-6

        md:flex-row
        md:items-center
        md:justify-between
      "
    >
      <div
        className="
          text-[13px]
          text-white/35
        "
      >
        © 2026 Portlix. Built for developers.
      </div>

      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <div
          className="
            rounded-full

            border
            border-white/[0.08]

            bg-black/30

            px-4
            py-2

            text-[11px]

            text-cyan-300

            backdrop-blur-xl
          "
        >
          Next.js
        </div>

        <div
          className="
            rounded-full

            border
            border-white/[0.08]

            bg-black/30

            px-4
            py-2

            text-[11px]

            text-violet-300

            backdrop-blur-xl
          "
        >
          Supabase
        </div>

        <div
          className="
            rounded-full

            border
            border-white/[0.08]

            bg-black/30

            px-4
            py-2

            text-[11px]

            text-pink-300

            backdrop-blur-xl
          "
        >
          AI Powered
        </div>
      </div>
    </div>
  )
}