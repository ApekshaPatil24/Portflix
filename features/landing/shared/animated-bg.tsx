export default function AnimatedBG() {
  return (
    <div
      className="
        fixed
        inset-0
        z-0
        pointer-events-none
      "
      style={{
        background: `
          radial-gradient(
            ellipse 80% 60% at 15% 10%,
            rgba(124,58,237,0.18) 0%,
            transparent 60%
          ),

          radial-gradient(
            ellipse 60% 50% at 85% 20%,
            rgba(0,229,255,0.12) 0%,
            transparent 55%
          ),

          radial-gradient(
            ellipse 50% 40% at 50% 90%,
            rgba(244,114,182,0.1) 0%,
            transparent 50%
          )
        `,
      }}
    />
  )
}