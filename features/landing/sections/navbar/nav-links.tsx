const links = [
  "Features",
  "Templates",
  "Pricing",
  "About",
]

export default function NavLinks() {
  return (
    <div className="relative z-10 flex gap-7">
      {links.map((link) => (
        <a
          key={link}
          href="#"
          className="
            text-[13px]
            font-medium
            text-zinc-400
            hover:text-white
            transition-colors
          "
        >
          {link}
        </a>
      ))}
    </div>
  )
}