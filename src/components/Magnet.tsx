import { ReactNode, useRef, useState, useCallback, useEffect } from 'react'

interface MagnetProps {
  children: ReactNode
  padding?: number
  strength?: number
  activeTransition?: string
  inactiveTransition?: string
  className?: string
  tilt3D?: boolean
}

export default function Magnet({
  children,
  padding = 100,
  strength = 2,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
  tilt3D = false,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)
  const [transform, setTransform] = useState('perspective(1000px) translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)')

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distX = e.clientX - centerX
      const distY = e.clientY - centerY
      const dist = Math.sqrt(distX * distX + distY * distY)
      const threshold = Math.max(rect.width, rect.height) / 2 + padding

      if (dist < threshold) {
        setIsActive(true)
        if (tilt3D) {
          const rotY = Math.max(-12, Math.min(12, (distX / (rect.width / 2)) * 10))
          const rotX = Math.max(-10, Math.min(10, (-distY / (rect.height / 2)) * 8))
          setTransform(`perspective(1000px) translate3d(${distX / strength}px, ${distY / strength}px, 0) rotateY(${rotY}deg) rotateX(${rotX}deg)`)
        } else {
          setTransform(`translate3d(${distX / strength}px, ${distY / strength}px, 0)`)
        }
      } else {
        setIsActive(false)
        setTransform(tilt3D ? 'perspective(1000px) translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)' : 'translate3d(0, 0, 0)')
      }
    },
    [padding, strength, tilt3D]
  )

  const handleMouseLeave = useCallback(() => {
    setIsActive(false)
    setTransform(tilt3D ? 'perspective(1000px) translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)' : 'translate3d(0, 0, 0)')
  }, [tilt3D])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseLeave])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform,
        transition: isActive ? activeTransition : inactiveTransition,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}
