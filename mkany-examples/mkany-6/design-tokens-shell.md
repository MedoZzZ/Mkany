# Design Tokens — Shell (Root OS Layer)

> **Lineage**: macOS Launchpad / Windows Start Screen metaphor — an application launcher, not an application itself.
>
> **Character**: Neutral, quiet, welcoming. The shell is the "home" that sits above all three sub-systems. It must not adopt any sub-system's visual language — no Real Estate blue, no Legal gray layering, no Agriculture teal. Instead, it uses a warm neutral palette that feels like a distinct context: "you're choosing where to go," not "you're already working."

---

## Why Neutral?

The shell page serves one purpose: route the user to the correct sub-system. It should:

1. **Feel like a separate context** — when a user returns to the shell from Legal, they should feel the domain shift (just as returning to an OS home screen feels different from the app you were in)
2. **Not compete with any sub-system** — if the shell used Real Estate's blue, returning from Legal would feel like entering the Real Estate context
3. **Communicate brand identity** — this is where the MKANY brand lives, before it branches into sub-brands. The OBSIDIAN GOLD identity from the constitution should be subtly present here

The shell draws from the OBSIDIAN GOLD palette established in the MKANY constitution but applies it sparingly — just enough for brand recognition without creating a fourth "sub-system" aesthetic.

---

## Color Tokens

### Base Palette

| Token | Hex | Usage | Rationale |
|---|---|---|---|
| `sh-bg` | `#F8F9FA` | Page background | Warm-neutral gray — warmer than Legal's cool #F4F4F4, lighter than Agriculture's #EEEEEE. Feels like a home/lobby. |
| `sh-surface` | `#FFFFFF` | Search bar, cards | Clean white surface |
| `sh-border` | `#E2E5E9` | Subtle borders (search bar, card hover) | Soft but visible |
| `sh-border-hover` | `#CDD1D6` | Border on hover states | Slightly darker for interaction feedback |
| `sh-brand` | `#0B1B2B` | Brand mark text, primary heading | OBSIDIAN — from MKANY constitution navy-900 |
| `sh-brand-accent` | `#E6AC00` | Brand mark accent, subtle highlights | GOLD — from MKANY constitution gold-500. Used sparingly (brand mark, focus ring accent, not as primary action color). |

### Text

| Token | Hex | Usage |
|---|---|---|
| `sh-text` | `#1A1A1A` | Primary text — per MKANY constitution |
| `sh-text-secondary` | `#5A6B7C` | Subtitle, descriptions, metadata — per constitution text-muted |
| `sh-text-greeting` | `#0B1B2B` | Greeting line (uses brand color for warmth) |
| `sh-text-placeholder` | `#8B95A1` | Search bar placeholder |

### Card Accent Colors (from sub-system tokens)

Each card uses the accent color of its sub-system for the icon tint.

| Token | Hex | Sub-system |
|---|---|---|
| `sh-card-re-accent` | `#0070D2` | Real Estate — SLDS Blue |
| `sh-card-re-bg` | `#EBF5FF` | Real Estate icon background |
| `sh-card-le-accent` | `#393939` | Legal — Carbon Dark |
| `sh-card-le-bg` | `#F4F4F4` | Legal icon background |
| `sh-card-ag-accent` | `#00897B` | Agriculture — Operational Teal |
| `sh-card-ag-bg` | `#E0F2F1` | Agriculture icon background |

---

## Typography

### Font Pairing

| Role | Font | Weight | Rationale |
|---|---|---|---|
| **Arabic body/UI** | Cairo | 400, 500, 600 | MKANY-wide consistency |
| **Latin body/UI** | Inter | 400, 500 | Neutral, universal — the shell has no domain-specific personality |
| **Display/greeting** | Syne | 600, 700 | Per MKANY constitution — this is where Syne appears most prominently as the brand typeface |
| **Monospace** | JetBrains Mono | 400 | For the keyboard shortcut hint (`Ctrl+K`) |

### Type Scale

| Token | Size | Weight | Line Height (Arabic) | Line Height (Latin) | Usage |
|---|---|---|---|---|---|
| `sh-greeting` | 28px | Syne 600 | 1.7 | 1.5 | Greeting line (e.g., "مرحباً، أحمد") |
| `sh-heading` | 20px | Cairo 600 | 1.7 | 1.5 | Section label (if needed) |
| `sh-body` | 14px | Cairo 400 | 1.7 | 1.5 | Card descriptions |
| `sh-card-title` | 16px | Cairo 600 | 1.7 | 1.5 | Project card name |
| `sh-caption` | 12px | Cairo 400 | 1.7 | 1.5 | Metadata, helper text |
| `sh-search-text` | 15px | Cairo 400 | 1.7 | 1.5 | Search bar input text — slightly larger for prominence |
| `sh-search-placeholder` | 15px | Cairo 400 | 1.7 | 1.5 | Search bar placeholder |
| `sh-kbd` | 12px | JetBrains Mono 400 | 1.5 | 1.5 | Keyboard shortcut hint (Ctrl+K) |

