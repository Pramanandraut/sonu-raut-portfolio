
import { useEffect, useState } from 'react'
import { profile } from './data'

export function useReveal(): void {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    document.querySelectorAll('.rv').forEach(element => {
      io.observe(element)
    })

    return () => io.disconnect()
  }, [])
}

export function useActive(ids: string[]): string {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )

    ids.forEach(id => {
      const element = document.getElementById(id)
      if (element) io.observe(element)
    })

    return () => io.disconnect()
  }, [ids])

  return active
}

export function useTyping(words: string[]): string {
  const [text, setText] = useState('')

  useEffect(() => {
    if (!words.length) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(words[0])
      return
    }

    let i = 0
    let j = 0
    let deleting = false
    let timer: number

    const tick = () => {
      const currentWord = words[i]
      setText(currentWord.slice(0, j))

      if (!deleting && j === currentWord.length) {
        deleting = true
        timer = window.setTimeout(tick, 1400)
        return
      }

      if (deleting && j === 0) {
        deleting = false
        i = (i + 1) % words.length
      }

      j += deleting ? -1 : 1
      timer = window.setTimeout(tick, deleting ? 35 : 70)
    }

    tick()

    return () => window.clearTimeout(timer)
  }, [words])

  return text
}

/** Checks whether a valid PDF resume exists. */
export function useResume(): boolean {
  const [ok, setOk] = useState(false)

  useEffect(() => {
    if (!profile.resume) {
      setOk(false)
      return
    }

    const controller = new AbortController()

    const checkResume = async () => {
      try {
        const response = await fetch(profile.resume, {
          method: 'HEAD',
          signal: controller.signal,
          cache: 'no-store'
        })

        const contentType =
          response.headers.get('content-type') || ''

        setOk(
          response.ok &&
          contentType.toLowerCase().includes('application/pdf')
        )
      } catch {
        if (!controller.signal.aborted) {
          setOk(false)
        }
      }
    }

    void checkResume()

    return () => controller.abort()
  }, [])

  return ok
}

