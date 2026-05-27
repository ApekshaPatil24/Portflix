import Navbar from "@/features/landing/sections/navbar/navbar"
import HeroSection from "@/features/landing/sections/hero/hero-section"
import StatsSection from "@/features/landing/sections/stats/stats-section"
import FeaturesSection from "@/features/landing/sections/features/features-section"
import RecruiterSection from "@/features/landing/sections/recruiter/recruiter-section"
import CTASection from "@/features/landing/sections/cta/cta-section"
import Footer from "@/features/landing/sections/footer/footer"

import CanvasBackground from "@/features/landing/shared/canvas-background"
import FloatingParticles from "@/features/landing/shared/floating-particles"

export default function LandingPage() {
  return (
    <main className="relative bg-[#02030d] overflow-hidden">
      <CanvasBackground />
      <FloatingParticles />

      <Navbar />

      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <RecruiterSection />
      <CTASection />

      <Footer />
    </main>
  )
}