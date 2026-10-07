# Design Tokens — Legal Sub-System

> **Lineage**: IBM Carbon Design System v10 (2019–2024)
>
> **Character**: Serious, document-dense, zero-ambiguity. This is institutional software for managing cases, hearings, and deadlines where a missed date has real legal consequences. Every design choice communicates precision and gravity.

---

## Color Tokens

### Base Palette

Carbon's philosophy: hierarchy through surface layering, not shadows. Surfaces stack from lightest to darkest to create depth.

| Token | Hex | Usage | Reference |
|---|---|---|---|
| `le-primary` | `#0F62FE` | Primary action buttons, active links | Carbon Blue-60 — the interactive token |
| `le-primary-hover` | `#0043CE` | Primary button hover | Carbon Blue-70 |
| `le-primary-light` | `#E8F0FE` | Selected states, active row background | Derived from Carbon Blue-10 tint |
| `le-surface-01` | `#FFFFFF` | Primary content surface (cards, tables) | Carbon $ui-01 |
| `le-surface-02` | `#F4F4F4` | Secondary surface (sidebar panels, grouped sections) | Carbon $ui-02 (Gray-10) |
| `le-surface-03` | `#E0E0E0` | Tertiary surface (nested containers, sub-panels) | Carbon $ui-03 (Gray-20) |
| `le-bg` | `#F4F4F4` | Page background | Carbon Gray-10 |
| `le-border` | `#C6C6C6` | Borders, dividers, table rules | Carbon Gray-30 — heavier than typical to reinforce structure |
| `le-border-subtle` | `#E0E0E0` | Subtle internal dividers | Carbon Gray-20 |
| `le-border-strong` | `#8D8D8D` | Emphasized borders (section separators, active input) | Carbon Gray-50 |

### Text

| Token | Hex | Usage |
|---|---|---|
| `le-text` | `#161616` | Primary text — near-black, maximum readability | 
| `le-text-secondary` | `#525252` | Labels, metadata, helper text (Carbon Gray-70) |
| `le-text-placeholder` | `#A8A8A8` | Input placeholder text (Carbon Gray-40) |
| `le-text-inverse` | `#FFFFFF` | Text on dark/primary backgrounds |
| `le-text-link` | `#0F62FE` | Inline links |

### Semantic Status Colors

Legal-specific: deadlines and case states drive the semantic palette.

| Token | Hex | Usage | Mapping |
|---|---|---|---|
| `le-status-active` | `#0F62FE` | Active case, current proceeding | Blue — in progress |
| `le-status-active-bg` | `#E8F0FE` | Active badge background | |
| `le-status-resolved` | `#198038` | Case resolved, deadline met | Carbon Green-60 — completed |
| `le-status-resolved-bg` | `#DEFBE6` | Resolved badge background | Carbon Green-10 |
| `le-status-critical` | `#DA1E28` | Peremptory deadline, overdue, rejected | Carbon Red-60 — demands attention |
| `le-status-critical-bg` | `#FFF1F1` | Critical badge background | Carbon Red-10 |
| `le-status-warning` | `#F1C21B` | Approaching deadline (3-day, 1-day alerts) | Carbon Yellow-30 |
| `le-status-warning-bg` | `#FFF8E1` | Warning badge background | |
| `le-status-archived` | `#8D8D8D` | Archived case, cancelled hearing | Carbon Gray-50 — inactive |
| `le-status-archived-bg` | `#F4F4F4` | Archived badge background | |
| `le-status-confidential` | `#6929C4` | Confidential tier indicator | Carbon Purple-60 — restricted |
| `le-status-confidential-bg` | `#F6F2FF` | Confidential badge background | Carbon Purple-10 |

### Sub-system Accent (for shell card)

| Token | Hex | Usage |
|---|---|---|
| `le-accent` | `#393939` | Shell card icon tint — dark, institutional |
| `le-accent-light` | `#F4F4F4` | Shell card icon background — Carbon Gray-10 |

---

## Typography

### Font Pairing

| Role | Font | Weight | Rationale |
|---|---|---|---|
| **Arabic body/UI** | Cairo | 400, 500, 600 | Consistent with MKANY-wide Arabic font. |
| **Latin body/UI** | IBM Plex Sans | 400, 500, 600 | The Carbon Design System's own typeface. Designed for "credible" reading of dense information — exactly what legal documents demand. More serious than Inter, less generic than system fonts. |
| **Display headings** | Syne | 600, 700 | Per MKANY constitution — brand consistency. |
| **Monospace (case numbers, dates, fees)** | JetBrains Mono | 400 | Per MKANY constitution — monospace for all financial/code data. |

### Type Scale (Productive)

Carbon's "Productive" scale — tighter, task-oriented, optimized for high-density interfaces.

| Token | Size | Weight | Line Height (Arabic) | Line Height (Latin) | Usage |
|---|---|---|---|---|---|
| `le-display` | 28px | Syne 700 | 1.7 | 1.5 | Page title (e.g., "ملف القضية") |
| `le-heading` | 20px | Cairo 600 | 1.7 | 1.5 | Section headers (Case Details, Hearings, Deadlines) |
| `le-subheading` | 16px | Cairo 600 | 1.7 | 1.5 | Subsection headers, panel titles |
| `le-body` | 14px | Cairo 400 | 1.7 | 1.5 | Default body text |
| `le-body-compact` | 13px | Cairo 400 | 1.7 | 1.5 | Dense lists, sidebar content |
| `le-label` | 12px | Cairo 500 | 1.7 | 1.5 | Form labels, column headers — smaller than Real Estate (density) |
| `le-caption` | 11px | Cairo 400 | 1.7 | 1.5 | Metadata, timestamps (Carbon allows 11px in productive mode) |
| `le-mono` | 13px | JetBrains Mono 400 | 1.5 | 1.5 | Case numbers, fee amounts, dates, hearing codes |

