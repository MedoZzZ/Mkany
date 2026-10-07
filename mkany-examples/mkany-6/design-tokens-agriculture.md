# Design Tokens — Agriculture Sub-System

> **Lineage**: Light ISA-101 High-Performance HMI + Granular/AgTech SaaS (2019–2020)
>
> **Character**: Operational, field-ready, sensor/data-driven. This is a monitoring-and-operations interface for greenhouse management and crop cycle tracking. Its defining trait is the ISA-101 exception-driven color principle — **normal operating state is calm and neutral; color is reserved for conditions that need human attention** — but applied to a light, office-appropriate canvas inspired by professional AgTech platforms like Granular Insights.
>
> **What changed from v1**: The SCADA/ISA-101 lineage was originally interpreted with a dark/industrial canvas. ISA-101 actually recommends light/medium gray (60–70% intensity) as the standard HMI background — dark themes are specific to dimly-lit control rooms, not general-purpose monitoring. The exception-color model is fully preserved; only the surface treatment changed. See research-log.md addendum for full justification.

---

## Color Tokens

### Base Palette

The exception-color principle, on a light canvas: the page background is a warm light gray. Content surfaces are white. Normal-state elements are muted/borderless. Color appears only when something deviates from the expected range and requires operator attention.

| Token | Hex | Usage | Reference |
|---|---|---|---|
| `ag-primary` | `#00897B` | Primary action buttons, interactive elements, active navigation | Teal-600 — operational, not corporate. Distinct from Real Estate blue (#0070D2) and Legal blue (#0F62FE). Evokes controlled growth without being literal "leaf green." |
| `ag-primary-hover` | `#00796B` | Primary button hover | Teal-700 |
| `ag-primary-active` | `#00695C` | Primary button pressed/active | Teal-800 |
| `ag-primary-light` | `#E0F2F1` | Selected row, active tab background, subtle teal tint | Teal-50 |
| `ag-primary-muted` | `#B2DFDB` | Secondary teal elements (progress bars, sparkline fill) | Teal-100 — useful for data visualization without alarm-level saturation |
| `ag-surface` | `#FFFFFF` | Content cards, table backgrounds, form surfaces, sensor reading cards | White — clean, professional, Granular-inspired |
| `ag-bg` | `#F0F0F0` | Page background | Warm light gray — distinct from RE (#F4F6F9, cool) and Legal (#F4F4F4, neutral). Slightly warmer to differentiate the Agriculture context. |
| `ag-bg-alt` | `#E8E8E8` | Sidebar background, grouped panel background, striped table rows | Secondary surface — one step darker than bg |
| `ag-border` | `#D4D4D4` | Card borders, input borders, dividers | Medium-contrast border — visible but not heavy |
| `ag-border-subtle` | `#E5E5E5` | Internal separators, table row dividers | Subtle — guides the eye without demanding attention |
| `ag-border-focus` | `#00897B` | Input focus ring (2px solid) | Primary teal for focus indicators |

### Text

| Token | Hex | Usage |
|---|---|---|
| `ag-text` | `#1C1C1C` | Primary text — high contrast on white surfaces |
| `ag-text-secondary` | `#636363` | Labels, metadata, helper text |
| `ag-text-muted` | `#9E9E9E` | Disabled, inactive, placeholder text |
| `ag-text-inverse` | `#FFFFFF` | Text on teal or alarm-colored backgrounds |
| `ag-text-link` | `#00897B` | Inline links |

### Semantic Status Colors — The Exception Model (Preserved)

**Critical design principle (unchanged)**: In Real Estate and Legal, status colors are always visible. In Agriculture, the **absence of color IS the normal state.** Color only appears when human attention is needed. A greenhouse dashboard where everything is running normally should look calm and muted — no green "OK" indicators, no blue "running" badges. When a temperature alarm fires or a pH reading drops out of range, that exception stands out precisely because the normal state is quiet.

| Token | Hex | Usage | ISA-101 Mapping |
|---|---|---|---|
| `ag-normal` | `#9E9E9E` | Normal operation indicator | Gray — not green. Normal is the absence of alarm. |
| `ag-normal-bg` | `#F5F5F5` | Normal state card/badge background | Barely visible against the page — intentional |
| `ag-alarm-critical` | `#C62828` | Critical alarm: temperature emergency, equipment failure, safety stop | ISA-101 Red — highest severity. Slightly deeper than Material Red-800 for authority. |
| `ag-alarm-critical-bg` | `#FFEBEE` | Critical alarm background | Red-50 — visible but not overwhelming as a background tint |
| `ag-alarm-critical-border` | `#EF9A9A` | Critical alarm card border | Red-200 — reinforces alarm state at the card level |
| `ag-alarm-warning` | `#E65100` | Warning: approaching threshold, maintenance overdue | ISA-101 Amber/Orange — deepened for contrast on white cards. Darker than v1's #F57F17 for better legibility on light backgrounds. |
| `ag-alarm-warning-bg` | `#FFF3E0` | Warning background | Orange-50 |
| `ag-alarm-warning-border` | `#FFCC80` | Warning card border | Orange-200 |
| `ag-alarm-info` | `#1565C0` | Informational: setpoint changed, acknowledged alarm, scheduled maintenance | ISA-101 Blue — informational, not action-requiring |
| `ag-alarm-info-bg` | `#E3F2FD` | Informational background | Blue-50 |
| `ag-cycle-active` | `#2E7D32` | Active crop cycle | Green-800 — the ONE place green is semantically correct: living, growing crop |
| `ag-cycle-active-bg` | `#E8F5E9` | Active cycle badge background | Green-50 |
| `ag-cycle-completed` | `#757575` | Completed crop cycle | Neutral gray — no action needed |
| `ag-cycle-completed-bg` | `#F5F5F5` | Completed cycle background | |
| `ag-harvest-ready` | `#E65100` | Harvest-ready — time-sensitive, requires action | Shares warning amber — harvesting is an action deadline |
| `ag-harvest-ready-bg` | `#FFF3E0` | Harvest-ready background | |

### Sub-system Accent (for shell card — unchanged)

| Token | Hex | Usage |
|---|---|---|
| `ag-accent` | `#00897B` | Shell card icon tint — teal, operational |
| `ag-accent-light` | `#E0F2F1` | Shell card icon background |

---

## Typography

### Font Pairing

| Role | Font | Weight | Rationale |
|---|---|---|---|
| **Arabic body/UI** | Cairo | 400, 500, 600 | MKANY-wide consistency. |
| **Latin body/UI** | Inter | 400, 500, 600 | Clean, neutral, highly legible at small sizes. Agriculture needs readability in variable lighting conditions (greenhouse vs office vs mobile in the field). Inter works well on both white and light-gray backgrounds. |
| **Display headings** | Syne | 600, 700 | Per MKANY constitution — brand consistency across all sub-systems. |
| **Monospace (sensor readings, cycle codes)** | JetBrains Mono | 400, 500 | Sensor readings (temperature, humidity, pH, EC) must align vertically in monitoring dashboards. The 500 weight is available for emphasis on alarm-state values. |

### Type Scale

| Token | Size | Weight | Line Height (Arabic) | Line Height (Latin) | Usage |
|---|---|---|---|---|---|
| `ag-display` | 28px | Syne 700 | 1.7 | 1.5 | Page title (e.g., "لوحة الصوب") |
| `ag-heading` | 20px | Cairo 600 | 1.7 | 1.5 | Section headers |
| `ag-subheading` | 16px | Cairo 600 | 1.7 | 1.5 | Card titles (greenhouse name, cycle name) |
| `ag-body` | 14px | Cairo 400 | 1.7 | 1.5 | Default body text |
| `ag-label` | 13px | Cairo 500 | 1.7 | 1.5 | Form labels, table headers |
| `ag-caption` | 12px | Cairo 400 | 1.7 | 1.5 | Helper text, timestamps |
| `ag-reading` | 16px | JetBrains Mono 400 | 1.5 | 1.5 | Sensor current value — larger than body for dashboard prominence |
| `ag-reading-unit` | 12px | JetBrains Mono 400 | 1.5 | 1.5 | Unit suffix (°C, %, mS/cm) — smaller, displayed adjacent to reading |
| `ag-reading-alarm` | 16px | JetBrains Mono 500 | 1.5 | 1.5 | Sensor value in alarm state — medium weight for emphasis |
| `ag-mono` | 13px | JetBrains Mono 400 | 1.5 | 1.5 | Cycle codes, batch IDs, cost figures |

### Typography Rules

- Sensor readings (`ag-reading`) are displayed larger than body text because they are the primary data the operator scans
- Alarm-state readings use medium weight (`ag-reading-alarm`) — never bold (bold in a control room context implies "critical/emergency," which has its own semantic level)
- All financial numbers use `ag-mono` and are **right-aligned** even in RTL
- Minimum text size: 12px
- Maximum line length: 75 characters
- On light canvas, text contrast ratios must meet WCAG AA: `ag-text` (#1C1C1C) on `ag-surface` (#FFFFFF) = 17.4:1 ✓, `ag-text-secondary` (#636363) on white = 5.9:1 ✓

---

## Spacing Scale

**Base unit**: 4px (unchanged)

| Token | Value | Usage |
|---|---|---|
| `ag-space-1` | 4px | Tight internal padding (badge padding, icon gap) |
| `ag-space-2` | 8px | Default gap, sensor card internal spacing |
| `ag-space-3` | 12px | Input padding, table cell padding |
| `ag-space-4` | 16px | Card padding |
| `ag-space-5` | 24px | Between card groups, form section gaps |
| `ag-space-6` | 32px | Major section separation |
| `ag-space-8` | 48px | Page-level margins |

---

## Radius Scale

**Philosophy**: Utilitarian. Still sharper than Real Estate (4px) but no longer trying to match SCADA's hard-edge industrial look. The 3px default is a deliberate middle ground — functional, not decorative, but not so sharp it feels institutional like Legal's 0–2px.

| Token | Value | Usage |
|---|---|---|
| `ag-radius-sm` | 2px | Badges, tags, small inline elements |
| `ag-radius-md` | 3px | Cards, inputs, buttons |
| `ag-radius-lg` | 6px | Modals, drawers |
| `ag-radius-full` | 9999px | Circular sensor indicators, status dots |

---

## Elevation / Shadow

**Philosophy**: Primarily flat with borders. The light canvas makes border-based separation more natural than on dark backgrounds — a 1px border on a white card against a #F0F0F0 background creates clear hierarchy without any shadow. Shadows are reserved for overlaying elements (dropdowns, modals) and a minimal lift on sensor cards.

| Token | Value | Usage |
|---|---|---|
| `ag-shadow-none` | `none` | Default for most elements |
| `ag-shadow-card` | `0 1px 3px rgba(0, 0, 0, 0.06)` | Content cards — subtle, barely-there lift from the gray background |
| `ag-shadow-card-alarm` | `0 1px 4px rgba(0, 0, 0, 0.10)` | Sensor card in alarm state — slightly more presence to support the alarm border/color |
| `ag-shadow-dropdown` | `0 2px 8px rgba(0, 0, 0, 0.12)` | Dropdowns, popovers |
| `ag-shadow-modal` | `0 4px 16px rgba(0, 0, 0, 0.18)` | Modals, drawers |

**Cards rely on `ag-border` (1px solid #D4D4D4) as the primary separation method.** Shadow is supplementary — sensor cards at rest are visually quiet. Alarm-state cards use `ag-shadow-card-alarm` alongside a colored border (`ag-alarm-critical-border` or `ag-alarm-warning-border`) to create a subtle "lift" that reinforces the alarm's visual weight.

---

## Density

| Token | Value | Usage |
|---|---|---|
| `ag-table-row-default` | 40px | Default table row (crop cycle lists, harvest records) |
| `ag-table-row-compact` | 32px | Compact mode (alert lists, operation logs) |
| `ag-sensor-card-width` | 200px | Minimum sensor reading card width |
| `ag-sensor-card-height` | 120px | Sensor reading card height (value + trend sparkline + label) |
| `ag-form-field-height` | 40px | Input/select height — larger for field/greenhouse touch use |
| `ag-form-field-compact` | 36px | Compact form fields (office/desktop use) |
| `ag-button-height` | 40px | Default button — larger touch target for field use |
| `ag-button-compact` | 36px | Compact buttons (desktop) |

**Agriculture retains the largest default touch targets** of all three sub-systems because the "Record Operation" and "Record Harvest" screens are used standing in a greenhouse, often with gloves or dirty hands. The desktop dashboard can switch to compact mode.

---

## Iconography

| Aspect | Specification |
|---|---|
| **Style** | Outline icons with 2px stroke weight — thicker than Legal (1.25px) and Real Estate (1.5px) for visibility in variable lighting |
| **Size grid** | 20px (inline), 24px (buttons/nav), 32px (dashboard sensor indicators) |
| **Fill** | Filled ONLY when representing alarm state (e.g., filled bell for active alarm vs outline bell for normal). Normal-state icons are always outline. |
| **Character** | Functional/geometric — not organic or illustrative despite the agricultural domain. No leaf/plant decorative icons. |
| **Source recommendation** | Tabler Icons or Material Symbols (rounded, 200 weight) — both have the slightly thicker, more robust feel needed for operational interfaces |

---

## Motion

| Token | Value | Usage |
|---|---|---|
| `ag-duration-fast` | 100ms | Button hover, focus ring |
| `ag-duration-normal` | 200ms | Dropdown open, panel transitions |
| `ag-duration-slow` | 350ms | Drawer slide, modal fade |
| `ag-duration-pulse` | 1500ms | Alarm pulse animation cycle |
| `ag-easing` | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard easing |
| `ag-easing-pulse` | `ease-in-out` | Alarm pulse — smooth breathing rhythm |

**Alarm pulse pattern**: Alarm-state sensor cards may use a subtle border-color pulse (oscillating between the alarm border color and transparent) to draw persistent attention. This is the ONE place where animation is allowed to be attention-seeking — because it represents a real operational exception. The pulse uses `ag-duration-pulse` at 1500ms — slow and deliberate, not frantic or distracting. On light canvas, the pulse is visible but not harsh — it reads as a gentle "breathing" of the alarm border rather than a strobe.

---

## What This Is NOT

This design system explicitly avoids:

- ❌ **Dark/industrial canvas** — the v1 dark theme was too heavy for daily ERP use. This is an office tool that also serves field operations, not a bunker control room. The light canvas (#F0F0F0 + white cards) is professional and all-day-usable.
- ❌ **"Everything green means good"** — the most dangerous pattern in monitoring UI. Normal state is gray/neutral. Green is reserved only for active crop cycle status, never for "OK" sensor readings. This principle is preserved from v1.
- ❌ **Decorative use of agricultural imagery** — no leaf icons as decoration, no green-tinted surfaces "because agriculture." Color is functional, not thematic.
- ❌ **Glassmorphism or blur** — operational interfaces need zero visual ambiguity. Translucent surfaces hide information.
- ❌ **Soft gradients on containers** — sensor cards are flat, single-color white fills. Gradients on data containers add visual noise.
- ❌ **Oversized rounded corners** — maximum 6px. Soft corners imply soft data; sensor readings are exact. The 3px default is deliberately less rounded than Real Estate's 4px.
- ❌ **Trendy color palettes** — no pastels, no "modern agriculture" olive/sage/cream aesthetic, no earthy tones. Colors are functional alarm/status indicators only.
- ❌ **Spring/bounce animations** — motion is functional only. The sole animated element is the alarm pulse, and it's deliberately slow.
- ❌ **Consumer-app sensor displays** — no circular gauges with gradient fills, no animated needle dials. Sensor readings are displayed as monospace numbers with trend sparklines (the MKANY constitution says "trend not value — direction is more important").
- ❌ **Looking like Real Estate or Legal** — Agriculture keeps its own identity through: teal accent (not blue), 3px radius (not 4px or 0px), warm gray background (not cool gray), exception-only color model, and thicker icon stroke weight.
