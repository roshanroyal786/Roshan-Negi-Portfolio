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
    <section className="h-[100dvh] min-h-[580px] flex flex-col relative w-full overflow-hidden">
      {/* Top Banner Tag */}
      <div className="absolute top-2 left-0 w-full text-center hidden md:block z-20 pointer-events-none">
        <span className="text-[11px] tracking-widest uppercase font-medium px-4 py-1 rounded-full bg-[#1A1A1A]/70 text-[#BBCCD7] border border-white/10">
          RN Graphic + Motion · Make it worth watching · Available*
        </span>
      </div>

      {/* Navbar */}
      <FadeIn delay={0} y={-20}>
        <nav className="flex items-center justify-between px-5 sm:px-8 md:px-10 pt-5 sm:pt-6 md:pt-8 relative z-20">
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
            <Menu size={26} />
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
      <FadeIn delay={0.15} y={40} className="w-full text-center mt-3 sm:mt-4 md:-mt-2 relative z-0 px-4">
        <h1
          className="hero-heading font-black uppercase tracking-tight leading-none text-center mx-auto text-[10vw] sm:text-[9.5vw] md:text-[9vw]"
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
      <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-3 sm:gap-4 pb-6 sm:pb-8 md:pb-10 px-5 sm:px-8 md:px-10 relative z-20 text-center sm:text-left">
        <FadeIn delay={0.35} y={20}>
          <p
            className="font-light uppercase tracking-wide leading-snug max-w-[320px] sm:max-w-[300px] md:max-w-[360px] mx-auto sm:mx-0 text-xs sm:text-sm md:text-base"
            style={{ color: '#D7E2EA' }}
          >
            Graphic designer &amp; video editor crafting high-retention visual stories, kinetic motion &amp; bold designs
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton href="https://wa.me/919871167707" text="Contact Me" className="contact-btn" />
        </FadeIn>
      </div>
    </section>
  )
}
