import { FEATURES } from "../../constants/features"
import FeatureCard from "./feature-card"

export default function FeatureGrid() {
  return (
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-3
      "
    >
      {FEATURES.map((feature) => (
        <FeatureCard
          key={feature.id}
          title={feature.title}
          description={feature.description}
          tag={feature.tag}
          icon={feature.icon}
          variant={feature.variant as any}
          large={feature.large}
        />
      ))}
    </div>
  )
}