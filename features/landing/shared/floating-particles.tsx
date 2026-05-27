"use client"

import { useEffect, useState } from "react"

type Particle = {
  size: number
  left: number
  color: string
  opacity: number
  duration: number
  delay: number
  blur: number
}

const colors = [
  "#00e5ff",
  "#7c3aed",
  "#f472b6",
  "#a78bfa",
]

export default function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const generated = Array.from({ length: 35 }).map(() => ({
      size: Math.random() * 3 + 1,
      left: Math.random() * 100,
      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ],
      opacity:
        Math.random() * 0.4 + 0.05,
      duration:
        Math.random() * 18 + 12,
      delay:
        Math.random() * -20,
      blur:
        Math.random() * 0.5,
    }))

    setParticles(generated)
  }, [])

  return (
    <>
      {particles.map((particle, i) => (
        <div
          key={i}
          className="particle"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            background: particle.color,
            opacity: particle.opacity,
            animationDuration:
              `${particle.duration}s`,
            animationDelay:
              `${particle.delay}s`,
            filter:
              `blur(${particle.blur}px)`,

            boxShadow: `
              0 0 ${particle.size * 4}px
              ${particle.color}
            `,
          }}
        />
      ))}
    </>
  )
}