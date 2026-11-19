import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import { portfolioVideos, portfolioGraphics, PortfolioVideo, PortfolioGraphic } from '../data/portfolioData'
import { Play, Volume2, VolumeX, Maximize2, X, Film, Image as ImageIcon, Sparkles } from 'lucide-react'

type TabType = 'all' | 'video' | 'graphic' | 'reels'

export default function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<TabType>('all')
  const [selectedVideo, setSelectedVideo] = useState<PortfolioVideo | null>(null)
  const [selectedGraphic, setSelectedGraphic] = useState<PortfolioGraphic | null>(null)
  const [modalMuted, setModalMuted] = useState(false)
  const [visibleCount, setVisibleCount] = useState(24)

  // Filter items
  const filteredVideos = portfolioVideos.filter((v) => {
    if (activeTab === 'all' || activeTab === 'video') return true
    if (activeTab === 'reels') {
      return (
        v.title.toLowerCase().includes('reel') ||
        v.title.toLowerCase().includes('short') ||
        v.origin.toLowerCase().includes('addition')
      )
    }
    return false
  })

  const filteredGraphics = portfolioGraphics.filter(() => {
    if (activeTab === 'all' || activeTab === 'graphic') return true
    return false
  })

  // Combine items for 'all' tab in an alternating rhythm
  const combinedItems: Array<
    { type: 'video'; data: PortfolioVideo } | { type: 'graphic'; data: PortfolioGraphic }
  > = []

  if (activeTab === 'all') {
    const maxLen = Math.max(portfolioVideos.length, portfolioGraphics.length)
    for (let i = 0; i < maxLen; i++) {
      if (i < portfolioVideos.length) {
        combinedItems.push({ type: 'video', data: portfolioVideos[i] })
      }
      if (i < portfolioGraphics.length) {
        combinedItems.push({ type: 'graphic', data: portfolioGraphics[i] })
      }
    }
  } else if (activeTab === 'graphic') {
    filteredGraphics.forEach((g) => combinedItems.push({ type: 'graphic', data: g }))
  } else {
    filteredVideos.forEach((v) => combinedItems.push({ type: 'video', data: v }))
  }

  const displayedItems = combinedItems.slice(0, visibleCount)

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedVideo(null)
        setSelectedGraphic(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <section
      id="projects"
      className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-4 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
      style={{ background: '#0C0C0C' }}
    >
      {/* Section Header */}
      <FadeIn delay={0} y={40}>
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[#BBCCD7]/60 block mb-2 font-medium">
            03 · The Full Portfolio
          </span>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            All Creations
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#D7E2EA]/70 font-light max-w-2xl mx-auto">
            Edits that move. Frames that stay. All videos loop automatically in muted preview — click any work to view in full resolution with audio controls.
          </p>
        </div>
      </FadeIn>

      {/* ALL CREATIONS VAULT - FILTER & GRID */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10 pb-6 border-b border-white/10">
          <div>
            <h3 className="text-xl sm:text-2xl font-black uppercase text-[#D7E2EA]">
              Portfolio Works ({portfolioVideos.length + portfolioGraphics.length})
            </h3>
            <p className="text-xs sm:text-sm text-[#BBCCD7]/60 mt-0.5">
              62 auto-looping video projects &amp; 24 graphic design source pieces
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: `All (${portfolioVideos.length + portfolioGraphics.length})`, icon: Sparkles },
              { id: 'video', label: `Videos (${portfolioVideos.length})`, icon: Film },
              { id: 'graphic', label: `Graphics (${portfolioGraphics.length})`, icon: ImageIcon },
              { id: 'reels', label: 'Reels / Shorts', icon: Film },
            ].map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as TabType)
                    setVisibleCount(24)
                  }}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-white text-black shadow-lg scale-105'
                      : 'bg-white/5 text-[#BBCCD7] hover:bg-white/10 hover:text-white border border-white/5'
                  }`}
                >
                  <Icon size={14} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Dynamic Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedItems.map((item, idx) => {
            if (item.type === 'video') {
              const video = item.data
              return (
                <div
                  key={`vid-${video.id}-${idx}`}
                  onClick={() => setSelectedVideo(video)}
                  className="rounded-3xl border border-white/10 overflow-hidden bg-[#141416] group cursor-pointer hover:border-white/30 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Media Container */}
                  <div className="relative aspect-[9/12] sm:aspect-[9/13] w-full overflow-hidden bg-black">
                    {video.videoSrc && video.provider === 'native' ? (
                      <video
                        src={video.videoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : video.provider === 'youtube' ? (
                      <iframe
                        src={video.videoSrc || ''}
                        title={video.title}
                        className="w-full h-full pointer-events-none"
                        allow="autoplay; encrypted-media"
                      />
                    ) : (
                      <img
                        src={video.previewSrc}
                        alt={video.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}

                    {/* Badge */}
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-emerald-400 uppercase tracking-widest font-semibold flex items-center gap-1 border border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Auto-Loop
                    </div>

                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-[#BBCCD7] uppercase tracking-wider border border-white/10">
                      {video.provider}
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                        <Play size={20} fill="white" className="ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="p-4 flex flex-col justify-between bg-[#141416]">
                    <span className="text-[10px] uppercase tracking-widest text-[#BBCCD7]/60 block font-medium">
                      {video.origin}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold uppercase text-[#D7E2EA] truncate mt-1">
                      {video.title}
                    </h4>
                  </div>
                </div>
              )
            } else {
              const graphic = item.data
              return (
                <div
                  key={`gfx-${graphic.id}-${idx}`}
                  onClick={() => setSelectedGraphic(graphic)}
                  className="rounded-3xl border border-white/10 overflow-hidden bg-[#141416] group cursor-pointer hover:border-white/30 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Image container */}
                  <div className="relative aspect-[9/12] sm:aspect-[9/13] w-full overflow-hidden bg-black/60">
                    <img
                      src={graphic.imageSrc}
                      alt={graphic.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-[#BBCCD7] uppercase tracking-widest font-semibold border border-white/10">
                      Graphic
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                        <Maximize2 size={18} />
                      </div>
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="p-4 flex flex-col justify-between bg-[#141416]">
                    <span className="text-[10px] uppercase tracking-widest text-[#BBCCD7]/60 block font-medium">
                      {graphic.origin}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold uppercase text-[#D7E2EA] truncate mt-1">
                      {graphic.title}
                    </h4>
                  </div>
                </div>
              )
            }
          })}
        </div>

        {/* Load More Button */}
        {visibleCount < combinedItems.length && (
          <div className="mt-14 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 24)}
              className="rounded-full border-2 border-[#D7E2EA] px-8 py-3 sm:px-10 sm:py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#D7E2EA] hover:bg-white/10 transition-colors duration-200 cursor-pointer"
            >
              Load More Works ({combinedItems.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>

      {/* FULLSCREEN IN-PAGE VIDEO MODAL (NO REDIRECT!) */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 md:p-10"
            onClick={() => setSelectedVideo(null)}
          >
            <div
              className="relative max-w-4xl w-full max-h-[92vh] flex flex-col bg-[#141416] rounded-3xl border border-white/15 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/10 bg-black/40">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#BBCCD7]/60 block">
                    {selectedVideo.origin}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white uppercase truncate">
                    {selectedVideo.title}
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setModalMuted(!modalMuted)}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    title={modalMuted ? 'Unmute' : 'Mute'}
                  >
                    {modalMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                  <button
                    onClick={() => setSelectedVideo(null)}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Video Player */}
              <div className="relative flex-1 bg-black flex items-center justify-center max-h-[70vh] overflow-hidden">
                {selectedVideo.videoSrc && selectedVideo.provider === 'native' ? (
                  <video
                    src={selectedVideo.videoSrc}
                    autoPlay
                    loop
                    controls
                    muted={modalMuted}
                    playsInline
                    className="w-full max-h-[70vh] object-contain"
                  />
                ) : selectedVideo.provider === 'youtube' ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&controls=1&playsinline=1`}
                    title={selectedVideo.title}
                    className="w-full aspect-video max-h-[70vh]"
                    allow="autoplay; encrypted-media; fullscreen"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={selectedVideo.previewSrc}
                    alt={selectedVideo.title}
                    className="w-full max-h-[70vh] object-contain"
                  />
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 bg-black/60 flex items-center justify-between text-xs text-[#BBCCD7]/60 border-t border-white/10">
                <span>Playing in full in-page player · No external redirect</span>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="uppercase tracking-widest font-semibold text-white hover:underline"
                >
                  Close Viewer
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULLSCREEN IN-PAGE GRAPHIC LIGHTBOX (NO REDIRECT!) */}
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
                  src={selectedGraphic.fullImageSrc}
                  alt={selectedGraphic.title}
                  className="w-full max-h-[70vh] object-contain"
                />
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 bg-black/60 flex items-center justify-between text-xs text-[#BBCCD7]/60 border-t border-white/10">
                <span>Viewing high-resolution graphic design asset</span>
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
