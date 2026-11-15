# Pramanand Raut: Portfolio (React + TypeScript + Tailwind + Vite)

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs /dist
```
Requires Node.js 18+.

## Make it yours
- **All text content:** `src/data.ts` (education, achievements, projects, skills, social links, email). Bracketed text = placeholder.
- **Photo:** save as `public/profile.jpg` (a placeholder shows until it exists).
- **Resume:** save as `public/Sonu_Raut_Resume.pdf`. The Resume button works only once the file exists.
- **Project images:** add an `img` path to a project in `src/data.ts`.

## Contact form (needs setup before it works)
The form validates input and shows loading/success/error states, but it will say "not sent" until you connect a service:
1. Create a free form at Formspree or Web3Forms and copy its **public** endpoint URL.
2. Copy `.env.example` to `.env` and set `VITE_CONTACT_ENDPOINT=<that URL>`.
3. Rebuild/redeploy, then send a test message and confirm it reaches your inbox.
Never put secret API keys in `VITE_` variables; they are public in the built site.

## Deploy
- **Netlify / Vercel / Cloudflare Pages:** import the Git repo, build command `npm run build`, output directory `dist`. Add `VITE_CONTACT_ENDPOINT` in the host's environment settings.
- **GitHub Pages:** push the `dist` output (set `base: '/<repo>/'` in `vite.config.ts` if using a project page).
