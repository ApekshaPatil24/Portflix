"use client"

import AuthCard from "./auth-card"
import GitHubLoginButton from "./github-login-button"
import GoogleLoginButton from "./google-login-button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function LoginForm() {
  return (
    <div
      className="
        relative

        min-h-screen

        overflow-hidden

        bg-[#050816]

        text-white
      "
    >
      {/* GLOBAL BG GLOW */}
      <div
        className="
          absolute
          -left-32
          -top-32

          h-[420px]
          w-[420px]

          rounded-full

          bg-cyan-400/10

          blur-[120px]
        "
      />

      <div
        className="
          absolute
          bottom-0
          right-0

          h-[320px]
          w-[320px]

          rounded-full

          bg-violet-500/10

          blur-[120px]
        "
      />

      <main
        className="
          min-h-screen

          md:grid
          md:grid-cols-2
        "
      >
        {/* =========================
            LEFT SIDE
        ========================= */}
        <section
          className="
            relative

            hidden
            flex-1
            overflow-hidden

            bg-[#0c0e14]

            p-16

            md:flex
            md:flex-col
            md:justify-between
          "
        >
          {/* TOP GLOW */}
          <div
            className="
              absolute
              -top-24
              -left-24

              h-96
              w-96

              rounded-full

              bg-cyan-400/10

              blur-[80px]
            "
          />

          {/* BOTTOM GLOW */}
          <div
            className="
              absolute
              bottom-1/4
              -right-12

              h-64
              w-64

              rounded-full

              bg-cyan-400/5

              blur-[80px]

              opacity-50
            "
          />

          {/* LOGO */}
          <div className="z-10">
            <h1
              className="
                text-[32px]
                font-semibold

                tracking-[-0.02em]

                text-cyan-300
              "
              style={{
                fontFamily:
                  "var(--font-display)",
              }}
            >
              Portlix
            </h1>

           <div
  className="
    mt-2

    overflow-hidden

    text-[12px]
    uppercase

    tracking-[0.08em]

    text-white/45
  "
  style={{
    fontFamily:
      "var(--font-mono)",
  }}
>
  <span className="auth-typewriter">
    Identity Management for the 0.1%
  </span>
</div>
          </div>

          {/* MAIN CONTENT */}
          <div
            className="
              z-10

              max-w-xl

              space-y-6
            "
          >
            <h2
              className="
                max-w-[620px]

                text-[64px]

                font-semibold

                leading-[1.1]
                tracking-[-0.04em]

                text-white
              "
              style={{
                fontFamily:
                  "var(--font-display)",
              }}
            >
              Engineer your{" "}

              <span className="text-cyan-300">
                digital edge.
              </span>
            </h2>

            <p
              className="
                max-w-[560px]

                text-[16px]
                leading-[1.7]

                text-white/55
              "
            >
              Experience a high-fidelity workspace
              designed for elite developers. Deploy
              faster, secure harder, and manage your
              stack with cinematic precision.
            </p>

            {/* STATS */}
            <div
              className="
                grid
                grid-cols-2
                gap-4

                pt-8
              "
            >
              {/* CARD */}
              <div
                className="
                  rounded-[24px]

                  border
                  border-white/[0.08]

                  bg-white/[0.03]

                  p-6

                  backdrop-blur-[24px]

                  transition-all
                  duration-500

                  hover:bg-white/[0.04]
                "
              >
                <div
                  className="
                    mb-1

                    text-[40px]
                    font-semibold

                    text-cyan-300
                  "
                  style={{
                    fontFamily:
                      "var(--font-display)",
                  }}
                >
                  99.9
                </div>

                <div
                  className="
                    text-[11px]
                    uppercase

                    tracking-[0.18em]

                    text-white/40
                  "
                >
                  Uptime SLA
                </div>
              </div>

              {/* CARD */}
              <div
                className="
                  rounded-[24px]

                  border
                  border-white/[0.08]

                  bg-white/[0.03]

                  p-6

                  backdrop-blur-[24px]

                  transition-all
                  duration-500

                  hover:bg-white/[0.04]
                "
              >
                <div
                  className="
                    mb-1

                    text-[40px]
                    font-semibold

                    text-violet-300
                  "
                  style={{
                    fontFamily:
                      "var(--font-display)",
                  }}
                >
                  2ms
                </div>

                <div
                  className="
                    text-[11px]
                    uppercase

                    tracking-[0.18em]

                    text-white/40
                  "
                >
                  Global Latency
                </div>
              </div>
            </div>
          </div>

          {/* BACKGROUND IMAGE */}
          <div
            className="
              absolute
              bottom-0
              right-0

              h-1/2
              w-full

              opacity-20

              pointer-events-none
            "
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBt8bmkQJ7RU2H66EvKtMz5OQx1aXd5WEYWGZgUASFn9ho0wO25Yv9gfNb57viJr3R5ISte1BFDNF2X8VINfxxNJ7_3YztXM5nRm_s-N3FsuqOQlpuKYDnlYaRs9CUPsMiqAOYuijT52HjA3QtI7_Ihs1meGR9UYWtitrXBLw_Y1DJVq7zE2EtItdipLqgA8XNss66Pr6bSeBMnrkYJKi0EZTgB3FRnQM5upqNPkX-hNDdbAXENf9q9CMccxRPR56lN1qXLeLY9rA"
              alt="Abstract data visualization"
              className="
                h-full
                w-full

                object-cover
                scale-105

                animate-[slowFloat_8s_ease-in-out_infinite]
              "
            />
          </div>

          {/* FOOTER */}
          <footer className="z-10">
            <p
              className="
                text-[13px]

                text-white/30
              "
              style={{
                fontFamily:
                  "var(--font-mono)",
              }}
            >
              © 2024 Portlix Identity Systems.
              All Rights Reserved.
            </p>
          </footer>
        </section>

        {/* =========================
            RIGHT SIDE
        ========================= */}
        <section
          className="
            relative

            flex
            flex-1
            items-center
            justify-center

            overflow-hidden

            bg-[#12131a]

            px-6
            py-10

            md:px-20
          "
        >
          {/* ATMOSPHERIC GLOW */}
          <div
            className="
              absolute
              top-1/2
              left-1/2

              h-[520px]
              w-[520px]

              -translate-x-1/2
              -translate-y-1/2

              rounded-full

              bg-cyan-400/[0.04]

              blur-[120px]

              animate-pulse

              pointer-events-none
            "
          />

          {/* BACK TO HOME */}
<Link
  href="/"
  className="
    absolute
    left-6
    top-6
    z-20

    flex
    items-center
    gap-2

    rounded-full

    border
    border-white/[0.08]

    bg-white/[0.03]

    px-4
    py-2

    text-[12px]
    font-medium

    text-white/55

    backdrop-blur-xl

    transition-all
    duration-300

    hover:border-cyan-400/20
    hover:bg-white/[0.05]
    hover:text-cyan-300
  "
>
  <ArrowLeft className="h-4 w-4" />

  Back
</Link>

          {/* MOBILE LOGO */}
          <div
            className="
              absolute
              top-10
              left-1/2

              -translate-x-1/2

              md:hidden
            "
          >
            <h1
              className="
                text-[30px]
                font-semibold

                tracking-[-0.04em]

                text-cyan-300
              "
              style={{
                fontFamily:
                  "var(--font-display)",
              }}
            >
              Portlix
            </h1>
          </div>

          {/* FORM WRAPPER */}
          <div
            className="
              relative
              z-10

              w-full
              max-w-[400px]

              animate-[fadeUp_0.7s_ease]
            "
          >
            {/* HEADING */}
            <div className="mb-8">
              <h3
                className="
                  text-[28px]
                  md:text-[30px]

                  font-semibold

                  tracking-[-0.04em]

                  text-white
                "
                style={{
                  fontFamily:
                    "var(--font-display)",
                }}
              >
                Welcome Back
              </h3>

              <p
                className="
                  mt-2

                  text-[14px]

                  text-white/45
                "
              >
                Enter your credentials to access the hub.
              </p>
            </div>

            {/* SOCIAL LOGIN */}
            <div className="space-y-4">
              <GoogleLoginButton />

              <GitHubLoginButton />
            </div>

            {/* DIVIDER */}
            <div
              className="
                relative

                my-8

                flex
                items-center
              "
            >
              <div
                className="
                  h-px
                  flex-1

                  bg-white/[0.06]
                "
              />

              <span
                className="
                  px-4

                  text-[10px]
                  uppercase

                  tracking-[0.22em]

                  text-white/25
                "
                style={{
                  fontFamily:
                    "var(--font-mono)",
                }}
              >
                Secure Access
              </span>

              <div
                className="
                  h-px
                  flex-1

                  bg-white/[0.06]
                "
              />
            </div>

            {/* AUTH CARD */}
            <AuthCard>
              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >
                <div>
                  <div
                    className="
                      text-[14px]
                      font-semibold

                      text-white
                    "
                  >
                    OAuth Authentication
                  </div>

                  <div
                    className="
                      mt-1

                      text-[13px]

                      text-white/45
                    "
                  >
                    Secure GitHub & Google login
                  </div>
                </div>

                <div
                  className="
                    rounded-full

                    border
                    border-emerald-400/20

                    bg-emerald-400/10

                    px-3
                    py-1

                    text-[11px]

                    text-emerald-300
                  "
                >
                  Encrypted
                </div>
              </div>
            </AuthCard>

            {/* FOOT NOTE */}
            <p
              className="
                mt-8

                text-center

                text-[14px]

                text-white/45
              "
            >
              Don’t have an account?

              <span
                className="
                  ml-2

                  text-cyan-300

                  hover:underline

                  cursor-pointer
                "
              >
                Join the hub
              </span>
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}