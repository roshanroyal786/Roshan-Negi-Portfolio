import { useEffect, useRef, useState } from 'react'
import { portfolioVideos } from '../data/portfolioData'

// Filter native MP4 videos for high-performance seamless looping
const nativeVideos = portfolioVideos.filter((v) => v.provider === 'native' && v.videoSrc)

const row1Videos = nativeVideos.slice(0, 10)
const row2Videos = nativeVideos.slice(10, 20)

// Triple for seamless continuous scrolling
const row1Tripled = [...row1Videos, ...row1Videos, ...row1Videos]
const row2Tripled = [...row2Videos, ...row2Videos, ...row2Videos]

const tapeKeywords = [
  'POSTERS ✦',
  'LYRIC ANIMATION ＋',
  'SOCIAL CREATIVE ✦',
  'REELS ＋',
  'SHORTS ✦',
  'THUMBNAILS ＋',
  '12.8M ORGANIC VIEWS ✦',
  'GRAPHIC DESIGN ＋',
  'MOTION DETAILS ✦',
  'SOUND SYNC ＋',
]

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!sectionRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { rootMargin: '350px' }
    )
    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const sectionTop = sectionRef.current.offsetTop
      const scrollOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3
      setOffset(scrollOffset)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="pt-10 sm:pt-20 md:pt-32 pb-6 sm:pb-10 overflow-hidden w-full"
      style={{ background: '#0C0C0C' }}
    >
      {/* Dynamic Ribbon from Roshan's site */}
      <div className="mb-4 sm:mb-6 overflow-hidden py-2 border-y border-white/10 opacity-70">
        <div
          className="flex gap-4 sm:gap-6 whitespace-nowrap text-xs sm:text-sm uppercase tracking-widest font-medium text-[#BBCCD7]"
          style={{ transform: `translateX(${-offset * 0.5}px)`, willChange: 'transform' }}
        >
          {[...tapeKeywords, ...tapeKeywords, ...tapeKeywords, ...tapeKeywords].map((word, idx) => (
            <span key={idx} className="flex-shrink-0">
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Row 1 - moves RIGHT: Real Auto-Looping Video Edits */}
      <div
        className="flex gap-2.5 sm:gap-3 mb-2.5 sm:mb-3"
        style={{ transform: `translateX(${offset - 200}px)`, willChange: 'transform' }}
      >
        {row1Tripled.map((video, i) => (
          <div
            key={`r1-${video.id}-${i}`}
            className="w-[250px] sm:w-[360px] md:w-[420px] h-[160px] sm:h-[230px] md:h-[270px] rounded-2xl overflow-hidden flex-shrink-0 relative bg-black border border-white/10 group"
          >
            {isVisible && video.videoSrc ? (
              <video
                src={video.videoSrc}
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <img
                src={video.previewSrc}
                alt={video.title}
                loading="lazy"
                className="w-full h-full object-cover rounded-2xl"
              />
            )}
            {/* Auto-loop badge & title tag */}
            <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 bg-black/60 backdrop-blur-md px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] text-emerald-400 uppercase tracking-widest font-semibold flex items-center gap-1 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Auto-Loop
            </div>
            <div className="absolute bottom-0 inset-x-0 p-2.5 sm:p-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
              <span className="text-[9px] sm:text-[10px] text-[#BBCCD7]/70 uppercase tracking-widest block font-medium">
                {video.origin}
              </span>
              <span className="text-[11px] sm:text-xs text-[#D7E2EA] uppercase font-bold truncate block">
                {video.title}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Row 2 - moves LEFT: Real Auto-Looping Video Edits */}
      <div
        className="flex gap-2.5 sm:gap-3"
        style={{ transform: `translateX(${-(offset - 200)}px)`, willChange: 'transform' }}
      >
        {row2Tripled.map((video, i) => (
          <div
            key={`r2-${video.id}-${i}`}
            className="w-[250px] sm:w-[360px] md:w-[420px] h-[160px] sm:h-[230px] md:h-[270px] rounded-2xl overflow-hidden flex-shrink-0 relative bg-black border border-white/10 group"
          >
            {isVisible && video.videoSrc ? (
              <video
                src={video.videoSrc}
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <img
                src={video.previewSrc}
                alt={video.title}
                loading="lazy"
                className="w-full h-full object-cover rounded-2xl"
              />
            )}
            {/* Auto-loop badge & title tag */}
            <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 bg-black/60 backdrop-blur-md px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] text-emerald-400 uppercase tracking-widest font-semibold flex items-center gap-1 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Auto-Loop
            </div>
            <div className="absolute bottom-0 inset-x-0 p-2.5 sm:p-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
              <span className="text-[9px] sm:text-[10px] text-[#BBCCD7]/70 uppercase tracking-widest block font-medium">
                {video.origin}
              </span>
              <span className="text-[11px] sm:text-xs text-[#D7E2EA] uppercase font-bold truncate block">
                {video.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
