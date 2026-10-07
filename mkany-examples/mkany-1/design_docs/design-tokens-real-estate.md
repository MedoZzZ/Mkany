# Design Tokens: Real Estate (Salesforce Lightning 1.0 Era)

## Rationale & Inspiration
**Era / Style:** Early Enterprise CRM Modular Design (ca. 2015–2016)  
**Concrete References:** Salesforce Lightning Design System 1.0 (SLDS), early Microsoft Dynamics CRM (2015).

**Why this fits Real Estate:**  
The Real Estate module is fundamentally a CRM and pipeline management tool. You are dealing with viewings, reservations, multi-stage contracts, and sales commissions. In 2015, Salesforce pioneered the "Lightning" aesthetic precisely to solve the problem of dense, legacy CRM data. The design language emphasizes "Clarity, Efficiency, Consistency, and Beauty." It steps away from the soft, borderless, floating-card look of modern AI dashboards and instead relies on crisp, explicitly bounded components, strict label-to-data hierarchies, and structural "Lightning Blue" accents. It feels like a high-performance sales tool.

---

## 🎨 Color Tokens

Instead of generic pastels, these colors are intentional, high-contrast, and focused on drawing the eye to calls-to-action and pipeline progression.

### Base & Backgrounds
- `color-bg-canvas`: `#F4F6F9` (A very crisp, cool off-white for the main application canvas)
- `color-bg-surface`: `#FFFFFF` (Strict white for all cards, forms, and tables)
- `color-bg-header`: `#FFFFFF` (Headers are flat and white, separated from canvas by a rigid border, not shadow)
- `color-bg-disabled`: `#C9C7C5` (Standard SLDS disabled gray)
- `color-overlay-scrim`: `rgba(8, 7, 7, 0.6)` (Dark semi-transparent overlay for modals)

### Brand & Interactive
- `color-brand-primary`: `#0070D2` (Classic "Lightning Blue" – used strictly for primary actions and active states)
- `color-brand-hover`: `#005FB2`
- `color-brand-active`: `#00396B`

### Borders (Critical for this era)
- `color-border-divider`: `#DDDBDA` (Used everywhere. Cards don't float; they are bounded by this crisp gray line)
- `color-border-input`: `#B0ADAB`

### Text & Hierarchy
- `color-text-default`: `#080707` (Near black, very sharp)
- `color-text-label`: `#3E3E3C` (Used for the small, all-caps field labels typical of this era)
- `color-text-placeholder`: `#706E6B`

### Semantic / Pipeline Status
- `color-status-sold-bg`: `#04844B` (Forest Green - High contrast solid badge)
- `color-status-reserved-bg`: `#FFB75D` (Solid warm yellow)
- `color-status-available-bg`: `#0070D2` (Primary blue)
- `color-status-blocked-bg`: `#C23934` (Brick red, urgent)
- `color-status-blocked-hover`: `#A61A14` (Darker brick red for hover states)

---

## 🔤 Typography Tokens

Typography in this era was all about distinguishing metadata (labels) from actual data (values).

### Font Families
- `font-family-sans`: `"Salesforce Sans", Helvetica, Arial, sans-serif` (A workhorse, highly legible sans-serif. No Inter, no geometric circular fonts.)
- `font-family-mono`: `"Consolas", "Courier New", monospace` (Used strictly for contract numbers, IDs, and financial installments).

### Scale & Weight
- `font-size-heading-lg`: `1.5rem` (24px) - Page titles.
- `font-size-heading-sm`: `1rem` (16px) - Card titles, bolded (`font-weight: 700`).
- `font-size-body`: `0.875rem` (14px) - Standard table data and input text.
- `font-size-label`: `0.75rem` (12px) - **CRITICAL:** Field labels are small, uppercase, and tracked out (`letter-spacing: 0.0625rem`).

---

## 📏 Spacing & Layout Tokens

Spacing is rigid and grid-based, lacking the "airy" feel of modern consumer apps to maximize screen real estate for sales data.

- `space-xxs`: `0.125rem` (2px)
- `space-xs`: `0.25rem` (4px)
- `space-sm`: `0.5rem` (8px)
- `space-md`: `1rem` (16px) - Standard padding inside cards and tables.
- `space-lg`: `1.5rem` (24px) - Spacing between layout columns.

**Layout Philosophy:** Strict column grids. A unit page is not a fluid document; it is a rigid 2-column or 3-column layout where data points are aligned perfectly.

---

## 📐 Elevation & Borders

Modern AI apps use 16px border radii and 10% opacity diffused shadows. We do the opposite here.

- `border-radius-base`: `0.25rem` (4px) - Just enough to take the sharp edge off, but still looks like enterprise software.
- `border-radius-pill`: `15rem` (For status badges only).
- `border-width-thin`: `1px` (Used abundantly).
- `border-width-thick`: `2px` (Used for specific structural separations, like table headers).
- `shadow-card`: `none` - **No shadows on cards.** Cards are defined by a 1px solid border (`#DDDBDA`).
- `shadow-dropdown`: `0 2px 3px 0 rgba(0, 0, 0, 0.16)` - Very tight, harsh shadow only used for floating menus, not layout elements.
- `shadow-focus`: `0 0 3px var(--color-brand-primary)` - Signature SLDS focus ring.

---

## 🧩 Component Philosophy

- **Data Tables:** Highly structured. Columns have a bottom border on the header, and horizontal lines between rows. No zebra striping. Actions are hidden until row hover to reduce visual clutter.
- **Forms & Record Details:** The defining characteristic is the **stacked label/value pair**. Labels are tiny, uppercase, and gray. Values are 14px, dark, and sit tightly below the label. This allows immense data density for a "Unit Details" page.
- **Unit Inventory Maps:** Visualized as a strict grid of squarish cards. The status color doesn't just tint the card; it forms a thick, solid color bar at the top or left edge of the card to make availability instantly scannable.
- **Navigation:** A rigid, fixed sidebar with small, crisp SVG icons. No active state background color blobs—just a crisp blue vertical line on the active item's left edge.