### Typography Rules

- Legal uses 12px labels (vs Real Estate's 13px) — one step denser, reflecting the domain's information needs
- `le-caption` at 11px is allowed only for non-critical metadata (timestamps, last-modified dates), never for actionable content
- All financial numbers use `le-mono` and are **right-aligned** even in RTL
- Minimum actionable text size: 12px
- Maximum line length: 75 characters

---

## Spacing Scale

**Base unit**: 4px (Carbon uses 2/4/8 multiples)

| Token | Value | Usage |
|---|---|---|
| `le-space-1` | 2px | Micro spacing (badge internal padding) — Carbon allows 2px |
| `le-space-2` | 4px | Tight gaps (icon-to-text, inline badge spacing) |
| `le-space-3` | 8px | Default element spacing, table cell padding |
| `le-space-4` | 12px | Input padding, between form fields |
| `le-space-5` | 16px | Card padding, section spacing |
| `le-space-6` | 24px | Between major sections |
| `le-space-8` | 32px | Page-level padding |

**Note**: Legal spacing is tighter than Real Estate by one step (starts at 2px instead of 4px). This is intentional — the case workspace needs to fit hearings, deadlines, documents, fees, and notes in a single viewport.

---

## Radius Scale

**Philosophy**: Sharp. Carbon is famous for this — 0px on many elements, max 4px. The sharpness communicates institutional precision. "This is not a casual interface."

| Token | Value | Usage |
|---|---|---|
| `le-radius-none` | 0px | Table rows, list items, navigation tabs |
| `le-radius-sm` | 2px | Badges, tags, small inline elements |
| `le-radius-md` | 4px | Buttons, inputs, cards |
| `le-radius-full` | 9999px | Circular indicators only (not buttons, not cards) |

**No radius above 4px.** This is non-negotiable for the Legal lineage. The entire interface should feel structurally rigid — like a well-organized filing system, not a friendly app.

---

## Elevation / Shadow

**Philosophy**: Carbon is shadow-averse. Hierarchy is created through surface color stacking, not elevation.

| Token | Value | Usage |
|---|---|---|
| `le-shadow-none` | `none` | Default — most elements have NO shadow |
| `le-shadow-dropdown` | `0 2px 6px rgba(0, 0, 0, 0.12)` | Dropdowns, popovers (need to feel "above" the surface) |
| `le-shadow-modal` | `0 4px 12px rgba(0, 0, 0, 0.20)` | Modals, drawers |

**Cards do NOT have shadows.** They are distinguished from the background by their surface color (`le-surface-01` on `le-bg`) and by borders. This is the single biggest visual differentiator from Real Estate.

---

## Density

| Token | Value | Usage |
|---|---|---|
| `le-table-row-default` | 36px | Default table row — tighter than Real Estate |
| `le-table-row-compact` | 28px | Compact mode (hearing lists, deadline tables) |
| `le-form-field-height` | 32px | Input/select height — compact by default |
| `le-form-field-compact` | 28px | Inline form fields in case workspace |
| `le-button-height` | 32px | Default button — smaller than Real Estate |
| `le-button-compact` | 28px | Inline/toolbar buttons |

**Legal is the densest sub-system by default.** The case workspace must fit maximum information in minimum space. What Real Estate calls "compact mode" is Legal's "default mode."

---

## Iconography

| Aspect | Specification |
|---|---|
| **Style** | Outline icons with 1.25px stroke weight (thinner than Real Estate — more refined) |
| **Size grid** | 16px (inline), 20px (buttons/nav) |
| **Fill** | Never. Even "active" states use color change, not fill |
| **Character** | Geometric, precise, minimal — Carbon's icon philosophy |
| **Source recommendation** | Carbon Icons (if available) or Lucide Icons — both match the precise, thin-stroke aesthetic |

---

## Motion

| Token | Value | Usage |
|---|---|---|
| `le-duration-fast` | 70ms | Focus ring, hover state — near-instant |
| `le-duration-normal` | 150ms | Dropdown open, panel reveal |
| `le-duration-slow` | 240ms | Modal fade, drawer slide |
| `le-easing` | `cubic-bezier(0.2, 0, 0.38, 0.9)` | Carbon's "productive" easing — faster attack, minimal deceleration |

**Philosophy**: Utilitarian. Transitions happen because the interface needs to signal a state change, not because motion is "delightful." Legal users don't want to wait 300ms for a dropdown to appear — they want it now.

---

## What This Is NOT

This design system explicitly avoids:

- ❌ **Shadows on cards** — cards are flat, distinguished by surface color and borders. No `box-shadow` on content containers.
- ❌ **Rounded corners above 4px** — nothing in this interface should feel soft or approachable. It should feel precise.
- ❌ **Warm colors in the base palette** — the cool gray scale is intentional. Warm tones suggest comfort; legal software should suggest rigor.
- ❌ **Glassmorphism or blur effects** — zero transparency in surfaces. Opacity is ambiguity; ambiguity is the enemy of legal work.
- ❌ **Decorative gradients** — surfaces are flat, single-color fills. Gradients add visual complexity with no information value.
- ❌ **Bouncy/spring animations** — motion is abrupt and utilitarian. No overshoot, no spring physics.
- ❌ **Large type scales** — this is not a marketing page. Display type is 28px max (smaller than Real Estate's could go).
- ❌ **Color as decoration** — every color in this system carries meaning (status, interaction, hierarchy). If an element is colored, that color communicates something specific.
- ❌ **"Friendly" or "approachable" aesthetic** — this interface should feel like walking into a law firm's filing room, not a startup's onboarding flow.
