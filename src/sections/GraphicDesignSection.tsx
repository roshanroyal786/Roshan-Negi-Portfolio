import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import { portfolioGraphics, PortfolioGraphic } from '../data/portfolioData'
import { Maximize2, X, Image as ImageIcon, Sparkles } from 'lucide-react'

type GraphicFilter = 'all' | 'social' | 'posters'

export default function GraphicDesignSection() {
  const [filter, setFilter] = useState<GraphicFilter>('all')
  const [selectedGraphic, setSelectedGraphic] = useState<PortfolioGraphic | null>(null)
  const [visibleCount, setVisibleCount] = useState(24)

  const filteredGraphics = portfolioGraphics.filter((g) => {
    if (filter === 'all') return true
    if (filter === 'posters') return g.origin.toLowerCase().includes('poster')
    if (filter === 'social') return g.origin.toLowerCase().includes('social') || g.origin.toLowerCase().includes('carousel')
    return true
  })

  const displayedGraphics = filteredGraphics.slice(0, visibleCount)

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedGraphic(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Helper to get image path (local cached image with Google Drive thumbnail fallback)
  const getImgSrc = (g: PortfolioGraphic) => {
    return `/graphics/${g.id}.png`
  }

  const getFallbackSrc = (g: PortfolioGraphic) => {
    return `https://lh3.googleusercontent.com/d/${g.id}=w1000`
  }

  return (
    <section
      id="graphics"
      className="relative z-10 px-4 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 border-t border-white/10"
      style={{ background: '#0C0C0C' }}
    >
      {/* Header */}
      <FadeIn delay={0} y={40}>
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[#BBCCD7]/60 block mb-2 font-medium">
            04 · Graphic Design
          </span>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Graphic Works
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#D7E2EA]/70 font-light max-w-2xl mx-auto">
            24 source pieces across social creatives, carousels, thumbnails, posters, and appointment visuals. Tap any work to view in high resolution without leaving the page.
          </p>
        </div>
      </FadeIn>

      <div className="max-w-7xl mx-auto">
        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10 pb-6 border-b border-white/10">
          <div>
            <h3 className="text-xl sm:text-2xl font-black uppercase text-[#D7E2EA] flex items-center gap-2">
              <ImageIcon size={22} className="text-[#BBCCD7]" />
              Visual Design Gallery ({portfolioGraphics.length})
            </h3>
            <p className="text-xs sm:text-sm text-[#BBCCD7]/60 mt-0.5">
              Poster design · Social &amp; carousel creatives · Thumbnails
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: `All Graphics (${portfolioGraphics.length})` },
              { id: 'social', label: 'Social & Carousels' },
              { id: 'posters', label: 'Poster Design' },
            ].map((tab) => {
              const isActive = filter === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setFilter(tab.id as GraphicFilter)
                    setVisibleCount(24)
                  }}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-white text-black shadow-lg scale-105'
                      : 'bg-white/5 text-[#BBCCD7] hover:bg-white/10 hover:text-white border border-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Graphics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedGraphics.map((graphic, idx) => (
            <div
              key={`gfx-${graphic.id}-${idx}`}
              onClick={() => setSelectedGraphic(graphic)}
              className="rounded-3xl border border-white/10 overflow-hidden bg-[#141416] group cursor-pointer hover:border-white/30 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative aspect-[9/13] w-full overflow-hidden bg-black/60">
                <img
                  src={getImgSrc(graphic)}
                  alt={graphic.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget
                    if (!target.dataset.triedFallback) {
                      target.dataset.triedFallback = 'true'
                      target.src = getFallbackSrc(graphic)
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-[#BBCCD7] uppercase tracking-widest font-semibold border border-white/10">
                  {graphic.origin.includes('Poster') ? 'Poster' : 'Social Graphic'}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 transform group-hover:scale-110 transition-transform">
                    <Maximize2 size={18} />
                  </div>
                </div>
              </div>

              {/* Caption */}
              <div className="p-4 flex flex-col justify-between bg-[#141416]">
                <span className="text-[10px] uppercase tracking-widest text-[#BBCCD7]/60 block font-medium">
                  {graphic.origin}
                </span>
                <h4 className="text-sm font-bold uppercase text-[#D7E2EA] truncate mt-1">
                  {graphic.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredGraphics.length && (
          <div className="mt-14 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 24)}
              className="rounded-full border-2 border-[#D7E2EA] px-8 py-3 sm:px-10 sm:py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#D7E2EA] hover:bg-white/10 transition-colors duration-200 cursor-pointer"
            >
              Load More Graphics ({filteredGraphics.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>

      {/* FULLSCREEN IN-PAGE GRAPHIC LIGHTBOX */}
      <AnimatePresence>
        {selectedGraphic && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 md:p-10"
            onClick={() => setSelectedGraphic(null)}
          >
            <div
              className="relative max-w-4xl w-full max-h-[92vh] flex flex-col bg-[#141416] rounded-3xl border border-white/15 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/10 bg-black/40">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#BBCCD7]/60 block">
                    {selectedGraphic.origin}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white uppercase truncate">
                    {selectedGraphic.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedGraphic(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Graphic Image Preview */}
              <div className="relative flex-1 bg-black/90 flex items-center justify-center max-h-[72vh] overflow-hidden p-2">
                <img
                  src={getImgSrc(selectedGraphic)}
                  alt={selectedGraphic.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget
                    if (!target.dataset.triedFallback) {
                      target.dataset.triedFallback = 'true'
                      target.src = getFallbackSrc(selectedGraphic)
                    }
                  }}
                  className="w-full max-h-[70vh] object-contain"
                />
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 bg-black/60 flex items-center justify-between text-xs text-[#BBCCD7]/60 border-t border-white/10">
                <span>Viewing high-resolution graphic design asset · In-page preview</span>
                <button
                  onClick={() => setSelectedGraphic(null)}
                  className="uppercase tracking-widest font-semibold text-white hover:underline"
                >
                  Close Viewer
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
