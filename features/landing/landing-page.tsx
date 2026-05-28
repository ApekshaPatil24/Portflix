import AnimatedBG from "./shared/animated-bg"
import FloatingParticles from "./shared/floating-particles"

import Navbar from "./sections/navbar/navbar"
import HeroSection from "./sections/hero/hero-section"
import SignalSection from "./sections/signals/signal-section"
import FeaturesSection from "./sections/features/features-section"
import StackMarquee from "./sections/stack-marquee/stack-marquee"

// import StatsSection from "./sections/stats/stats-section"

export default function LandingPage() {
  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#02030d]
      "
    >
      <AnimatedBG />

      <FloatingParticles />

      <Navbar />

      <HeroSection />

      <SignalSection />

      {/* <StatsSection /> */}

      <FeaturesSection />

      <StackMarquee />
      
    </main>
  )
}