import { useState } from 'react'
import { profile, social, socialHref } from '../data'
import { useTyping } from '../hooks'

export function SocialIcons() {
  return <div className="soc">{social.map(s => { const h = socialHref(s); return (
    <a key={s.n} className="ic" href={h || '#'} aria-label={s.n} title={s.n}
      {...(h ? { target: '_blank', rel: 'noopener noreferrer' } : { onClick: (e: React.MouseEvent) => { e.preventDefault(); alert('Placeholder link. Add your URL in src/data.ts') } })}>{s.i}</a>) })}</div>
}
export default function Hero() {
  const typed = useTyping(profile.typing)
  const [bad, setBad] = useState(false)
  return (
    <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 120 }}>
      <div className="wrap hg">
        <div>
          <span className="eyebrow">Hello, I’m</span>
          <h1><span className="grad">PRAMANAND RAUT</span></h1>
          <p className="head">Computer Science Engineering Student &amp; Aspiring Software Engineer.</p>
          <div className="typed" aria-hidden="true">{typed}</div>
          <p className="intro">B.Tech CSE student at SRM Institute of Science and Technology, Tiruchirappalli. I enjoy building software, solving problems and learning emerging technologies.</p>
          <div className="cta"><a className="btn p" href="#projects">Explore My Work →</a><a className="btn" href="#contact">Contact Me</a></div>
          <SocialIcons />
        </div>
        <div className="photo"><div className="pf">
          {bad ? <div className="ph"><b>SR</b>Add your photo at<br />public/profile.jpg</div>
               : <img src={profile.photo} alt="Portrait of Sonu Raut" fetchPriority="high" onError={() => setBad(true)} />}
        </div></div>
      </div>
    </section>
  )
}
