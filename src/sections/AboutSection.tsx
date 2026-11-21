import FadeIn from '../components/FadeIn'
import AnimatedText from '../components/AnimatedText'
import ContactButton from '../components/ContactButton'

const decorativeImages = [
  {
    src: '/moon.webp',
    alt: 'Moon icon',
    className: 'w-[120px] sm:w-[160px] md:w-[210px] absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] hidden md:block',
    delay: 0.1,
    x: -80,
  },
  {
    src: '/p59.webp',
    alt: '3D object',
    className: 'w-[100px] sm:w-[140px] md:w-[180px] absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] hidden md:block',
    delay: 0.25,
    x: -80,
  },
  {
    src: '/lego.webp',
    alt: 'Lego icon',
    className: 'w-[120px] sm:w-[160px] md:w-[210px] absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] hidden md:block',
    delay: 0.15,
    x: 80,
  },
  {
    src: '/group134.webp',
    alt: '3D group',
    className: 'w-[130px] sm:w-[170px] md:w-[220px] absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] hidden md:block',
    delay: 0.3,
    x: 80,
  },
]

const aboutText =
  "With more than four years of experience in visual design and video editing, i care about the details that make a viewer stay: the first line, the pause before a point lands, the caption that does not fight the footage, the sound that hits at the right second. Not a generic content machine — let's build something unforgettable together!"

const stats = [
  { value: '04', label: 'Years Creating Visual Work' },
  { value: '12.8M', label: 'Organic Views on One Edit' },
  { value: 'DEL', label: 'New Delhi, Working Globally' },
]

export default function AboutSection() {
  return (
    <section
      id="about"
      className="min-h-0 sm:min-h-screen relative flex items-center justify-center px-4 sm:px-8 md:px-10 py-12 sm:py-20 md:py-28 overflow-hidden w-full"
      style={{ background: '#0C0C0C' }}
    >
      {/* Decorative 3D images (desktop only to prevent mobile clutter & horizontal scroll) */}
      {decorativeImages.map((img) => (
        <FadeIn key={img.alt} delay={img.delay} x={img.x} y={0} duration={0.9} className={img.className}>
          <img src={img.src} alt={img.alt} className="w-full" />
        </FadeIn>
      ))}

      {/* Content */}
      <div className="flex flex-col items-center max-w-4xl w-full z-10">
        <div className="flex flex-col items-center gap-6 sm:gap-10 md:gap-14">
          <FadeIn delay={0} y={40}>
            <div className="text-center">
              <span className="text-xs uppercase tracking-widest text-[#BBCCD7]/60 block mb-2 sm:mb-3">
                02 · From raw to ready
              </span>
              <h2
                className="hero-heading font-black uppercase leading-none tracking-tight text-center"
                style={{ fontSize: 'clamp(2.5rem, 10vw, 150px)' }}
              >
                About me
              </h2>
            </div>
          </FadeIn>

          <AnimatedText
            text={aboutText}
            className="text-center font-medium leading-relaxed max-w-[620px] px-2"
            style={{ color: '#D7E2EA', fontSize: 'clamp(0.95rem, 2vw, 1.35rem)' }}
          />

          {/* Stats from Roshan's portfolio */}
          <FadeIn delay={0.3} y={20} className="w-full">
            <div className="grid grid-cols-3 gap-2 sm:gap-6 pt-5 sm:pt-6 border-t border-white/10 max-w-2xl mx-auto text-center">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col items-center px-1">
                  <span className="text-xl sm:text-3xl md:text-4xl font-black text-[#BBCCD7]">{s.value}</span>
                  <span className="text-[10px] sm:text-xs md:text-sm text-[#D7E2EA]/70 uppercase tracking-wider mt-0.5 sm:mt-1 leading-tight">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        <div className="mt-8 sm:mt-14 md:mt-18">
          <ContactButton href="https://wa.me/919871167707" text="Contact Me" />
        </div>
      </div>
    </section>
  )
}
