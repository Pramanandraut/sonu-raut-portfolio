import { ReactNode, useRef, useState } from 'react'
import { profile, education, achievements, projects, skills, social, socialHref, Project } from '../data'

function Section({ id, eyebrow, title, sub, children }: { id: string; eyebrow: string; title: ReactNode; sub: string; children: ReactNode }) {
  return (
    <section id={id}><div className="wrap">
      <span className="eyebrow">{eyebrow}</span><h2 className="rv">{title}</h2><p className="sub rv">{sub}</p>{children}
    </div></section>
  )
}
const G = ({ children }: { children: ReactNode }) => <span className="grad">{children}</span>

export const About = () => (
  <Section id="about" eyebrow="About" title={<>Who I <G>am</G></>} sub="">
    <div className="ag">
      <div className="glass card rv">{profile.about.map((p, i) => <p key={i}>{p}</p>)}</div>
      <div className="glass card rv"><h3 style={{ marginBottom: 14 }}>Interests</h3><div className="tags">{profile.interests.map(x => <span className="tag" key={x}>{x}</span>)}</div></div>
    </div>
  </Section>
)
export const Education = () => (
  <Section id="education" eyebrow="Education" title={<>Academic <G>journey</G></>} sub="">
    <div className="tl">{education.map(e => <div className="glass card ti rv" key={e.t}><h3>{e.t}</h3><div className="meta">{e.o}</div><p>{e.y}</p><p>{e.d}</p></div>)}</div>
  </Section>
)
export const Achievements = () => (
  <Section id="achievements" eyebrow="Achievements" title={<>Achievements &amp; <G>certifications</G></>} sub="">
    <div className="grid">{achievements.map(a => <div className="glass card ach rv" key={a.t}><div className="k">{a.k}</div><h3>{a.t}</h3><p className="ph-t">{a.d}</p></div>)}</div>
  </Section>
)
const Link = ({ href, children }: { href: string; children: ReactNode }) =>
  href ? <a className="btn s" href={href} target="_blank" rel="noopener noreferrer">{children}</a>
       : <a className="btn s" href="#" onClick={e => { e.preventDefault(); alert('Placeholder link. Add the URL in src/data.ts') }}>{children}</a>

export function Projects() {
  const cats = ['All', ...Array.from(new Set(projects.map(p => p.c)))]
  const [cat, setCat] = useState('All')
  const [sel, setSel] = useState<Project | null>(null)
  const dlg = useRef<HTMLDialogElement>(null)
  const open = (p: Project) => { setSel(p); dlg.current?.showModal() }
  return (
    <Section id="projects" eyebrow="Projects" title={<>Project <G>showcase</G></>} sub="">
      <div className="filters">{cats.map(c => <button key={c} className={'fb' + (cat === c ? ' on' : '')} aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>)}</div>
      <div className="grid">{projects.filter(p => cat === 'All' || p.c === cat).map(p => (
        <article className="glass pc" key={p.t}>
          <div className="th">{p.img ? <img src={p.img} alt={p.t} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span className="grad" aria-hidden="true">{p.t.split(' ').map(w => w[0]).join('').slice(0, 3)}</span>}</div>
          <div className="pb"><h3>{p.t}</h3><p>{p.d}</p><div className="tags">{p.tech.map(t => <span className="tag" key={t}>{t}</span>)}</div>
            <div className="pa"><Link href={p.gh}>GitHub</Link><Link href={p.live}>Live Demo</Link><button className="btn s" onClick={() => open(p)}>Details</button></div></div>
        </article>))}</div>
      <dialog ref={dlg} onClick={e => { if (e.target === dlg.current) dlg.current?.close() }}>
        <h3>{sel?.t}</h3><p style={{ color: 'var(--muted)' }}>{sel?.more}</p>
        <div className="tags" style={{ marginBottom: 20 }}>{sel?.tech.map(t => <span className="tag" key={t}>{t}</span>)}</div>
        <button className="btn" onClick={() => dlg.current?.close()}>Close</button>
      </dialog>
    </Section>
  )
}
export const Skills = () => (
  <Section id="skills" eyebrow="Skills" title={<>Technical <G>skills</G></>} sub="">
    <div className="grid">{Object.entries(skills).map(([k, v]) => <div className="glass card sk rv" key={k}><h3>{k}</h3><div className="tags">{v.map((x, i) => <span className="tag" key={i}>{x}</span>)}</div></div>)}</div>
  </Section>
)
export const Platforms = () => (
  <Section id="platforms" eyebrow="Public platforms" title={<>Find me <G>online</G></>} sub="">
    <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))' }}>{social.map(s => { const h = socialHref(s); return (
      <a key={s.n} className="glass plat rv" href={h || '#'} {...(h ? { target: '_blank', rel: 'noopener noreferrer' } : { onClick: (e: React.MouseEvent) => { e.preventDefault(); alert('Placeholder link. Add your URL in src/data.ts') } })}>
        <span className="ic">{s.i}</span><span><b>{s.n}</b><small>{h ? 'Visit profile' : '[Add your link]'}</small></span></a>) })}</div>
  </Section>
)
