# MKANY ERP — Design Research Log

> **Purpose**: Document the historical enterprise/ERP design systems studied, capture specific design characteristics from each, and justify the lineage assignment for each of the three MKANY sub-systems.
>
> **Date**: August 2026
>
> **Constraint**: Everything here intentionally avoids post-2021 AI-generated design homogenization — no soft gradients, no glassmorphism, no oversized rounded corners, no default purple/indigo, no floating blurred cards.

---

## Systems Studied

### 1. SAP Fiori — Belize Era (2016–2019)

**Source**: SAP Fiori Design Guidelines, Belize/Quartz theme documentation

| Aspect | Findings |
|---|---|
| **Color logic** | Neutral white/light-gray surfaces. SAP Blue (`#0070F2`) for primary interactive. Semantic colors for status (green/yellow/red). Muted, professional — never vibrant or decorative. |
| **Typography** | Proprietary "72" typeface — humanist sans-serif, optimized for truncation resistance and screen legibility. Productive hierarchy, not expressive. |
| **Spacing/density** | Two modes: Cozy (touch, 48px targets) and Compact (desktop, 32px row height). Predefined semantic spacing tokens (`sapUiTinyMargin` through `sapUiLargeMargin`). |
| **Tables/forms** | Responsive tables with header persistence. Dense list reports in Compact mode. Forms organized by semantic groups, not tabs. |
| **Radius** | 4px on cards, 2px on inputs. Deliberately restrained — "professional, not playful." |
| **Shadows** | Minimal: 1-level subtle shadow on cards for content/surface separation. Borders preferred over shadows for most elements. |
| **What makes it "enterprise"** | Role-based simplicity (1 user, 1 use case, 3 screens). Everything subordinate to the task. Zero decorative animation. |

**Verdict**: Good density model and spacing philosophy. The "Compact" mode thinking is directly applicable to MKANY's accountant-density needs. But SAP's visual identity is too tied to its own brand (the 72 typeface, the specific blue) to adopt wholesale.

---

### 2. Salesforce Lightning Design System — Original (2015–2019)

**Source**: SLDS documentation, design token archives

