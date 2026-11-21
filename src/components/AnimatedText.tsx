import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, CSSProperties } from 'react'

interface AnimatedTextProps {
  text: string
  className?: string
  style?: CSSProperties
}

export default function AnimatedText({ text, className = '', style = {} }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.35'],
  })

  const characters = text.split('')

  return (
    <p ref={ref} className={`relative ${className}`} style={style}>
      {characters.map((char, i) => (
        <Character key={i} char={char} index={i} total={characters.length} progress={scrollYProgress} />
      ))}
    </p>
  )
}

function Character({
  char,
  index,
  total,
  progress,
}: {
  char: string
  index: number
  total: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const start = index / total
  const end = (index + 1) / total
  const opacity = useTransform(progress, [start, end], [0.35, 1])

  return (
    <span className="relative inline-block">
      <span className="invisible">{char === ' ' ? '\u00A0' : char}</span>
      <motion.span
        style={{ opacity }}
        className="absolute left-0 top-0"
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    </span>
  )
}
