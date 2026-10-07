# 02. Anti-Patterns (The "Anti-AI UI" Rulebook)

The following patterns represent the "2024–2026 AI-generated SaaS aesthetic." They are strictly **banned** from the Mkani ERP. If you see them, refactor them immediately.

### 🚫 1. Floating Cards & Soft Drop Shadows
Do not wrap every metric, table, or form in a white card with an 8px radius and a `rgba(0,0,0,0.05)` drop shadow. 
*Fix: Use strict 1px solid borders (Legal/Real Estate) or spatial grouping without borders (Agriculture).*

### 🚫 2. Glassmorphism & Backdrop Blurs
Do not use `backdrop-filter: blur()`. It degrades performance and belongs in consumer OS interfaces, not dense enterprise software.
*Fix: Use solid, opaque background colors.*

### 🚫 3. Gradients and "SaaS Purple/Indigo"
Do not use decorative gradients on buttons, headers, or backgrounds. Do not default to Indigo/Purple palettes unless explicitly defined in the brand tokens.
*Fix: Use solid, flat semantic colors.*

### 🚫 4. Generic Dashboard Drift
Do not default to a layout of `Sidebar + Header + 4 Stats Cards + 1 Line Chart + 1 Table`. This is the default structure of every template on the internet and fails to address specific domain workflows.
*Fix: Let the domain logic dictate the composition. (e.g., Legal needs a dense sidebar; Agriculture needs an edge-to-edge canvas).*

### 🚫 5. Oversized Border Radii
Do not use 12px–24px border radii. They create excessive trapped whitespace and soften the enterprise authority of the interface.
*Fix: Agriculture = 0px. Legal = 3px. Real Estate = 4px.*

### 🚫 6. Unnecessary Motion & Spring Physics
Do not use bouncy spring animations, animated gradients, or long (300ms+) hover transitions. 
*Fix: Motion must be functional, snap-fast (100ms-150ms), and linear/ease-out. Hover states should feel immediate.*

### 🚫 7. Excessive Whitespace
Do not use `padding: 24px` or `gap: 24px` by default. Enterprise users prefer density to avoid scrolling.
*Fix: Use compact spacing (`8px` to `16px` max for component internals).*

### 🚫 8. The "Icon-in-a-Circle" Metric
Do not default to displaying stats as a large number next to a pastel-colored circle containing an icon.
*Fix: Present data structurally. Use typography, alignment, and raw numbers.*
