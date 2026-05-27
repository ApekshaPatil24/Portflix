export default function LiveIndicator() {
  return (
    <div
      className="
        flex
        items-center
        gap-2
      "
    >
      <div className="relative flex h-2.5 w-2.5">
        <div
          className="
            absolute
            inline-flex
            h-full
            w-full
            animate-ping
            rounded-full
            bg-green-400
            opacity-75
          "
        />

        <div
          className="
            relative
            inline-flex
            h-2.5
            w-2.5
            rounded-full
            bg-green-400
          "
        />
      </div>

      <span
        className="
          text-[10px]
          uppercase
          tracking-[1px]

          text-green-300
        "
      >
        Live
      </span>
    </div>
  )
}