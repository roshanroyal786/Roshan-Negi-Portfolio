interface LiveProjectButtonProps {
  href?: string
  text?: string
  className?: string
}

export default function LiveProjectButton({
  href = '#',
  text = 'Live Project',
  className = '',
}: LiveProjectButtonProps) {
  return (
    <a
      href={href}
      target={href !== '#' ? '_blank' : undefined}
      rel={href !== '#' ? 'noopener noreferrer' : undefined}
      className={`inline-block rounded-full border-2 border-[#D7E2EA] px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base font-medium uppercase tracking-widest cursor-pointer hover:bg-[#D7E2EA]/10 transition-colors duration-200 text-center ${className}`}
      style={{ color: '#D7E2EA' }}
    >
      {text}
    </a>
  )
}
