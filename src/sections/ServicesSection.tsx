import FadeIn from '../components/FadeIn'

const services = [
  {
    num: '01',
    name: 'Short-Form Editing',
    desc: 'Reels, Shorts, fast cuts, on-screen captions, beat-aware sound design, and doctor- or expert-led explainers.',
  },
  {
    num: '02',
    name: 'Graphic Design',
    desc: 'Social posts, carousels, thumbnails, poster design, appointment creatives, and visuals that make a message easier to understand.',
  },
  {
    num: '03',
    name: 'Motion Details',
    desc: 'Lyric animation, promotional visual treatments, and light motion systems that add energy without asking the audience to work for it.',
  },
  {
    num: '04',
    name: 'Social Creatives',
    desc: 'High-impact visual campaigns and branded assets tailored to stop the scroll and build lasting brand recall across digital channels.',
  },
  {
    num: '05',
    name: 'Lyric Animation',
    desc: 'Custom rhythmic typography and expressive motion treatments that sync seamlessly with music, beats, and narration.',
  },
]

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
      style={{ background: '#FFFFFF' }}
    >
      <div className="text-center mb-16 sm:mb-20 md:mb-28">
        <span className="text-xs sm:text-sm uppercase tracking-widest text-black/50 block mb-2 font-medium">
          04 · What I can make
        </span>
        <h2
          className="font-black uppercase text-center"
          style={{ color: '#0C0C0C', fontSize: 'clamp(3rem, 12vw, 160px)', lineHeight: 1 }}
        >
          Services
        </h2>
        <p className="mt-4 text-base sm:text-lg text-black/60 font-light max-w-lg mx-auto">
          Good visual work has a job to do.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        {services.map((service, i) => (
          <FadeIn key={service.num} delay={i * 0.1} y={30}>
            <div
              className="flex items-start gap-6 sm:gap-8 md:gap-12 py-8 sm:py-10 md:py-12"
              style={{ borderBottom: '1px solid rgba(12, 12, 12, 0.15)' }}
            >
              <span
                className="font-black flex-shrink-0"
                style={{ color: '#0C0C0C', fontSize: 'clamp(3rem, 10vw, 140px)', lineHeight: 1 }}
              >
                {service.num}
              </span>
              <div className="flex flex-col gap-2 pt-3 sm:pt-4 md:pt-6">
                <span
                  className="font-medium uppercase"
                  style={{ color: '#0C0C0C', fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {service.name}
                </span>
                <p
                  className="font-light leading-relaxed max-w-2xl opacity-60"
                  style={{ color: '#0C0C0C', fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                >
                  {service.desc}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
