# NEURO-SYMBOLIC BRUTALIST — Design System

> `SYSTEM·3 // The fusion of Neuro-Symbolic logic.`
> Namespace: `NeuroSymbolicBrutalistDesignSystem_cd7104`

A techno-brutalist / cyber-grunge aesthetic system that mirrors the duality of
neuro-symbolic AI:

- **The Neural Axis** *(statistical & fluid)* — high-contrast halftones, photocopy
  grain, dithered organic figures, blurred gradient mappings.
- **The Symbolic Axis** *(rigid & relational)* — explicit technical grids, 1px
  blueprint borders, monospaced metadata, crosshairs `[ + ]`, strict logical
  boundaries.

This is a **from-scratch conceptual brand** — there is no supplied logo or product
codebase. The brand mark is rendered in plain type (`SYSTEM·3`); no logo was
invented. See CAVEATS.

## Sources
Provided as **mood/reference imagery only** (no codebase, no Figma, no decks):
- `uploads/Neuro_Symbolic_Brutalist_Design_Specs.pdf` — the written spec (colors,
  type, layout mechanics). Transcribed into these tokens.
- ~22 reference posters/plates in `uploads/` (Chainsaw-Man/Makima poster, "CLEAR
  INTENT" eye+hands plate, cyberpunk wireframe sheets, grunge silhouette set,
  xerox brutalist type posters). These are third-party stock/mood references and
  are **not** brand assets. Four were copied into `assets/img/` purely as
  *"treated imagery"* placeholders to demonstrate the halftone/threshold pipeline.

---

## CONTENT FUNDAMENTALS — how copy is written
- **Voice:** machinic, terminal, declarative. The system talks like a console, not
  a marketer. Ditch welcoming greetings ("Welcome to my site" → `[COGNITIVE ARCHITECT]`).
- **Casing:** display headers are **ALL-CAPS**. Labels & metadata are **UPPERCASE**
  mono with wide tracking. Body mono is sentence case.
- **Person:** near-zero first/second person. Prefer impersonal system statements
  ("`MEM_ALLOC: OK`", "awaiting operator input") and terse third-person bios.
- **Technical markers everywhere:** section titles are prefixed — `01. SEC_REF`,
  `// DATA_STREAM`, `T+02`. Numbers are zero-padded (`001`, `0x1F`, `v2.1.0`).
- **Telemetry artifacts as copy:** fictitious statuses (`MEM_ALLOC: OK`, `UPTIME
  99.98%`, `R · RESTRICTED`), crop marks, and log lines are legitimate content, not
  chrome. Use them to fill structural corners.
- **Tone words:** anomaly, chamber, array, node, threshold, packet, signal.
- **Emoji:** never. Unicode used only as *symbols* — `+ · ∴ → × ▼ [ ]` — never
  decoratively.
- **Examples:** `THE REPOSITORY`, `CORE_CONTRIBUTION`, `SEND PACKET`, `OPEN A
  CHANNEL`, `boot.seq nominal — telemetry online`.

## VISUAL FOUNDATIONS
- **Color:** two configurations (both shipped).
  - *Configuration Alpha* (default) — Void Black `#0C0C0E`, Chamber Grey `#16161C`,
    Hot Coral `#FF4500`, Bone White `#DCDCCF`. Dark, cathode/radar telemetry.
  - *Configuration Beta* — Carbon Black `#000`, Raw Pulp `#E5E5DF`, Bleached White
    `#FFF`. Stark dual-tone xerox. Activate with `data-config="beta"` on any container.
  - Accent is used **surgically** — one aggressive coral hit per view (fills, hover
    inverts, single stat), never as a wash. Signal colors (`ok/warn/err/idle`) are
    muted and terminal-like.
- **Type:** Display = **Syne 800** (fallbacks Archivo Black / Impact) — uppercase,
  line-height `0.9`, tracking `-0.03em`, sized like concrete blocks; outlined
  (`-webkit-text-stroke`) variant for rhythm. Section = **Space Grotesk**. Body &
  telemetry = **JetBrains Mono** (fallback Space Mono) at 9–13px with generous
  1.65 line-height.
- **Spacing:** rigid 4px scale. Containers natively **touch** with 1px borders — no
  floating cards, minimal internal padding, gutter is `1px`.
- **Borders:** the primary visual device. `1px solid` everywhere — bone hairline
  (`--wire-faint`) for structure, coral (`--border-accent`) for emphasis.
