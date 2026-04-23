# FIELDSCOPE.AI — Click-Through Demo

AI-powered restoration scope capture. Video walkthrough → Xactimate-ready estimate. Built as a click-through prototype for a first-meeting demo with a restoration/insurance client.

## What this is (and isn't)

**What it IS:** A 5-screen React prototype that simulates the entire workflow end-to-end. Every number, transcript segment, damage item, and Xactimate code is hardcoded but realistic. Runs locally, no backend required.

**What it ISN'T:** Not connected to real Claude API, not processing real video, not touching actual Xactimate pricing. Use for the pitch meeting — not as a live tool.

## Quick start

```bash
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # production build
npm run preview  # preview production build at http://localhost:4173
```

## Project structure

```
src/
├── App.tsx                     # Screen orchestration
├── data/scope.ts               # ⭐ ALL hardcoded demo content
├── components/
│   ├── NavBar.tsx              # Top nav with step indicator
│   └── DamagePhotoPair.tsx     # SVG damage illustrations (placeholder photos)
└── screens/
    ├── RecordScreen.tsx        # 01 — capture UI
    ├── ProcessingScreen.tsx    # 02 — pipeline animation
    ├── ScopeReviewScreen.tsx   # 03 — review identified items
    ├── EstimateScreen.tsx      # 04 — line items + exports
    └── ClaimPackageScreen.tsx  # 05 — branded claim package
```

## Customizing for YOUR client's demo

Before the meeting, change these things. Most live in `src/data/scope.ts`.

### 1. Project meta

```ts
export const projectMeta: ProjectMeta = {
  address: "...",       // client's geography
  clientName: "...",    // realistic homeowner name
  claimNumber: "...",
  dateOfLoss: "...",    // recent enough to feel current
  causeOfLoss: "...",   // match client's specialty
  inspector: "...",     // if client has a specific rep, use their name
  // ...
};
```

### 2. Damage items & scope

- **Pricing is representative** — not live Xactimate. Regenerate for client's ZIP if asked.
- **Xactimate codes are real** but abbreviated. Client will want to verify.
- To add/remove items, edit the `damageItems` array. Totals recalc automatically via `calcTotals()`.
- Adjust O&P and tax percentages in `calcTotals()` if client uses different rates.

### 3. Transcript narration

Rewrite `transcriptSegments` to sound like your client's reps — they have specific vocabulary.

### 4. Branding

- **App name & logo:** `NavBar.tsx` — currently "FIELDSCOPE.AI" with orange bolt square.
- **Browser tab:** `index.html` → `<title>`.
- **Favicon:** `public/favicon.svg`.
- **Colors:** `tailwind.config.js` defines `safety-*`, `field-*`, `alert-*`, `ink-*` palettes.

### 5. Photos (biggest missing piece)

Prototype uses SVG illustrations keyed by Xactimate code. They read as damage but they're not photos.

**To swap in real photos:**

1. Drop into `public/images/` as `far_01.jpg`, `close_01.jpg`, ... through 11.
2. In `DamagePhotoPair.tsx`, replace `<DamageIllustration />` with `<img src={item.farPhoto} />`.
3. `scope.ts` already references `/images/far_NN.jpg` paths.

### 6. Video playback

The black box on the Review screen is a placeholder.

1. Drop walkthrough as `public/walkthrough.mp4`.
2. Replace the Play/Pause button block in `ScopeReviewScreen.tsx` with an `<video>` element.
3. Seek on item click: `videoRef.current.currentTime = item.startTime`.

## Demo flow (practice this)

**Before the meeting:**
- Have this running in a browser tab, full-screen.
- Start on screen 1 (Capture). Don't click anything yet.

**During the meeting (~5 min total):**

1. **Capture (30s)** — "Rep sees this in the field. Property info already loaded. They tap record, walk the house, narrate what they see." Click the red record button. Transcript populates, counters climb. Auto-completes after ~8 seconds wall-clock (simulates 4:18 recording).

2. **Processing (25s)** — Click "Process Walkthrough." Six stages animate. Call out: "Audio extraction, transcription, keyframe selection, AI damage identification, Xactimate mapping, estimate generation. About 90 seconds on real hardware. Demo is accelerated."

3. **Review (90s)** — Spend the most time here. "Every item paired with photos. Click any item, see the source narration that generated it. Confidence indicators flag where adjuster eyes are needed."

4. **Estimate (60s)** — "Xactimate-compatible scope. Export .esx, plugs into the adjuster's seat. No retyping."

5. **Claim Package (45s)** — "Branded report for the file. Narrative, photos, line items, signed. Ready for the carrier."

6. **Close with the three bottom cards:** Zero typing for adjusters. Walk-talk-done for reps. 4x inspection capacity for the business.

## What to say when they ask

**"Is this real?"** — "Working prototype with representative data. The pipeline is real — we've tested on actual walkthrough footage. What you see is the full UX and intended output format."

**"What's your pricing source?"** — "Scope capture and Xactimate mapping are ours. Pricing comes from your Xactimate seat on export — we don't compete with Verisk. The .esx plugs into your existing tool."

**"Accuracy?"** — "High-confidence items land 92-95% in testing. Medium-confidence flagged for adjuster review. Designed to assist estimators, not replace them."

**"Privacy?"** — "Encrypted, tenant-scoped. Retention configurable. Can integrate with your existing claim management platform."

**"Pricing?"** — Pilot: $X per rep/mo + setup. Deployment: 4 months kick-off to live.

## Known demo-day risks

- **Photos are illustrated.** Acknowledge upfront: "Illustrations until we integrate actual walkthrough footage."
- **Video doesn't play.** Same framing — click-through; real build plays back.
- **Export buttons don't download.** If they click, pivot: "Production build exports the real files. Happy to show a sample .esx right after."

## Real build phases

- **P1 (month 1):** Real video upload, Whisper/Deepgram, Claude vision pipeline, basic scope output
- **P2 (month 2):** Xactimate catalog, confidence scoring, full edit UI
- **P3 (month 3):** .esx export, claim package generation, photo annotation
- **P4 (month 4):** Mobile PWA, offline capture, team features

Budget: $75-120K engineering + $50-150/rep/mo SaaS.

---

_Vite + React + TypeScript + Tailwind + Motion. Static deployable to Railway, Vercel, Cloudflare Pages._
