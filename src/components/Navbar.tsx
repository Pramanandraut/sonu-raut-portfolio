
import { useEffect, useState } from 'react'
import { NAV, profile } from '../data'
import { useActive, useResume } from '../hooks'

const ids = NAV.map(n => n.toLowerCase())

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [sc, setSc] = useState(false)

  const active = useActive(ids)
  const hasResume = useResume()

  useEffect(() => {
    const handleScroll = () => {
      setSc(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav className={sc ? 'sc' : ''}>
      <div className="wrap nb">

        <a href="#home" className="logo">
          <span className="grad">PRAMANAND</span> RAUT
        </a>

        <button
          className="burger"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(prev => !prev)}
        >
          ☰
        </button>

        <div
          className={'links' + (open ? ' open' : '')}
          onClick={() => setOpen(false)}
        >
          {NAV.map(n => (
            <a
              key={n}
              className={
                'l' + (active === n.toLowerCase() ? ' on' : '')
              }
              href={`#${n.toLowerCase()}`}
            >
              {n}
            </a>
          ))}

          {hasResume ? (
            <a
              className="btn p s"
              href={profile.resume}
              download={profile.resumeFilename}
            >
              Resume ↓
            </a>
          ) : (
            <a
              className="btn p s"
              href="#"
              onClick={e => {
                e.preventDefault()
                alert(
                  'Resume not added yet. Place your PDF at public/Sonu_Raut_Resume.pdf'
                )
              }}
            >
              Resume ↓
            </a>
          )}
        </div>
      </div>
    </nav>
  )
}


