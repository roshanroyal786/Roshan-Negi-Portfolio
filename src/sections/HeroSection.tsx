import { useState } from 'react'
import FadeIn from '../components/FadeIn'
import ContactButton from '../components/ContactButton'
import LivingPortrait from '../components/LivingPortrait'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Video Edits', href: '#videos' },
  { label: 'Graphic Design', href: '#graphics' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <section className="h-screen flex flex-col relative" style={{ overflowX: 'clip' }}>
      {/* Top Banner Tag */}
      <div className="absolute top-2 left-0 w-full text-center hidden md:block z-20 pointer-events-none">
        <span className="text-[11px] tracking-widest uppercase font-medium px-4 py-1 rounded-full bg-[#1A1A1A]/70 text-[#BBCCD7] border border-white/10">
          RN Graphic + Motion · Make it worth watching · Available*
        </span>
      </div>

      {/* Navbar */}
      <FadeIn delay={0} y={-20}>
        <nav className="flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8 relative z-20">
          {/* Clickable Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="text-xl md:text-2xl font-black uppercase tracking-wider text-[#D7E2EA] hover:opacity-70 transition-opacity duration-200 flex-shrink-0"
            style={{
              background: 'linear-gradient(123deg, #B600A8 20%, #7621B0 60%, #BE4C00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            RN
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm md:text-lg lg:text-[1.3rem] font-medium uppercase tracking-wider hover:opacity-70 transition-opacity duration-200"
                style={{ color: '#D7E2EA' }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden p-2 text-[#D7E2EA] hover:text-white transition-colors z-30"
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </nav>
      </FadeIn>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-[#D7E2EA] hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X size={32} />
          </button>
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-bold uppercase tracking-wider hover:opacity-70 transition-opacity duration-200"
                style={{ color: '#D7E2EA' }}
              >
                {item.label}
              </a>
            ))}
            <div className="mt-4">
              <ContactButton href="https://wa.me/919871167707" text="Contact Me" />
            </div>
          </nav>
        </div>
      )}

      {/* Hero Heading */}
      <FadeIn delay={0.15} y={40} className="overflow-hidden mt-6 sm:mt-4 md:-mt-5 relative z-0">
        <h1
          className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]"
        >
          Hi, i&apos;m roshan
        </h1>
      </FadeIn>

      {/* Hero Portrait: Interactive Living 3D Character (Facial Expressions, Eye Tracking & Movements) */}
      <FadeIn delay={0.6} y={30} className="contents">
        <LivingPortrait />
      </FadeIn>

      {/* Spacer to push bottom bar down */}
      <div className="flex-1" />

      {/* Bottom bar */}
      <div className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 relative z-20">
        <FadeIn delay={0.35} y={20}>
          <p
            className="font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[270px]"
            style={{ color: '#D7E2EA', fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            a 3d creator driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton href="https://wa.me/919871167707" text="Contact Me" className="contact-btn" />
        </FadeIn>
      </div>
    </section>
  )
}
