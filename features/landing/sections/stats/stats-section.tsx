import { stats } from "../../constants/stats"
import StatCard from "./stat-card"

export default function StatsSection() {
  return (
    <section
      className="
        relative
        z-10

        px-[6%]
        pb-28
      "
    >
      <div
        className="
          grid
          gap-5

          md:grid-cols-2
          xl:grid-cols-4
        "
      >
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            number={stat.number}
            label={stat.label}
          />
        ))}
      </div>
    </section>
  )
}