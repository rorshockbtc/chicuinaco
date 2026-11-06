# Chicuinaco — Hacienda, Restaurante & Eco-Estate (`chicuinaco.com`)

Pure static Vite + React + TypeScript single-page application for **Chicuinaco** in Teotepeque, La Libertad, El Salvador (`13.59525, -89.51903` • `+503 6446-2404`).

- **Zero Backend / Database Dependencies**: Deploys as a static `dist/` bundle to Vercel or Cloudflare Pages/Workers with zero recurring hosting costs.
- **Quad-Lingual (`EN`, `ES`, `FR`, `DE`)**: All copy lives in `client/src/lib/translations.ts`.
- **Enhanced WebP Photography**: Raw photos in `attached_assets/` are graded and compressed via `npm run enhance:photos` (`scripts/enhance-photos.mjs`) into `attached_assets/enhanced/*.webp` (~79% smaller payload).

---

## Local Development

```bash
npm install
npm run dev        # Starts Vite dev server at http://localhost:5173
npm run check      # Runs TypeScript typecheck
npm run build      # Builds static production bundle into dist/
npm run preview    # Previews production bundle at http://localhost:4173
```

---

## Option 1: Deploy & Hand Off on Vercel (Recommended — Easiest Handoff)

`vercel.json` is pre-configured with Vite static output (`dist/`), immutable asset caching headers, and SPA routing.

### A. Instant CLI Deploy
```bash
npm run deploy:vercel
# or:
vercel --prod
```

### B. Client Handoff Workflow on Vercel
1. **Deploy under your account or push to GitHub**:
   - Run `vercel --prod` to create the live production deployment immediately, or import the GitHub repository into Vercel (`Framework Preset: Vite`, `Output Directory: dist`).
2. **Add Custom Domain (`chicuinaco.com`)**:
   - In Vercel → **Project Settings → Domains**, add `chicuinaco.com` and `www.chicuinaco.com`.
   - Point the domain registrar's DNS records to Vercel:
     - `A` record for `@` → `76.76.21.21`
     - `CNAME` record for `www` → `cname.vercel-dns.com`
3. **Transfer Ownership to Client (When Ready)**:
   - Have the client create a free Vercel Hobby account (`vercel.com/signup`), then in **Project Settings → General → Transfer**, transfer the project directly to their account (or invite them to the GitHub repo).

---

## Option 2: Deploy on Cloudflare Workers / Pages

`wrangler.jsonc` is pre-configured for Cloudflare Static Assets (`./dist`).

```bash
npm run deploy:cloudflare
# or:
npx wrangler deploy
```

To attach `chicuinaco.com` on Cloudflare, open the Cloudflare Dashboard → **Workers & Pages → chicuinaco → Settings → Domains & Routes → Add Custom Domain**.
