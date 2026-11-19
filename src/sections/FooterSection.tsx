import FadeIn from '../components/FadeIn'
import ContactButton from '../components/ContactButton'
import { ArrowUpRight, Mail, Phone, Instagram, Linkedin, FileText, Video } from 'lucide-react'

const socialLinks = [
  { label: 'Instagram', handle: '@rotion.aep', href: 'https://www.instagram.com/rotion.aep', icon: Instagram },
  { label: 'LinkedIn', handle: '/in/roshannegi', href: 'https://www.linkedin.com/in/roshannegi/', icon: Linkedin },
  { label: 'Video Edits', handle: 'Notion Library', href: 'https://app.notion.com/p/VIDEO-EDITS-28b918f2cb12801b906bf4caff4b2dd7', icon: Video },
  { label: 'Graphic Works', handle: 'Notion Portfolio', href: 'https://app.notion.com/p/28b918f2cb12804db033eff72b8c8afa', icon: FileText },
  { label: 'Reel Library', handle: 'Google Drive', href: 'https://drive.google.com/drive/folders/1khmpPfGTWaPKIJTyOWALNQRYGfpoB1Bi', icon: ArrowUpRight },
]

export default function FooterSection() {
  return (
    <footer
      id="contact"
      className="relative z-20 px-6 sm:px-10 py-20 sm:py-28 md:py-36 border-t border-white/10"
      style={{ background: '#0C0C0C' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <FadeIn delay={0} y={30}>
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[#BBCCD7]/60 block mb-3 font-medium">
            Available for select projects
          </span>
          <h2
            className="hero-heading font-black uppercase tracking-tight leading-tight mb-6"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)' }}
          >
            Ready to make the next frame count?
          </h2>
          <p className="text-base sm:text-lg text-[#D7E2EA]/70 max-w-2xl font-light leading-relaxed mb-10 mx-auto">
            Bring the raw clip, rough idea, or visual brief. I&apos;ll help turn it into work that feels clear, considered, and worth watching.
          </p>
        </FadeIn>

        {/* Action Buttons */}
        <FadeIn delay={0.2} y={20} className="flex flex-wrap justify-center gap-4 mb-16">
          <ContactButton href="https://wa.me/919871167707" text="Start a conversation" />
          <a
            href="mailto:roshanroyal786@gmail.com"
            className="rounded-full border-2 border-[#D7E2EA] px-8 py-3 sm:px-10 sm:py-3.5 text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest cursor-pointer hover:bg-[#D7E2EA]/10 transition-colors duration-200 text-[#D7E2EA] flex items-center gap-2"
          >
            <Mail size={16} />
            roshanroyal786@gmail.com
          </a>
          <a
            href="tel:+919871167707"
            className="rounded-full border-2 border-[#D7E2EA] px-8 py-3 sm:px-10 sm:py-3.5 text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest cursor-pointer hover:bg-[#D7E2EA]/10 transition-colors duration-200 text-[#D7E2EA] flex items-center gap-2"
          >
            <Phone size={16} />
            +91 9871167707
          </a>
        </FadeIn>

        {/* Portfolio & Socials Grid */}
        <FadeIn delay={0.3} y={20} className="w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 pt-10 border-t border-white/10 text-left">
            {socialLinks.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 transition-all duration-200 group flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3 text-[#BBCCD7]/60 group-hover:text-white">
                    <Icon size={18} />
                    <ArrowUpRight size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-[#BBCCD7] font-semibold">
                      {item.label}
                    </span>
                    <span className="block text-[11px] text-[#BBCCD7]/50 truncate mt-0.5">
                      {item.handle}
                    </span>
                  </div>
                </a>
              )
            })}
          </div>
        </FadeIn>

        {/* Footer bottom bar */}
        <div className="w-full mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#BBCCD7]/50 gap-4">
          <div className="flex items-center gap-2">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="font-semibold uppercase tracking-wider text-[#BBCCD7] hover:text-white transition-colors cursor-pointer"
            >
              Roshan Negi
            </a>
            <span>· Graphic Designer &amp; Video Editor · New Delhi, India</span>
          </div>
          <div>© {new Date().getFullYear()} Roshan Negi · All rights reserved</div>
        </div>
      </div>
    </footer>
  )
}
