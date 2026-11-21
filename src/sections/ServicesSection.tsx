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
      className="rounded-t-[32px] sm:rounded-t-[50px] md:rounded-t-[60px] px-4 sm:px-8 md:px-10 py-12 sm:py-20 md:py-28 overflow-hidden w-full"
      style={{ background: '#FFFFFF' }}
    >
      <div className="text-center mb-8 sm:mb-14 md:mb-20">
        <span className="text-xs sm:text-sm uppercase tracking-widest text-black/50 block mb-2 font-medium">
          04 · What I can make
        </span>
        <h2
          className="font-black uppercase text-center"
          style={{ color: '#0C0C0C', fontSize: 'clamp(2.5rem, 10vw, 150px)', lineHeight: 1 }}
        >
          Services
        </h2>
        <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-black/60 font-light max-w-lg mx-auto px-2">
          Good visual work has a job to do.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        {services.map((service, i) => (
          <FadeIn key={service.num} delay={i * 0.1} y={30}>
            <div
              className="flex items-start gap-4 sm:gap-8 md:gap-12 py-5 sm:py-8 md:py-10"
              style={{ borderBottom: '1px solid rgba(12, 12, 12, 0.15)' }}
            >
              <span
                className="font-black flex-shrink-0"
                style={{ color: '#0C0C0C', fontSize: 'clamp(2.2rem, 7vw, 130px)', lineHeight: 1 }}
              >
                {service.num}
              </span>
              <div className="flex flex-col gap-1 sm:gap-2 pt-1 sm:pt-3 md:pt-4">
                <span
                  className="font-medium uppercase"
                  style={{ color: '#0C0C0C', fontSize: 'clamp(1.05rem, 2.2vw, 2.1rem)' }}
                >
                  {service.name}
                </span>
                <p
                  className="font-light leading-relaxed max-w-2xl opacity-60"
                  style={{ color: '#0C0C0C', fontSize: 'clamp(0.82rem, 1.5vw, 1.15rem)' }}
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
