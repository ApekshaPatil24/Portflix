import HeroContent from "./hero-content"
import HeroOrbits from "./hero-orbits"
import HeroCTA from "./hero-cta"
import HeroCard from "./hero-card/hero-card"

export default function HeroSection() {
  return (
    <section
      className="
        relative
        z-[1]
        min-h-screen
        flex
        flex-col
        items-center
        justify-start
        px-[6%]
        pt-[145px]
        pb-[120px]
        text-center
        overflow-hidden
      "
    >
      <HeroOrbits />

      <HeroContent />
      <HeroCTA />
      <HeroCard />
    </section>
  )
}