| Aspect | Findings |
|---|---|
| **Color logic** | White surfaces, `#0070D2` (Salesforce Blue) as primary action. Bold "pops" of color used semantically, not decoratively. Neutral grays for structure. Status colors: green (#4BCA81), yellow (#FFB75D), red (#C23934). |
| **Typography** | System fonts (SF Pro, Segoe UI, Roboto) — no custom typeface. Clear size scale: 12/13/14/16/20/24px. Weight used for hierarchy, not decoration. |
| **Spacing/density** | 8px base grid. Compact tables for data-heavy views. Card-based layouts with generous but structured whitespace. |
| **Tables/forms** | Data tables with sorting, inline editing, row-level actions. Forms use horizontal label placement for density. |
| **Radius** | 4px on cards and inputs. Consistent, never large. |
| **Shadows** | Subtle 2-level system: cards get a light shadow, modals get a heavier one. Never blurry or dramatic. |
| **What makes it "enterprise"** | Deal-pipeline-driven layout (Kanban + list views). Every element serves a CRM workflow. Heavy reliance on "record pages" with related lists. |

**Verdict**: The deal-driven, record-page model maps well to Real Estate (property as deal, contract as record). The Kanban pipeline + dense table combo is exactly what unit inventory and installment tracking need. Strong candidate for the Real Estate sub-system.

---

### 3. IBM Carbon Design System — v10 (2019–2024)

**Source**: Carbon Design System documentation, design philosophy articles

| Aspect | Findings |
|---|---|
| **Color logic** | Cool Gray scale (Gray-10 through Gray-100). IBM Blue-60 (`#0F62FE`) for primary interactive. Muted, desaturated palette. Semantic tokens: `$text-primary`, `$interactive-01`. |
| **Typography** | IBM Plex (Sans, Serif, Mono) — designed for "credible" reading. Two scales: Productive (14px base, tight hierarchy) and Expressive (editorial, larger). |
| **Spacing/density** | Strict 2px/4px/8px token scale. "Productive density" — deliberately tighter than consumer design. 2x grid system for layout. |
| **Tables/forms** | Structured data tables with fixed headers, sortable columns. Compact and default density modes. Forms follow a strict vertical layout with grouped sections. |
| **Radius** | 0px on many elements (sharp corners). 4px only on specific interactive elements. Intentionally angular. |
| **Shadows** | **Shadow-averse.** Hierarchy created through surface color layering (stacking progressively darker grays) rather than box-shadow. |
| **What makes it "enterprise"** | Information architecture disguised as a design system. Everything serves data density and task completion. Zero decorative elements. |

**Verdict**: The sharp-cornered, shadow-averse, layer-through-color philosophy is the perfect match for Legal. Case management needs zero ambiguity, zero decoration — just document-dense, serious UI. Carbon's "productive" scale maps directly to the case workspace concept. **Strong candidate for Legal sub-system.**

---

### 4. Microsoft Metro/MDL2 — Windows 8 Era (2012–2015)

**Source**: Microsoft Design Language documentation, Windows Dev Center archives

| Aspect | Findings |
|---|---|
| **Color logic** | Flat, vibrant accent colors (teal, magenta, lime, orange) on neutral dark or white surfaces. Color as identity marker, not decoration. |
| **Typography** | Segoe UI Light as primary display. Typography-driven navigation — type IS the interface, not decoration on it. |
| **Spacing/density** | Grid-based tile system. High density of information per tile, but each tile is self-contained. |
| **Radius** | 0px — completely sharp corners. This was a defining characteristic. |
| **Shadows** | Zero. Completely flat. Hierarchy through color value only. |
| **What makes it "enterprise"** | "Content before chrome" — strip away all UI decoration to let data speak. Fast and fluid transitions. |

**Verdict**: The flat/sharp/typography-first philosophy is interesting but too strongly associated with its era. The zero-shadow approach is relevant for the Legal sub-system design (reinforces Carbon's choices). The tile metaphor doesn't map well to any of the three domains.

---

### 5. Ant Design — Early Era (1.x/2.x, 2016–2018)

**Source**: Ant Design documentation, design principles

| Aspect | Findings |
|---|---|
| **Color logic** | HSB-based color system. Primary blue (`#1890FF`). Functional colors for status. Systematic palette generation through mathematical formulas. |
| **Typography** | System fonts. Clear hierarchy: 12/14/16/20/24/30px. 1.5715 line-height for Latin. Chinese-optimized spacing. |
| **Spacing/density** | 8px grid. "Beauty of order" — systematic alignment and proximity. Tables designed for maximum data per screen. |
| **Tables/forms** | ProTable — filterable, sortable, paginated, inline-editable. The cornerstone component. Dense by default. |
| **Radius** | 2px in early versions (very tight). Later moved to 4px. |
| **Shadows** | Minimal — flat with subtle 1px borders as the primary separation method. |
| **What makes it "enterprise"** | Component-first methodology for admin/back-office. Every component designed for B2B density. |

**Verdict**: The systematic, density-first approach is useful reference material. The table-as-centerpiece philosophy directly maps to MKANY's "Tables are the most important component" principle. However, Ant Design is now so widely adopted that using it as a primary lineage would produce a recognizable "Ant Design look" — which is exactly the homogenization we're avoiding.

---

### 6. Bloomberg Terminal

**Source**: Bloomberg design engineering talks, UX analysis articles

| Aspect | Findings |
|---|---|
| **Color logic** | Dark background (#000000 or near-black). Sparse, semantic color: green for up, red for down, amber for alerts, blue for informational. Color is information, never decoration. |
| **Typography** | Monospace as primary (historical: pixel-grid fonts; modern: custom TrueType by Matthew Carter). Perfect vertical/horizontal alignment in data grids. |
| **Spacing/density** | Maximum density. Minimal negative space. Every pixel carries information. |
| **Tables** | Grid-based data presentation. Columns align to the character. Numbers are the UI. |
| **Radius** | 0px. No rounded anything. |
| **Shadows** | None. Separation through color and borders only. |
| **What makes it "enterprise"** | Expert-system design. Keyboard-first. Speed over aesthetics. The user is assumed to be a professional who needs data, not guidance. |

**Verdict**: The extreme-density, monospace-first, keyboard-driven philosophy is directly relevant to MKANY's financial data display requirements (monospace numbers, right-aligned, vertical alignment). Elements of this philosophy should inform all three sub-systems' number handling, but it's too extreme as a wholesale lineage for any single one.

---

### 7. Odoo ERP — Pre-v17 (v14–v16, 2020–2023)

**Source**: Odoo community documentation, SCSS variable analysis

| Aspect | Findings |
|---|---|
| **Color logic** | Neutral (white surfaces, light gray backgrounds). Status colors: green (done), orange (draft), red (late). Deep blue for headers. |
| **Typography** | System sans-serif or Lato. Readability-first at small sizes. Clean hierarchy for data-heavy views. |
| **Density** | High density for accounting/inventory power users. Border-defined containers. Flat aesthetic. |
| **Tables** | List views with Kanban alternatives. Inline editing. Filter/group-by bar as primary interaction. |
| **Radius** | 3–4px. Consistent but unremarkable. |
| **What makes it "enterprise"** | Module-based consistency. Every screen follows the same pattern regardless of domain. Control panel + search + list/kanban. |

**Verdict**: Useful as a baseline ERP reference but too generic to serve as a distinctive lineage. The module-consistency approach is good architecture but doesn't produce a memorable visual identity.

---

### 8. NetSuite — Classic UI (Pre-2020)

**Source**: NetSuite documentation, SuiteScript UI analysis

| Aspect | Findings |
|---|---|
| **Color logic** | Blue-gray header bar. Neutral professional palette. Color banners to distinguish environments (production/sandbox). |
| **Typography** | Open Sans default. Standard web hierarchy. |
| **Density** | Very high — "clunky" density. Vertical tabs for record organization. Filters at bottom of lists. |
| **What makes it "enterprise"** | Maximum data per screen. Power-user first. Tab-heavy record pages. |

**Verdict**: The density is instructive but the interface is dated rather than intentional. Not a lineage to adopt, but the "record page with vertical tabs" pattern is relevant to the Real Estate contract page.

---

### 9. Domain-Adjacent: Clio (Legal Practice Management, Pre-2021)

**Source**: Clio blog, product evolution documentation

| Aspect | Findings |
|---|---|
| **Color logic** | Professional blues, whites, grays. Accent colors for actionable items (timers, "New Case" buttons). Trust-conveying palette. |
| **Typography** | Readability-optimized for scanning long lists of matters, time entries, invoices. |
| **Density** | Evolved from simple to consolidated "all-in-one" — tabbed navigation, sidebars for quick actions, matter-centric views. |
| **What makes it "legal"** | Everything organized around the Matter. Quick-start timer always accessible. Deadlines as primary data. |

**Verdict**: The matter-centric organization directly informs MKANY's Legal "Case Workspace" (single page with everything). The timer/deadline emphasis maps to the hearing notification system. Not a visual lineage to copy, but the interaction patterns are gold.

---

### 10. Domain-Adjacent: SCADA/HMI — ISA-101 High-Performance (2015–2020)

**Source**: ISA-101 standard documentation, HMI design guidelines

| Aspect | Findings |
|---|---|
| **Color logic** | Grayscale base (#D9D9D9 backgrounds). Color ONLY for exceptions. Red = critical alarm, Amber = warning, Blue = informational, Gray = normal operation. |
| **Typography** | Clean sans-serif, optimized for numerical clarity (distinct 0/O, 1/I characters). |
| **Density** | Task-based layouts. 4-level display hierarchy: Overview → Area → Detail → Diagnostic. |
| **What makes it "operational"** | The "everything normal is gray, everything abnormal screams" philosophy. Decision-support tool, not data display. Color blindness accommodated (shape + text, never color alone). |

**Verdict**: **The ISA-101 philosophy — grayscale normal state with color reserved for exceptions — is the perfect match for Agriculture monitoring.** Greenhouse sensor data should be calm/neutral when normal and alarming only when thresholds are breached. This is a fundamentally different color philosophy from the other two sub-systems. **Strong candidate for Agriculture sub-system.**

---

### 11. Domain-Adjacent: FarmLogs/Granular & Climate FieldView (2018–2019)

**Source**: Product analysis, AgTech SaaS design patterns

| Aspect | Findings |
|---|---|
| **Color logic** | "Agricultural greens," neutral white/gray backgrounds, functional blues and oranges for UI elements. High contrast for outdoor visibility. |
| **Typography** | Readable at arm's length (mobile-first for field use). Large tap targets. |
| **Density** | Map-centric views. Card-based sensor data. Trend-line-first visualization. |
| **What makes it "agricultural"** | Map as primary navigation anchor. Sensor data in modular cards. "At-a-glance" metrics. Designed for the cab of a tractor, not a desk. |

**Verdict**: The map-centricity and card-based sensor data presentation are directly relevant to MKANY's Agriculture greenhouse monitoring. The "trend not value" principle from the MKANY constitution matches FarmLogs' approach perfectly.

---

### 12. AdminLTE 2 — Classic Era (2015–2017)

**Source**: AdminLTE documentation, Bootstrap 3 era design patterns

| Aspect | Findings |
|---|---|
| **Color logic** | Multiple color skins (blue, black, green). Flat design with clear status indicators. |
| **Typography** | Google Fonts, optimized for dashboard readability. |
| **Density** | Data-dense CRUD layouts. DataTables integration for enterprise tables. |
| **What makes it "enterprise"** | The "classic admin dashboard" pattern: sidebar + header + content area. Pre-built pages for every back-office need. |

**Verdict**: Useful as historical context for what "admin dashboard" looked like before the AI aesthetic took over. The sidebar-content-header pattern remains the correct shell for back-office software.

---

## Lineage Assignments

### Real Estate → Salesforce Lightning Design System (Original, 2015–2019)

**Justification**: Real Estate is deal-driven software. Properties move through a pipeline (available → reserved → contracted → sold) exactly like Salesforce opportunities move through stages. The "record page with related lists" pattern maps directly to the Contract page (contract terms + installment schedule + collections + documents + timeline — all on one page as related lists). Salesforce's Kanban view is the natural fit for unit inventory visualization. The color philosophy (white surfaces, bold action blue, semantic status colors, generous but structured density) projects the authority a real estate brokerage needs without being heavy-handed. The 4px radius and subtle single-level shadows create a professional, modern-but-not-trendy appearance that will age well.

### Legal → IBM Carbon Design System v10 (2019–2024)

**Justification**: Legal case management is the most document-dense, zero-ambiguity domain in MKANY. IBM Carbon's design philosophy — sharp corners (0–4px radius), no decorative shadows (hierarchy through surface layering), strict spacing tokens, productive-scale typography — produces exactly the serious, institutional tone that legal software demands. The shadow-averse approach means the interface feels like a structured document rather than a collection of floating cards. Carbon's cool gray palette communicates impartiality and precision. The "productive density" mode serves the case workspace where a lawyer needs to see hearing dates, deadlines, documents, fees, and notes simultaneously without scrolling. Zero frivolity, zero ambiguity — everything Carbon was designed for.

### Agriculture → SCADA/ISA-101 High-Performance HMI + AgTech (2015–2020)

**Justification**: Agriculture's greenhouse monitoring is fundamentally an operational monitoring system — it shares more DNA with industrial control interfaces than with traditional ERP software. The ISA-101 principle of "grayscale normal, color only for exceptions" is exactly right: when a greenhouse is operating normally, the dashboard should be calm and neutral; when temperature exceeds a threshold or pH drops below range, that exception should scream visually. This is the opposite of the typical "everything green means good" pattern — instead, normal is gray/neutral, and ANY color means something requires attention. Crop cycles and sensor data need map-centric and trend-line-first visualization inherited from AgTech tools like FarmLogs/Climate FieldView. The result is a sub-system that looks fundamentally different from both Real Estate and Legal — not through superficial color changes, but through a genuinely different information-display philosophy.

---

## Visual Distinctiveness Check

| Trait | Real Estate | Legal | Agriculture |
|---|---|---|---|
| **Primary accent** | Action Blue (#0070D2) | Cool IBM Blue (#0F62FE) — darker, more muted | Teal (#00897B) — operational, not corporate |
| **Surface philosophy** | White cards with subtle shadow | Layered grays, no shadow | Medium gray (#D9D9D9) base, color = exception |
| **Corner radius** | 4px (professional, modern) | 0–2px (sharp, institutional) | 2px (utilitarian, industrial) |
| **Typography feel** | Clean, deal-focused | Dense, document-focused | Operational, monitoring-focused |
| **Density default** | Medium (visual inventory needs space) | High (case workspace is dense) | Mixed (overview calm, alerts dense) |
| **Animation philosophy** | Smooth transitions (pipeline movement) | Instant/utilitarian (no waiting on legal data) | Functional only (alarm attention-getting) |
| **What it resembles** | A professional CRM platform | An institutional document system | An industrial control room |

These three are visibly distinct not just in color but in spatial philosophy, elevation model, and information hierarchy. A user moving between them will feel the domain shift immediately.

---

## Shell Layer Note

The root shell page (the "OS" layer above all three) needs its own neutral identity. It should not adopt any sub-system's visual language. The shell draws from the **macOS Launchpad / Windows Start Screen** metaphor — a quiet, centered, application-launcher pattern with no heavy chrome. Its own token set will use a warm neutral palette (not the cool grays of Legal or the white surfaces of Real Estate) to feel like a distinct "home" rather than a sub-system.

---

## Addendum: Agriculture Lineage Revision (August 2026)

### Why the change

The original Agriculture lineage (SCADA/ISA-101 HMI) was well-researched and the exception-driven color philosophy was correct, but the resulting dark/heavy industrial aesthetic was wrong for daily-use ERP software. A greenhouse operations manager uses this system all day alongside Real Estate and Legal — it needs to feel operational without feeling like a power plant control room. The dark canvas was too heavy, too alien relative to the other two sub-systems, and too reminiscent of the "dark dashboard" trend rather than genuine enterprise software.

### Additional research: light-theme industrial and agricultural monitoring

**ISA-101 light-canvas standard (re-examined)**

The original interpretation skewed dark, but ISA-101 actually recommends a **light/medium gray background at 60–70% intensity (~#C0C0C0 to #DDDDDD)**. The standard says:

- Background should be "subdued, neutral" to reduce glare and eye fatigue
- The goal is an achromatic base where colored alarms naturally "pop"
- Equipment and normal-state elements should be rendered in muted, desaturated tones
- High-contrast saturated colors are reserved exclusively for abnormal conditions

This is the same exception-driven color principle — it was never inherently dark. Many real-world SCADA implementations (Ignition Perspective, WinCC, FactoryTalk) ship with light-gray default themes and only use dark themes in dimly-lit control rooms.

**Granular Insights / Corteva (2019–2020)**

Granular's enterprise AgTech platform used a clean, professional light-themed interface with white backgrounds, left-hand sidebar navigation, and high-contrast data displays. Field-level performance data, yield comparisons, and cost analysis were presented on bright, neutral surfaces with color reserved for data visualization (map layers, charts) rather than surface decoration. This is a "professional utility" aesthetic — functional, data-dense, but bright and office-appropriate.

**Ignition Perspective light themes (2021–2022)**

Inductive Automation's Ignition SCADA platform ships `light`, `light-warm`, and `light-cool` themes for its Perspective module. These use `--page-background: #E0E0E0` or similar light-gray values, muted process graphics, and reserve bright color strictly for alarms. This proves that the ISA-101 exception-color model works perfectly well on light canvas.

**Energy/utility monitoring dashboards (2019–2020)**

Enterprise energy monitoring software consistently uses light themes with white/light-gray backgrounds, teal/blue accent colors for interactive elements, and ISA-101-aligned alarm colors (red=critical, amber=warning, blue=info). Cards organize sensor readings into scannable groups. Typography is clean sans-serif at high contrast against the light background.

### Revised lineage decision

**Agriculture → Light ISA-101 + Granular AgTech SaaS (2019–2020)**

The new lineage keeps the ISA-101 exception-driven color model (normal=neutral, color=alarm) but applies it to a **light canvas** informed by Granular/AgTech SaaS surface treatment. The result is:

- **Light warm-gray background** (#F0F0F0) with white content surfaces — professional, office-appropriate, all-day-usable
- **Teal primary** (#00897B) retained — still operational, still distinct from Real Estate blue and Legal blue
- **Same alarm color system** — red/amber/blue for exceptions, gray for normal state
- **The "absence of color = normal" principle preserved** — sensor cards in normal state remain borderless/neutral, not decorated with green
- **Surface and spacing treatment drawn from Granular/AgTech** — clean cards, structured grids, data-dense but not cramped

The key difference from the previous version: the page background moves from industrial medium-gray (#EEEEEE + darker panels) to a warm light-gray (#F0F0F0) with white surface cards. This brings it into the same "brightness family" as Real Estate and Legal without matching either — RE uses #F4F6F9 (cool-tinted), Legal uses #F4F4F4 (pure neutral), Agriculture uses #F0F0F0 (slightly warmer). Three distinct grays.

### Updated Visual Distinctiveness Check

| Trait | Real Estate | Legal | Agriculture (revised) |
|---|---|---|---|
| **Primary accent** | Action Blue (#0070D2) | Cool IBM Blue (#0F62FE) | Teal (#00897B) |
| **Surface philosophy** | White cards + subtle shadow | Gray layers, no shadow | White cards + 1px border, minimal shadow |
| **Background** | #F4F6F9 (cool) | #F4F4F4 (neutral) | #F0F0F0 (warm) |
| **Corner radius** | 4px (professional) | 0–2px (sharp, institutional) | 3px (utilitarian) |
| **Color model** | Always-visible status colors | Functional-only color | Exception-only color (normal=gray) |
| **Density default** | Medium | High | Mixed-by-context |
| **What it resembles** | A professional CRM | An institutional document system | A field-operations utility platform |
