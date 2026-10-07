# MKANY ERP: Real Estate Design Tokens

## A. Design Concept
The Real Estate domain is an editorial gallery. It is airy, architectural, and highly visual. It relies on massive whitespace, extreme typographic contrast, soft directional lighting (shadows), and sharp, constructed corners to frame high-end property photography.

## B. Color Tokens (Light Mode Only)
Colors are drawn from architectural finishes—plaster, copper, and charcoal.

| Token | Hex Value | Usage / Rationale |
|-------|-----------|-------------------|
| `re-bg` | `#FDFBF7` | Gallery Off-white. A very bright, warm plaster color to reflect light. |
| `re-surface` | `#FFFFFF` | Pure white for property cards, acting as a pristine frame. |
| `re-primary` | `#1A1E23` | Deep Charcoal for extreme contrast against the gallery background. |
| `re-border` | `#EAE6DF` | Delicate, crisp line-work. |
| `re-accent` | `#C86A4C` | Terracotta / Copper. Evokes brick and high-end finishes. |
| `re-text` | `#4A4B50` | Medium slate for secondary text to not compete with photography. |
| `re-success` | `#2D7A5D` | Forest green for "Available" units. |

## C. Typography Tokens
* **Font Pairing**: **Playfair Display** (Latin Display) / **Tajawal** (Arabic) / **Inter** (Latin UI).
* **Scale & Hierarchy**: Extreme contrast. Massive, light-weight serifs paired with tiny, tracked-out sans-serif labels.
  * `re-display`: 40px (Playfair/Tajawal Light) - Huge, elegant headers.
  * `re-title`: 18px (Inter/Tajawal SemiBold)
  * `re-label`: 11px (Inter, Uppercase, 2px letter-spacing) - Architectural labels.

## D. Structural & Layout Tokens (The Divergence)
* **Background/Surface**: Gallery Plaster vs Pure White.
* **Border Treatment**: **Delicate**. `1px solid #EAE6DF`. Used sparingly to frame elements like a museum piece.
* **Shadow/Elevation**: **Soft & Long**. `0 12px 40px rgba(0,0,0,0.04)`. Cards physically float off the page, simulating architectural gallery lighting.
* **Radius Scale**: **4px**. Constructed, sharp but safe. Feels like a built structure, completely avoiding the "bubbly" feel of Agriculture.
* **Spacing Density**: **Spacious / Gallery**. The base unit is 8px. Cards have massive 32px or 48px padding. Elements are given extreme breathing room.
* **Nav Pattern**: **Top Navbar with Mega-menu**. Maximizes vertical space for viewing properties and scrolling long horizontal installment schedules.
* **Silhouette**: Floating, framed gallery artwork.

## E. Concrete Component Example: Real Estate Property Card
```css
/* RE cards are floating, delicately bordered, sharp-cornered, and extremely spacious */
.re-card {
  background-color: #FFFFFF;
  border: 1px solid #EAE6DF; /* Delicate frame */
  border-radius: 4px; /* Architectural corners */
  padding: 32px; /* Gallery spacing */
  box-shadow: 0 12px 40px rgba(0,0,0,0.04); /* Floating elevation */
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.re-card-title {
  font-family: 'Playfair Display', serif;
  font-weight: 300; /* Light weight */
  font-size: 28px; /* Extreme scale contrast */
  color: #1A1E23;
}
```

## F. Iconography & Imagery
* **Icons**: 1px weight, ultra-thin, geometric (resembling blueprints or architectural drafts).
* **Imagery**: Hero photography is mandatory. The UI is designed specifically to recede and let the property photos act as the primary visual interest.
