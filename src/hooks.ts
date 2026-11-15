import { useEffect, useState } from 'react'
import { profile } from './data'

export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target) } }), { threshold: 0.12 })
    document.querySelectorAll('.rv').forEach(e => io.observe(e))
    return () => io.disconnect()
  }, [])
}
export function useActive(ids: string[]) {
  const [a, setA] = useState(ids[0])
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) setA(x.target.id) }), { rootMargin: '-45% 0px -50% 0px' })
    ids.forEach(i => { const el = document.getElementById(i); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [ids])
  return a
}
export function useTyping(words: string[]) {
  const [txt, setTxt] = useState('')
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setTxt(words[0]); return }
    let i = 0, j = 0, del = false, t: number
    const tick = () => {
      const s = words[i]; setTxt(s.slice(0, j))
      if (!del && j === s.length) { del = true; t = window.setTimeout(tick, 1400); return }
      if (del && j === 0) { del = false; i = (i + 1) % words.length }
      j += del ? -1 : 1; t = window.setTimeout(tick, del ? 35 : 70)
    }
    tick(); return () => clearTimeout(t)
  }, [words])
  return txt
}
/** True only if a real PDF exists at profile.resume (dev servers return index.html for missing files). */
export function useResume(): void {
  const [ok, setOk] = useState(false)
 
}
