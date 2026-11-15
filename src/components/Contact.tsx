import { FormEvent, useState } from 'react'
import { profile } from '../data'

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined
const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
type F = { name: string; email: string; subject: string; message: string }
const rules: Record<keyof F, (v: string) => string> = {
  name: v => (v.trim().length < 2 ? 'Please enter your full name.' : ''),
  email: v => (!re.test(v.trim()) ? 'Please enter a valid email address.' : ''),
  subject: v => (v.trim().length < 3 ? 'Please enter a subject.' : ''),
  message: v => (v.trim().length < 10 ? 'Message should be at least 10 characters.' : '')
}
const labels: Record<keyof F, string> = { name: 'Full name', email: 'Email address', subject: 'Subject', message: 'Message' }

export default function Contact() {
  const [f, setF] = useState<F>({ name: '', email: '', subject: '', message: '' })
  const [err, setErr] = useState<Partial<Record<keyof F, string>>>({})
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null)
  const [hp, setHp] = useState('')
  const keys = Object.keys(rules) as (keyof F)[]
  const check = (k: keyof F) => setErr(e => ({ ...e, [k]: rules[k](f[k]) }))

  async function submit(e: FormEvent) {
    e.preventDefault(); setMsg(null)
    const errs: typeof err = {}; keys.forEach(k => { const m = rules[k](f[k]); if (m) errs[k] = m })
    setErr(errs); if (Object.keys(errs).length || hp) return
    if (!ENDPOINT) { setMsg({ ok: false, t: 'The contact form isn’t connected to an email service yet, so this message was NOT sent.' + (profile.email ? ` Please email ${profile.email} directly.` : '') }); return }
    setBusy(true)
    try {
      const r = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(f) })
      if (!r.ok) throw new Error(String(r.status))
      setMsg({ ok: true, t: 'Thanks! Your message has been sent.' }); setF({ name: '', email: '', subject: '', message: '' })
    } catch { setMsg({ ok: false, t: 'Something went wrong sending your message. Please try again later.' }) }
    finally { setBusy(false) }
  }
  return (
    <section id="contact"><div className="wrap">
      <span className="eyebrow">Contact</span><h2 className="rv">Let’s <span className="grad">connect</span></h2>
      <p className="sub rv">Have an opportunity or a question? Send me a message.</p>
      <div className="cg">
        <div className="glass card rv"><h3 style={{ marginBottom: 12 }}>Get in touch</h3><p>Open to internships, collaborations and learning opportunities.</p>
          <p>{profile.email ? <>Email: <a className="grad" href={`mailto:${profile.email}`}>{profile.email}</a></> : <span className="ph-t">[Add your email in src/data.ts]</span>}</p></div>
        <form className={'glass rv' + (busy ? ' loading' : '')} onSubmit={submit} noValidate>
          {keys.map(k => (
            <div key={k}><label htmlFor={k}>{labels[k]}</label>
              {k === 'message'
                ? <textarea id={k} rows={5} value={f[k]} aria-invalid={!!err[k]} onBlur={() => check(k)} onChange={e => setF({ ...f, [k]: e.target.value })} />
                : <input id={k} type={k === 'email' ? 'email' : 'text'} autoComplete={k === 'name' ? 'name' : k === 'email' ? 'email' : 'off'} value={f[k]} aria-invalid={!!err[k]} onBlur={() => check(k)} onChange={e => setF({ ...f, [k]: e.target.value })} />}
              <span className="err">{err[k]}</span></div>))}
          <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={hp} onChange={e => setHp(e.target.value)} style={{ position: 'absolute', left: -9999 }} />
          <button className="btn p" type="submit" disabled={busy}><span className="spin" />{busy ? 'Sending…' : 'Send Message'}</button>
          {msg && <div role="status" className={'toast ' + (msg.ok ? 'ok' : 'bad')}>{msg.t}</div>}
        </form>
      </div>
    </div></section>
  )
}
