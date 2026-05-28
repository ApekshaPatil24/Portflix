type Props = {
  title: string
  items: string[]
}

export default function FooterColumn({
  title,
  items,
}: Props) {
  return (
    <div>
      <h4
        className="
          mb-5

          text-[11px]
          font-bold
          uppercase

          tracking-[0.18em]

          text-white/35
        "
      >
        {title}
      </h4>

      <div
        className="
          flex
          flex-col
          gap-3
        "
      >
        {items.map((item) => (
          <a
            key={item}
            href="#"
            className="
              text-[14px]

              text-white/55

              transition-all
              duration-300

              hover:text-cyan-300
            "
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  )
}