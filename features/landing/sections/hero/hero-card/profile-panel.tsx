export default function ProfilePanel() {
  return (
    <div
      className="
        relative
        overflow-hidden

        rounded-[20px]
        border
        border-white/[0.07]

        bg-white/[0.03]

        p-[22px]
      "
    >
      {/* cyan blur */}
      <div
        className="
          absolute
          -top-[30px]
          -right-[30px]

          h-[100px]
          w-[100px]
          rounded-full

          bg-cyan-400/20
          blur-[50px]
        "
      />

      {/* avatar */}
      <div className="relative mb-3 h-14 w-14">
        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center

            rounded-full

            bg-gradient-to-br
            from-cyan-400
            via-violet-500
            to-pink-400

            text-[20px]
            font-black
            text-white

            shadow-[0_0_0_3px_rgba(0,229,255,0.15),0_0_30px_rgba(0,229,255,0.2)]
          "
          style={{
            fontFamily: "var(--font-display)",
          }}
        >
          AK
        </div>

        {/* online */}
        <div
          className="
            absolute
            bottom-[1px]
            right-[1px]

            h-3
            w-3

            rounded-full

            border-2
            border-[#02030d]

            bg-green-500

            shadow-[0_0_8px_#22c55e]
          "
        />
      </div>

      {/* name */}
      <h3
        className="
          mb-1
          text-[16px]
          font-black
          text-white
        "
        style={{
          fontFamily: "var(--font-display)",
        }}
      >
        Alex Kumar
      </h3>

      {/* handle */}
      <div
        className="
          mb-3
          font-mono
          text-[12px]
          text-cyan-300
        "
      >
        @alexkumar
      </div>

      {/* bio */}
      <p
        className="
          mb-4
          text-[12px]
          leading-[1.5]
          text-zinc-400
        "
      >
        Full-stack eng · Open to roles · Next.js + Go + Rust
      </p>

      {/* chips */}
      <div className="mb-4 flex flex-wrap gap-[5px]">
        {[
          ["Next.js", "cyan"],
          ["TypeScript", "violet"],
          ["Rust", "pink"],
          ["Go", "cyan"],
          ["PostgreSQL", "violet"],
          ["Redis", "pink"],
        ].map(([skill, color]) => (
          <div
            key={skill}
            className={`
              rounded-full
              border
              px-[9px]
              py-[3px]

              text-[10px]
              font-semibold
              font-mono

              ${
                color === "cyan"
                  ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
                  : color === "violet"
                  ? "border-violet-400/20 bg-violet-400/10 text-violet-300"
                  : "border-pink-400/20 bg-pink-400/10 text-pink-300"
              }
            `}
          >
            {skill}
          </div>
        ))}
      </div>

      {/* stats */}
      <div className="grid grid-cols-2 gap-2">
        {[
          ["2.4k", "Stars"],
          ["847", "Commits"],
          ["34", "Offers"],
          ["98%", "Match"],
        ].map(([num, label]) => (
          <div
            key={label}
            className="
              rounded-[10px]
              border
              border-white/[0.06]

              bg-white/[0.03]

              p-[10px]
              text-center
            "
          >
            <div
              className="
                text-[15px]
                font-black
                text-white
              "
              style={{
                fontFamily: "var(--font-display)",
              }}
            >
              {num}
            </div>

            <div
              className="
                mt-1
                text-[9px]
                uppercase
                tracking-[0.5px]
                text-zinc-500
              "
            >
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}