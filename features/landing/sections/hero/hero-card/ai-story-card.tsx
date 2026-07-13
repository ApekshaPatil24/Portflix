export default function AIStoryCard() {
  return (
    <div
      className="
        rounded-[16px]

        border
        border-violet-500/20

        bg-gradient-to-br
        from-violet-500/10
        to-cyan-400/[0.04]

        p-[14px]
      "
    >
      {/* header */}
      <div
        className="
          mb-2
          flex
          items-center
          gap-2

          text-[11px]
          font-semibold
          uppercase
          tracking-[0.5px]

          text-violet-300
        "
      >
        <span className="text-[13px]">✦</span>

        AI Story
      </div>

      {/* text */}
      <p
        className="
          text-[12px]
          leading-[1.5]
          text-zinc-400
        "
      >
        &quot;Alex ships fast, writes clean code, and leads
        with empathy. 3× open-source contributor with
        2.4k stars...&quot;
      </p>

      {/* footer */}
      <div
        className="
          mt-3
          flex
          items-center
          justify-between

          border-t
          border-white/[0.06]

          pt-3
        "
      >
        <div
          className="
            text-[11px]
            text-zinc-500
          "
        >
          Recruiter score
        </div>

        <div
          className="
            font-mono
            text-[12px]
            font-semibold

            text-cyan-300
          "
        >
          94 / 100
        </div>
      </div>
    </div>
  )
}