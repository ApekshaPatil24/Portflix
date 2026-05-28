import FooterBottom from "./footer-bottom"
import FooterColumn from "./footer-column"

const footerLinks = [
  {
    title: "Platform",
    items: [
      "Features",
      "Templates",
      "Pricing",
      "Analytics",
    ],
  },
  {
    title: "Resources",
    items: [
      "Blog",
      "Guides",
      "Showcase",
      "Support",
    ],
  },
  {
    title: "Company",
    items: [
      "About",
      "Careers",
      "Privacy",
      "Terms",
    ],
  },
]

export default function FooterSection() {
  return (
    <footer
      className="
        relative
        z-10

        
        pt-6
      "
    >
      <div
        className="
          relative

          overflow-hidden

          rounded-t-[30px]

          border
          border-white/[0.08]

          bg-gradient-to-b
          from-white/[0.05]
          to-white/[0.02]

          px-[6%]
          py-12
        "
      >
        {/* CONTRAST GLOW */}
        <div
          className="
            absolute
            left-0
            top-0

            h-full
            w-[320px]

            bg-cyan-500/10

            blur-[100px]
          "
        />

        <div
          className="
            absolute
            right-0
            bottom-0

            h-full
            w-[320px]

            bg-violet-500/10

            blur-[100px]
          "
        />

        {/* TOP BORDER LIGHT */}
        <div
          className="
            absolute
            inset-x-0
            top-0
            h-[1px]

            bg-gradient-to-r
            from-transparent
            via-cyan-400/40
            to-transparent
          "
        />

        <div
          className="
            relative
            z-10

            grid
            gap-14

            lg:grid-cols-[1.2fr_1fr]
          "
        >
          {/* LEFT */}
          <div>
            <div
              className="
                inline-flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center

                  rounded-2xl

                  bg-gradient-to-br
                  from-cyan-400
                  via-sky-400
                  to-violet-500

                  text-[18px]
                  font-black

                  text-white

                  shadow-[0_0_40px_rgba(0,229,255,0.25)]
                "
                style={{
                  fontFamily:
                    "var(--font-display)",
                }}
              >
                P
              </div>

              <div>
                <div
                  className="
                    text-[24px]
                    font-black

                    tracking-[-0.05em]

                    text-white
                  "
                  style={{
                    fontFamily:
                      "var(--font-display)",
                  }}
                >
                  Portlix
                </div>

                <div
                  className="
                    text-[12px]

                    text-white/40
                  "
                >
                  AI-powered developer identity
                </div>
              </div>
            </div>

            <p
              className="
                mt-7

                max-w-[420px]

                text-[15px]
                leading-8

                text-white/50
              "
            >
              Transform your GitHub into a cinematic
              developer identity that recruiters actually
              remember.
            </p>

            {/* SOCIALS */}
            <div
              className="
                mt-8

                flex
                items-center
                gap-3
              "
            >
              {[
                "Twitter",
                "LinkedIn",
                "GitHub",
                "Discord",
              ].map((social) => (
                <button
                  key={social}
                  className="
                    rounded-2xl

                    border
                    border-white/[0.08]

                    bg-black/20

                    px-5
                    py-3

                    text-[13px]
                    font-medium

                    text-white/55

                    backdrop-blur-xl

                    transition-all
                    duration-300

                    hover:border-cyan-400/20
                    hover:text-cyan-300
                  "
                >
                  {social}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div
            className="
              grid
              grid-cols-2
              gap-10

              md:grid-cols-3
            "
          >
            {footerLinks.map((column) => (
              <FooterColumn
                key={column.title}
                title={column.title}
                items={column.items}
              />
            ))}
          </div>
        </div>

        <FooterBottom />
      </div>
    </footer>
  )
}