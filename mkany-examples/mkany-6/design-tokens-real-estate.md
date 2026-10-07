# Design Tokens — Real Estate Sub-System

> **Lineage**: Salesforce Lightning Design System (Original, 2015–2019)
>
> **Character**: Authoritative, deal-driven, spatial/visual for unit inventory. This is a brokerage platform — it needs to project confidence and clarity. Properties are deals moving through a pipeline.

---

## Color Tokens

### Base Palette

| Token | Hex | Usage | Reference |
|---|---|---|---|
| `re-primary` | `#0070D2` | Primary action buttons, active states, links | SLDS Brand Blue — the action color of the original Lightning system |
| `re-primary-hover` | `#005FB2` | Primary button hover state | SLDS Brand Blue darkened 10% |
| `re-primary-light` | `#EBF5FF` | Selected row background, active tab indicator | SLDS utility blue background |
| `re-surface` | `#FFFFFF` | Cards, table backgrounds, form surfaces | SLDS card surface |
| `re-bg` | `#F4F6F9` | Page background | SLDS canvas background |
| `re-bg-alt` | `#ECEFF5` | Striped table rows, secondary panels | Derived from SLDS secondary canvas |
| `re-border` | `#D8DDE6` | Card borders, input borders, dividers | SLDS border token |
| `re-border-focus` | `#0070D2` | Input focus ring (2px solid) | SLDS focus indicator |

### Text

| Token | Hex | Usage |
|---|---|---|
| `re-text` | `#16325C` | Primary text — deep navy, not black | 
| `re-text-secondary` | `#54698D` | Labels, helper text, metadata |
| `re-text-inverse` | `#FFFFFF` | Text on primary-colored backgrounds |
| `re-text-link` | `#0070D2` | Inline links |

### Semantic Status Colors

These are functional — each maps to a real estate workflow state.

| Token | Hex | Usage | Mapping |
|---|---|---|---|
| `re-status-available` | `#04844B` | Unit available for sale | Green — opportunity open |
| `re-status-available-bg` | `#E6F7EE` | Available badge background | |
| `re-status-reserved` | `#E87800` | Unit reserved (TTL active) | Amber — pending action |
| `re-status-reserved-bg` | `#FFF5E6` | Reserved badge background | |
| `re-status-contracted` | `#0070D2` | Unit under contract | Blue — in progress |
| `re-status-contracted-bg` | `#EBF5FF` | Contracted badge background | |
| `re-status-sold` | `#706E6B` | Unit sold (completed deal) | Gray — closed-won, no action needed |
| `re-status-sold-bg` | `#F0F0F0` | Sold badge background | |
| `re-status-blocked` | `#C23934` | Unit blocked (legal hold, dispute) | Red — requires attention |
| `re-status-blocked-bg` | `#FDE8E8` | Blocked badge background | |
| `re-status-overdue` | `#C23934` | Overdue installment | Red — financial alert |
| `re-status-overdue-bg` | `#FDE8E8` | Overdue badge background | |
| `re-status-pending` | `#E87800` | Pending approval | Amber — waiting |
| `re-status-pending-bg` | `#FFF5E6` | Pending badge background | |

### Sub-system Accent (for shell card)

| Token | Hex | Usage |
|---|---|---|
| `re-accent` | `#0070D2` | Shell card icon tint, brand mark |
| `re-accent-light` | `#EBF5FF` | Shell card icon background |

---

## Typography

### Font Pairing

| Role | Font | Weight | Rationale |
|---|---|---|---|
| **Arabic body/UI** | Cairo | 400, 500, 600 | Standard Arabic UI font with good weight range. Designed for screen reading, not calligraphic — appropriate for a deal-driven interface. |
| **Latin body/UI** | Inter | 400, 500, 600 | The Salesforce Lightning era used system fonts; Inter is the modern equivalent — highly legible, neutral, designed for UI. Not trendy (no geometric quirks). |
| **Display headings** | Syne | 600, 700 | Per MKANY constitution — display headings use Syne for brand consistency across all sub-systems. |
| **Monospace (numbers, codes, IDs)** | JetBrains Mono | 400 | Per MKANY constitution — all financial numbers in monospace for vertical alignment. |

### Type Scale

| Token | Size | Weight | Line Height (Arabic) | Line Height (Latin) | Usage |
|---|---|---|---|---|---|
| `re-display` | 28px | Syne 700 | 1.7 | 1.5 | Page title (e.g., "وحدات المشروع") |
| `re-heading` | 20px | Cairo 600 | 1.7 | 1.5 | Section headers |
| `re-subheading` | 16px | Cairo 600 | 1.7 | 1.5 | Card titles, subsection headers |
| `re-body` | 14px | Cairo 400 | 1.7 | 1.5 | Default body text |
| `re-label` | 13px | Cairo 500 | 1.7 | 1.5 | Form labels, table headers |
| `re-caption` | 12px | Cairo 400 | 1.7 | 1.5 | Helper text, timestamps, metadata |
| `re-mono` | 13px | JetBrains Mono 400 | 1.5 | 1.5 | Prices, installment amounts, unit codes, IDs |

