import { useEffect, useState } from 'react'
import { NAV } from '../data'
import { SocialIcons } from './Hero'

export default function Footer() {
  const [show, setShow] = useState(false)
  useEffect(() => { const f = () => setShow(scrollY > 600); addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f) }, [])
  return (
    <footer><div className="wrap">
      <div className="logo"><span className="grad">PRAMANAND</span> RAUT</div>
      <div>Computer Science Engineering Student | Aspiring Software Engineer</div>
      <div className="fl">{NAV.map(n => <a key={n} href={`#${n.toLowerCase()}`}>{n}</a>)}</div>
      <div style={{ display: 'flex', justifyContent: 'center' }}><SocialIcons /></div>
      <p style={{ marginTop: 22 }}>© {new Date().getFullYear()} Pramanand Raut. All rights reserved.</p>
    </div>
    <button id="top" className={show ? 'show' : ''} aria-label="Back to top" onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}>↑</button></footer>
  )
}