- **Radius:** effectively **zero** (`--r-none`). Nothing is rounded.
- **Backgrounds:** blueprint grid (`.tex-grid`), photocopy grain (`.tex-grain`,
  SVG fractal noise), halftone dot fields (`.tex-halftone`), cathode scanlines
  (`.tex-scanline`). No smooth full-bleed gradients (except optional cathode bloom).
- **Shadows:** brutalist **hard offset**, no blur — `--shadow-hard` (`4px 4px 0`).
  The only soft light is `--glow-coral` (focus/cathode bloom on inputs).
- **Imagery:** all organic assets pass through destructive monochrome
  threshold/dither (`.img-threshold`, `.img-dither`) — grayscale, high contrast,
  optional coral `multiply` tint. Cold, binary, machinic — never warm or soft.
- **Vector graphics:** knowledge graphs / logic trees drawn as crisp **1px
  unaliased coral wireframes**, orthographic, no smooth gradients.
- **Motion:** mechanical, no bounce. `--ease-mech` / `--ease-snap`, `90–260ms`.
  Fast fills, hard state flips. Respect `prefers-reduced-motion`.
- **Hover:** the signature — **fill hot-coral and INVERT text** (buttons, table
  rows). Ghost elements shift to coral text.
- **Press:** `translate(1px,1px)` (physical key press), no scale.
- **Transparency/blur:** minimal. No frosted glass. Transparency only for grid/grain
  overlays and gradient scrims on treated images.

## ICONOGRAPHY
- **No icon font, no illustration set.** Iconography is **typographic &
  geometric**: crosshairs `[ + ]` (see `Crosshair`), brackets `[ ]`, barcodes
  (`Barcode`), crop marks, and Unicode symbols (`+ · ∴ → × ▼`).
- Wireframe diagrams (knowledge graphs, tori, grids) are drawn as **inline 1px
  SVG strokes** in the accent color — generic geometric primitives, authored per
  use, never a shipped logo.
- If a consumer needs a full glyph set, substitute a hairline/monoline CDN set
  (e.g. Lucide at `stroke-width:1`) — this would be a **flagged substitution**;
  none is bundled today.
- Emoji: never.

---

## INDEX / MANIFEST (root)
- `styles.css` — global entry (imports only). **Consumers link this one file.**
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `effects.css`,
  `fonts.css` (Google Fonts CDN import).
- `foundations/` — 10 specimen cards (Colors, Type, Spacing, Brand).
- `components/` — reusable primitives (below).
- `ui_kits/research-site/` — full interactive personal ML research site.
- `assets/img/` — treated-imagery placeholders (see Sources / CAVEATS).
- `SKILL.md` — Agent-Skills-compatible entry point.

### Components (`window.NeuroSymbolicBrutalistDesignSystem_cd7104`)
- **core/** — `Button`, `Badge`, `Marker`
- **forms/** — `Input`, `Select`, `Checkbox`, `Switch`
- **surfaces/** — `Panel`, `StatReadout`
- **artifacts/** — `Crosshair`, `Barcode`, `LogStream`
- **data/** — `DataTable`

### UI Kits
- **research-site** — Console (hero/bio), Repository (publications `DataTable`),
  Logic Arrays (research demos), Contact. Interactive nav.

---

## CAVEATS
- **No logo** was supplied and none was invented — the mark is set in type
  (`SYSTEM·3`). Provide a real logo and it will be integrated.
- **Fonts are loaded from Google Fonts CDN** (Syne, Space Grotesk, JetBrains Mono,
  Space Mono, Archivo Black). Impact / Arial Black / Courier Prime are named only as
  system fallbacks. If you have licensed binaries, drop them in and I'll add
  `@font-face` rules.
- **Reference imagery is third-party mood/stock** — the four plates in `assets/img/`
  are placeholders demonstrating the treatment pipeline, **not** licensed brand
  assets. Replace with owned imagery before production.
- **No sample slides** were created (no slide template was provided). The poster
  references suggest a slide/poster kit would fit well — say the word.

## Intentional additions
Because no source component inventory existed, a standard brutalist set was authored
from the spec. `Marker`, `Crosshair`, `Barcode`, `LogStream`, and `StatReadout` are
brand-specific additions realizing the spec's "industrial telemetry" and "vector
blueprint" motifs.
