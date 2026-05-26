import { useState } from 'react'

export default function ProductImageSlider({ images = [] }) {
  const [index, setIndex] = useState(0)
  const slides = images.length ? images : [{ url: null }]

  return (
    <div className="relative bg-gray-50 aspect-square overflow-hidden">
      {slides[index]?.url ? (
        <img
          src={slides[index].url}
          alt=""
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-300 text-5xl">
          🧸
        </div>
      )}

      {slides.length > 1 && (
        <>
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-4 bg-brand-red' : 'w-1.5 bg-white/70'
                }`}
              />
            ))}
          </div>

          {index > 0 && (
            <button
              onClick={() => setIndex((i) => i - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 shadow flex items-center justify-center"
            >
              ‹
            </button>
          )}
          {index < slides.length - 1 && (
            <button
              onClick={() => setIndex((i) => i + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 shadow flex items-center justify-center"
            >
              ›
            </button>
          )}
        </>
      )}
    </div>
  )
}
