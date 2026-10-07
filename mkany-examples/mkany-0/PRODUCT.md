# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

static HTML/CSS

## Users
Enterprise users in the Middle East operating across diverse sectors (Central Hub, Legal, Real Estate, Smart Agriculture). Users include executives, lawyers, property managers, and agricultural supervisors who require high-density, rigorous data interfaces without cognitive overload.

## Product Purpose
A unified ERP (Enterprise Resource Planning) ecosystem named "MKANY" (مكاني). It connects multiple distinct business sectors under one central hub, allowing seamless switching and data management while maintaining sector-specific operational workflows.

## Positioning
A highly crafted, sector-adaptive ERP that rejects generic SaaS templates. It provides "out-of-distribution" high-end design specific to each vertical (e.g., Legal as a rigid, clinical "Dossier"; Hub as a distinct premium aesthetic) while maintaining a unified global navigation system.

## Operating Context
Professional, high-stakes environments where clarity, data density, and urgency matter. Workflows involve cross-referencing documents, tracking timelines, and managing assets. The interface must support right-to-left (RTL) Arabic reading patterns natively.

## Capabilities and Constraints
- **Global Constraints:** Light mode only (no dark mode, no dark surfaces). No sidebars; top navbar only with a universal project switcher.
- **Typography:** Arabic (`dir="rtl"`) using the 'Cairo' font. No uppercase transforms on Arabic text. Western numerals wrapped in `<bdi>`.
- **Aesthetic Bans:** No "glassmorphism", no "AI-generic/Linear-clone" templates, no outdated flat corporate looks, no generic Tailwind defaults.

## Brand Commitments
- **Name:** MKANY (مكاني)
- **Visual Identity:** Each sector earns its own bespoke visual language tailored to its function, not just a reshuffled template with different colors.
- **Current Sector Identities:**
  - *Legal (الشؤون القانونية):* High-craft, clinical "Dossier/Briefing" layout. Monochrome foundation (`#FAFAFA`, `#FCFCFC`, `#FFFFFF`) with crisp structural borders, using semantic accents only for focus (`#FDE047`) and alerts (`#E11D48`). Use high-quality SVG icons, not CSS hacks.

## Evidence on Hand
- Completed Hub module layout.
- Completed Real Estate module layout.
- Completed Legal module layout featuring architectural timeline tracks, document grids, and tabular monospace data blocks.
- Smart Agriculture module pending.

## Product Principles
1. **Uncompromising Arabic Typography:** Native RTL flow and font handling without shoehorning into Western typographic hacks.
2. **Distinctive Sector Aesthetics:** Each module's UI must logically derive from its specific domain's requirements (e.g., legal dossiers vs. real estate catalogs).
3. **Restraint and Craft:** Sophisticated editorial hierarchy, deliberate spacing, and subpixel-perfect borders over generic UI containers and padding.
4. **Structural Containment:** Content must not float; it requires bounded blocks and clear visual logic that reads as software, not just digitized paper.

## Accessibility & Inclusion
- Proper contrast ratios against white/light backgrounds.
- Clear distinction between red-alert and yellow-focus for colorblind users.
