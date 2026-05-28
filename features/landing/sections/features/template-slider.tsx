const templates = [
   "/templates/portflix-template-1.png",
  "/templates/portflix-template-2.png",
  "/templates/portflix-template-3.png",
]

export default function TemplateSlider() {
  return (
    <div
      className="
        relative
        mt-8
        overflow-hidden
      "
    >
      {/* LEFT FADE */}
      <div
        className="
          absolute
          left-0
          top-0
          z-20
          h-full
          w-35
          bg-gradient-to-r
          from-[#02030d]
          to-transparent
        "
      />

      {/* RIGHT FADE */}
      <div
        className="
          absolute
          right-0
          top-0
          z-20
          h-full
          w-20
          bg-gradient-to-l
          from-[#02030d]
          to-transparent
        "
      />

      <div className="template-slider-track">
        {[...templates, ...templates].map((image, index) => (
          <div
            key={index}
            className="
              template-card
            "
          >
            <img
              src={image}
              alt="Template Preview"
              className="
                h-full
                w-full
                object-cover
              "
            />
          </div>
        ))}
      </div>
    </div>
  )
}