# Pon Sivakumar Visual Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tune the existing website and investor package to the approved institutional navy, white, warm grey, and gold design specification.

**Architecture:** This is a presentation-layer refinement of the current Next.js app. The main page structure remains in `app/page.tsx`, global styling remains in `app/globals.css`, navigation/footer markup remains in `components/site-chrome.tsx`, and the static memorandum remains in `public/investor-package.html`.

**Tech Stack:** Next.js App Router, TypeScript, embedded CSS, static HTML, existing Vercel deployment.

---

### Task 1: Document Approved Design

**Files:**
- Create: `docs/superpowers/specs/2026-05-27-visual-refinement-design.md`
- Create: `docs/superpowers/plans/2026-05-27-visual-refinement.md`

- [ ] **Step 1: Save the approved design**

Create the design spec describing the main website and investor package visual changes.

- [ ] **Step 2: Save this implementation plan**

Create the implementation plan with exact target files and verification commands.

### Task 2: Refine Main Website Styling

**Files:**
- Modify: `app/globals.css`
- Modify: `components/site-chrome.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Update global color values**

Set navy to `#0d1b2e`, gold to `#c9a84c`, warm grey to `#f4f3f0`, cream to `#f7f6f4`, and keep white as `#ffffff`.

- [ ] **Step 2: Make the navbar white from page load**

Update `.site-header`, `.brand__name`, `.site-nav`, and mobile toggle styles so the fixed navbar starts white with dark navy text and gains only a subtle shadow when scrolled.

- [ ] **Step 3: Tune buttons and CTAs**

Keep all primary buttons as gold pill buttons with dark navy uppercase text. Set the hero outline button to a white border and white text. Make `.solution-card .button` full width.

- [ ] **Step 4: Tighten card and section geometry**

Set repeated content cards to 16px radius where the spec calls for institutional card rounding. Keep form/contact cards softly rounded and ensure shadows stay subtle.

- [ ] **Step 5: Fix visible text encoding**

Replace incorrect encoded characters in property badges and the footer copyright with clean text entities or ASCII-safe equivalents.

### Task 3: Restyle Investor Package

**Files:**
- Modify: `public/investor-package.html`

- [ ] **Step 1: Align package palette**

Update package CSS variables to the same navy, gold, white, warm grey, and text colors as the main website.

- [ ] **Step 2: Align package geometry**

Use 16px card rounding, restrained shadows, gold accents, and navy/white page treatments consistently across all eight pages.

- [ ] **Step 3: Keep print behavior**

Preserve `@media print`, page breaks, page footers, and the hidden print button behavior.

### Task 4: Verify Locally

**Files:**
- No file changes expected.

- [ ] **Step 1: Run lint**

Run: `node .tools\package\bin\npm-cli.js run lint`

Expected: exit code 0.

- [ ] **Step 2: Run typecheck**

Run: `node .tools\package\bin\npm-cli.js run typecheck`

Expected: exit code 0.

- [ ] **Step 3: Run production build**

Run: `node .tools\package\bin\npm-cli.js run build`

Expected: exit code 0.

- [ ] **Step 4: Browser inspect**

Open `http://127.0.0.1:3000` and `/investor-package.html`. Verify navbar, hero, stats, cards, portfolio, form, footer, and package cover render with the approved visual system on desktop and mobile.

### Task 5: Publish

**Files:**
- All modified files.

- [ ] **Step 1: Stage intended changes**

Run: `git add app/globals.css app/page.tsx components/site-chrome.tsx public/investor-package.html docs/superpowers/specs/2026-05-27-visual-refinement-design.md docs/superpowers/plans/2026-05-27-visual-refinement.md`

- [ ] **Step 2: Commit**

Run: `git commit -m "Refine investor brand visuals"`

- [ ] **Step 3: Push**

Run: `git push origin main`

- [ ] **Step 4: Deploy if needed**

Run: `node .tools\package\bin\npm-cli.js exec --yes vercel@latest -- deploy --prod --yes --scope alux1`

Expected: deployment aliases to `https://ponsivakumar.vercel.app`.
