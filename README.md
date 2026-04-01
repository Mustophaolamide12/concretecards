# Concrete Cards — Identity Generator v5.0

Generate personalised Concrete community identity cards with metallic trading-card styling,
reveal animation, tier serial numbers, and one-click PNG download.

---

## ⚡ Two ways to run

### Option A — Open directly (no install needed)
Just open `public/index-standalone.html` in any browser. That's it.

### Option B — Run as Next.js app
```bash
cd concrete-cards
npm install
npm run dev
# → open http://localhost:3000
```
The Next.js app serves the same standalone HTML via an iframe, so the experience is identical.

---

## 🚀 Deploy to Vercel

1. Push to GitHub
2. Import repo at vercel.com
3. Deploy — no environment variables needed for the base card generator
4. Optional: add `RAPIDAPI_KEY` in Vercel settings to enable X profile auto-fetch

---

## 🐙 Push to GitHub

```bash
git init
git add .
git commit -m "Concrete Cards v5.0"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/concrete-cards.git
git push -u origin main
```

---

## 🎨 Features

- **Metallic trading card design** — holographic gradients, noise texture, inset shadows
- **13 roles** with unique color palettes per tier
- **Tier serial numbers** — MOD-0001, IC-0042, SOV-0003 etc (per-tier counters)
- **Card reveal page** — fade-in animation + metallic glow sweep + sound effect
- **Rank # input** — shows in the rank circle on the card
- **Social icon picker** — X or Discord
- **Avatar with blurred background** — full image always visible, no cropping
- **Rainbow gradient username** — animated
- **Download PNG** — pixel-perfect 3× export
- **Share on X** — auto-downloads card + opens pre-filled tweet

---

## 🗂 Project Structure

```
concrete-cards/
├── public/
│   └── index-standalone.html   ← THE ENTIRE APP (open this directly)
├── app/
│   ├── page.tsx                ← Serves standalone HTML via iframe
│   ├── layout.tsx
│   └── globals.css
├── next.config.js
└── package.json
```

The canonical source of truth is `public/index-standalone.html`.
All card logic, styles, animations, and export code live there.
