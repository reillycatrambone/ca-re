'use client'

import { useEffect } from 'react'
import { subscribeToAnchorReveal } from '@/lib/in-page-navigation'

export function useLabAnchor(prefix: string, count: number, select: (index: number) => void) {
  useEffect(() => {
    let frame = 0
    const reveal = (hash: string) => {
      const start = `#${prefix}-`
      if (!hash.startsWith(start)) return
      const suffix = hash.slice(start.length)
      if (!/^\d+$/.test(suffix)) return
      const index = Number(suffix) - 1
      if (index < 0 || index >= count) return
      select(index)
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() =>
        document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' })
      )
    }
    const unsubscribe = subscribeToAnchorReveal(reveal)
    return () => {
      cancelAnimationFrame(frame)
      unsubscribe()
    }
  }, [prefix, count, select])
}