---

## Spacing Scale

**Base unit**: 4px

| Token | Value | Usage |
|---|---|---|
| `sh-space-2` | 8px | Tight gaps |
| `sh-space-3` | 12px | Icon-to-text gap in cards |
| `sh-space-4` | 16px | Card internal padding |
| `sh-space-5` | 24px | Between search bar and cards grid |
| `sh-space-6` | 32px | Between greeting and search bar |
| `sh-space-8` | 48px | Major vertical rhythm |
| `sh-space-12` | 64px | Top-of-page breathing room |

The shell uses **more generous spacing** than any sub-system — it's not a dense data interface, it's a launcher. The user should feel like they have breathing room before diving into work.

---

## Radius Scale

| Token | Value | Usage |
|---|---|---|
| `sh-radius-sm` | 4px | Keyboard shortcut badge |
| `sh-radius-md` | 8px | Search bar, cards | 
| `sh-radius-icon` | 12px | Icon container in cards (rounded square) |
| `sh-radius-full` | 9999px | User avatar |

**The shell is the ONLY context where 8px+ radius is used.** This deliberately separates it from all three sub-systems (max 4–6px). The slightly softer corners signal "this is a home/launcher, not a work surface."

---

## Elevation / Shadow

| Token | Value | Usage |
|---|---|---|
| `sh-shadow-none` | `none` | Default card state — cards are transparent/borderless at rest |
| `sh-shadow-search` | `0 1px 3px rgba(0, 0, 0, 0.08)` | Search bar subtle shadow |
| `sh-shadow-search-focus` | `0 2px 8px rgba(0, 0, 0, 0.12)` | Search bar when focused |
| `sh-shadow-card-hover` | `0 2px 8px rgba(0, 0, 0, 0.08)` | Card hover state — appears on interaction only |

**Cards at rest have NO shadow and NO visible border** — they are quiet, transparent elements. On hover, they gain a subtle background tint and border. This creates a clean, uncluttered home screen.

---

## Density

The shell is intentionally low-density. There are only 3 cards and a search bar — the goal is comfortable navigation, not information density.

| Token | Value | Usage |
|---|---|---|
| `sh-search-height` | 48px | Search bar height |
| `sh-card-icon-size` | 48px | Icon container in card |
| `sh-card-padding` | 20px | Internal card padding |
| `sh-card-gap` | 24px | Gap between cards in grid |
| `sh-content-max-width` | 640px | Maximum content width — centered, readable |

---

## Iconography

| Aspect | Specification |
|---|---|
| **Card icons** | One per sub-system, displayed in a tinted rounded square |
| **Style** | Outline, 1.5px stroke, matching the sub-system's accent color |
| **Search icon** | 20px, inline at the start (end in RTL) of the search bar, `sh-text-placeholder` color |
| **User avatar** | 32px circle in header |

---

## Motion

| Token | Value | Usage |
|---|---|---|
| `sh-duration-fast` | 100ms | Search bar focus ring |
| `sh-duration-normal` | 200ms | Card hover background/border transition |
| `sh-duration-slow` | 300ms | Page transitions (future: navigating into a sub-system) |
| `sh-easing` | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard easing |

---

## What This Is NOT

The shell explicitly avoids:

- ❌ **Adopting any sub-system's accent color as primary** — the shell's interactive color is the OBSIDIAN GOLD brand, not Real Estate blue or Agriculture teal
- ❌ **Dense data layouts** — this is a launcher, not a workspace
- ❌ **Heavy chrome** — no thick sidebars, no tab bars, no breadcrumbs. Just a header, search, and cards.
- ❌ **Dashboard widgets** — no stats, no charts, no "recent items." The shell is a deliberate pause before entering a domain.
- ❌ **Glassmorphism, gradients, or decorative effects** — consistent with the overall anti-homogenization stance
- ❌ **"Coming soon" placeholder cards** — only the 3 real sub-systems appear. No stubs.
- ❌ **Dark mode as default** — light, welcoming, brand-forward