### Typography Rules

- All financial numbers use `re-mono` and are **right-aligned** even in RTL layout
- Minimum text size: 12px (per MKANY constitution)
- Maximum line length: 75 characters (per MKANY constitution)
- Arabic line-height is always 1.7; Latin is 1.5

---

## Spacing Scale

**Base unit**: 4px (SLDS-derived)

| Token | Value | Usage |
|---|---|---|
| `re-space-1` | 4px | Tight internal padding (badge padding, icon-to-text gap) |
| `re-space-2` | 8px | Default gap between related elements |
| `re-space-3` | 12px | Input internal padding, table cell padding |
| `re-space-4` | 16px | Card internal padding, section spacing |
| `re-space-5` | 24px | Between card groups, form section gaps |
| `re-space-6` | 32px | Major section separation |
| `re-space-8` | 48px | Page-level margins |

---

## Radius Scale

**Philosophy**: Professional and modern, but not playful. SLDS used consistent 4px — enough to soften without looking casual.

| Token | Value | Usage |
|---|---|---|
| `re-radius-sm` | 2px | Badges, small inline elements |
| `re-radius-md` | 4px | Cards, inputs, buttons, dropdowns |
| `re-radius-lg` | 6px | Modals, drawers |
| `re-radius-full` | 9999px | Avatars, circular indicators only |

**No radius above 6px on rectangular elements.** This is a deliberate SLDS-era constraint — large radii read as "consumer app," not "brokerage platform."

---

## Elevation / Shadow

**Philosophy**: SLDS-derived — subtle single-level shadow for surface separation, not decorative depth.

| Token | Value | Usage |
|---|---|---|
| `re-shadow-card` | `0 1px 3px rgba(0, 0, 0, 0.10)` | Cards, dropdowns at rest |
| `re-shadow-hover` | `0 2px 6px rgba(0, 0, 0, 0.12)` | Card hover state |
| `re-shadow-modal` | `0 4px 16px rgba(0, 0, 0, 0.16)` | Modals, drawers, overlays |

**Only 3 levels.** Borders (`re-border`) are the primary separation method. Shadows are supplementary, never primary.

---

## Density

| Token | Value | Usage |
|---|---|---|
| `re-table-row-default` | 40px | Default table row height |
| `re-table-row-compact` | 32px | Compact mode (installment lists, unit inventories) |
| `re-form-field-height` | 36px | Input/select height |
| `re-form-field-compact` | 32px | Compact form fields |
| `re-button-height` | 36px | Default button height |
| `re-button-compact` | 32px | Compact/inline buttons |

---

## Iconography

| Aspect | Specification |
|---|---|
| **Style** | Outline icons with 1.5px stroke weight |
| **Size grid** | 16px (inline), 20px (buttons/nav), 24px (section headers) |
| **Fill** | Never filled by default. Filled state reserved for "active/selected" toggle |
| **Character** | Geometric/clean, not organic or illustrative |
| **Source recommendation** | Heroicons (outline set) or Phosphor Icons — both match the SLDS-era geometric simplicity |

---

## Motion

| Token | Value | Usage |
|---|---|---|
| `re-duration-fast` | 100ms | Button hover, focus ring |
| `re-duration-normal` | 200ms | Dropdowns, panel reveals |
| `re-duration-slow` | 300ms | Drawer slide-in, modal fade |
| `re-easing` | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard Material easing — smooth but not bouncy |

**Philosophy**: Transitions serve function (indicating state change), not delight. No spring physics, no bounce, no overshoot. Snappy and direct.

---

## What This Is NOT

This design system explicitly avoids:

- ❌ **Glassmorphism** — no frosted glass, no backdrop-filter blur on surfaces
- ❌ **Soft gradients** — no gradient backgrounds on cards or surfaces (buttons may use a subtle gradient only on hover)
- ❌ **Purple/indigo accent colors** — the primary is a professional action blue, not a trendy violet
- ❌ **Oversized rounded corners** — maximum 6px on any rectangular element; no `rounded-xl` or `rounded-2xl`
- ❌ **Floating/elevated card stacks** — cards sit on the surface with minimal shadow, not floating above it
- ❌ **Decorative animations** — no particle effects, no floating elements, no parallax
- ❌ **Dark mode as default** — this is a daytime brokerage tool; light mode is primary
- ❌ **Generic component library aesthetic** — this should look like purpose-built real estate software, not a template demo
- ❌ **Thin 1px hairline borders everywhere** — borders are visible (1px solid `re-border`) but have enough contrast to actually separate content
