# Design Tokens: Agriculture (Windows 8 Metro / Modern UI Era)

## Rationale & Inspiration
**Era / Style:** Windows 8 Metro / Modern UI (ca. 2012–2014)  
**Concrete References:** Windows 8 Start Screen, Windows Phone UI, early Microsoft PowerBI dashboards.

**Why this fits Agriculture:**  
Smart farming and greenhouse management rely heavily on monitoring: sensors (temp, EC, humidity), active crop cycles, alerts, and IoT states. The Metro design language was built entirely around "Content before Chrome" and the concept of "Live Tiles"—bold, highly visible blocks of color that display real-time data at a glance. For an agricultural worker monitoring a greenhouse on a tablet, or a manager looking at a dashboard from across the room, you don't want subtle gray shadows and low-contrast text. You want stark, flat, high-contrast visual indicators.

---

## 🎨 Color Tokens

The palette rejects subtle gradients and soft pastels in favor of unapologetically bold, highly saturated solid colors on a stark background.

### Base & Backgrounds
- `color-bg-app`: `#111111` (Deep, stark black. Metro dashboards often look best in true dark mode to make the colored tiles glow, representing an industrial IoT control panel)
- `color-bg-alt`: `#FFFFFF` (If used in light mode, the background is pure, stark white. No off-whites)

### The "Live Tile" Colors (Semantic & Bold)
*These colors form the actual UI components, not just accents.*
- `color-tile-temp`: `#E51400` (Vibrant Red - for temperature metrics or critical IoT alerts)
- `color-tile-humidity`: `#1BA1E2` (Vibrant Cyan/Blue - for water, EC, humidity)
- `color-tile-growth`: `#8CBF26` (Vibrant Lime Green - for crop cycles on track)
- `color-tile-warning`: `#F09609` (Vibrant Orange - for warnings, low nutrients)
- `color-tile-neutral`: `#333333` (Dark gray for inactive or standard data blocks)
- `color-tile-disabled`: `#555555` (Muted mid-gray for offline sensors or disabled buttons)
- `color-brand-action`: `#1BA1E2` (Standard interactive blue used for focus states and text buttons, matches humidity)

### Text & Contrast
- `color-text-primary`: `#FFFFFF` (On dark backgrounds/tiles)
- `color-text-secondary`: `#999999`
- `color-text-inverse`: `#000000` (For pure white backgrounds)

### Overlays (For Flat Hover/Active States)
- `color-overlay-hover`: `rgba(255, 255, 255, 0.15)` (White flash for hover on solid tiles)
- `color-overlay-pressed`: `rgba(0, 0, 0, 0.2)` (Darkening effect for pressed state)

---

## 🔤 Typography Tokens

Typography *is* the interface. Layouts are driven by massive differences in font size and weight, rather than boxes and lines.

### Font Families
- `font-family-primary`: `"Segoe UI", "Segoe UI Variable", "Open Sans", sans-serif` (A clean, humanist sans-serif with excellent numbers for sensor readings)
- `font-family-mono`: `"JetBrains Mono", monospace` (As requested by the global project rules, used for financial or exact metric outputs within the tiles)

### Scale & Weight
- `font-size-hero`: `48px` or `72px` (`font-weight: 200` - Extremely thin and massive. Used for the primary sensor reading, e.g., "24°C" taking up half the tile)
- `font-size-header`: `24px` (`font-weight: 300`)
- `font-size-body`: `14px` (`font-weight: 400`)
- `font-size-caption`: `11px` (`font-weight: 600`, uppercase - used for the label at the bottom corner of a tile)

---

## 📏 Spacing & Layout Tokens

The layout relies on a strict, masonry-style grid (the "Start Screen" effect).

- `space-grid-gap`: `8px` (The exact, rigid spacing between all tiles/components on the dashboard. It never changes)
- `space-tile-padding`: `16px`
- `space-page-margin`: `48px` (Generous left margin to align the typography flush-left across the whole application)

**Layout Philosophy:** Horizontal flow and strict grids. A "Greenhouse Workspace" is a grid of square and rectangular tiles. A 2x2 square might show the live temperature graph. A 1x1 square next to it shows humidity. Clicking a tile doesn't open a modal; it slides the entire view horizontally to drill down into the data.

---

## 📐 Elevation & Borders

Absolutely flat. Zero shadows.

- `border-radius-base`: `0px` (Completely square corners. This forces the UI to look digital and precise, unlike organic consumer apps)
- `border-width-base`: `0px` (Tiles don't have borders; they are solid blocks of color separated by the black or white background grid gap)
- `border-width-thin`: `2px` (Used for Metro-style form input underlines)
- `border-width-thick`: `4px` (Used for active tab indicators and thick text-button underlines)
- `shadow-base`: `none`
- `scale-hover`: `0.98` (Signature Metro slight shrink on hover)
- `scale-pressed`: `0.95` (Deeper shrink when actively clicking)

---

## 🧩 Component Philosophy

- **Sensor Dashboards:** Built as a grid of Live Tiles. A tile's background color dictates its status (green = good, red = alert). The massive thin typography tells you the exact number.
- **Data Tables (Crop Cycles & Inventory):** Radically minimalist. No vertical borders, no zebra striping. Just a thick horizontal line (`#333333`) separating rows. Massive amounts of negative space between columns to create alignment.
- **Buttons:** Simple rectangular blocks of color. No rounded corners. For secondary actions, they are just text with a thick underline on hover.
- **Alerts:** They don't appear as floating toasts. They appear as a full-width solid colored block pushing the content down from the top of the screen, demanding acknowledgment before proceeding (crucial for physical greenhouse control).
