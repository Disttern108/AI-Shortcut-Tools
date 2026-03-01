import { useEffect, useRef, useState } from 'react'

const FALLBACK_TIMEOUT_MS = 1200

export function useRevealOnScroll<T extends HTMLElement = HTMLElement>(threshold = 0.1) {
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold }
    )

    observer.observe(element)
    const fallbackId = setTimeout(() => setIsVisible(true), FALLBACK_TIMEOUT_MS)

    return () => {
      observer.disconnect()
      clearTimeout(fallbackId)
    }
  }, [threshold])

  return { ref, isVisible }
}
