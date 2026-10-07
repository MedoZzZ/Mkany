# MKANY ERP: Smart Agriculture Design Tokens

## A. Design Concept
The Agriculture domain is grounded, tactile, and deeply connected to physical farming. It feels like a working farm tool, not a tech dashboard. It relies on earthy undertones, thick tactile borders, zero shadows, and organic curves. 

## B. Color Tokens (Light Mode Only)
Colors are drawn directly from soil, crops, and natural sunlight.

| Token | Hex Value | Usage / Rationale |
|-------|-----------|-------------------|
| `ag-bg` | `#EBE8DF` | Earthy Sand/Burlap. A grounded, natural canvas color with depth. |
| `ag-surface` | `#F6F5F0` | Parchment/Canvas for cards. Distinct from pure white, keeping the glare down. |
| `ag-primary` | `#3A7D44` | Living Green. A rich, organic green resembling healthy crop leaves. |
| `ag-border` | `#D6D2C4` | Thick, earthy tan for borders, separating elements physically rather than digitally. |
| `ag-accent-sun` | `#E5A93D` | Harvest Gold for lighting/temperature readings. |
| `ag-text` | `#2D3D33` | Deep forest charcoal for text—softer and more earthy than pure black. |
| `ag-danger` | `#C13A3A` | A natural rust-red for critical alerts. |

## C. Typography Tokens
* **Font Pairing**: **Readex Pro** (Arabic & Latin UI) / **JetBrains Mono** (Data). Readex Pro is warm, legible, and organic.
* **Scale & Hierarchy**: Medium weights, low contrast between sizes.
  * `ag-title`: 20px (Readex Pro Medium) - Friendly, not massive.
  * `ag-sensor-value`: 32px (JetBrains Mono Regular) - Right-aligned financial/sensor data.
  * `ag-body`: 14px (Readex Pro Regular)

## D. Structural & Layout Tokens (The Divergence)
* **Background/Surface**: Sand vs Parchment. No pure white.
* **Border Treatment**: **Thick & Earthy**. `2px solid #D6D2C4`. Every component is physically bound by a sturdy border.
* **Shadow/Elevation**: **None**. Completely flat. Shadows feel digital and ephemeral; this UI is tactile and grounded on the dirt.
* **Radius Scale**: **16px** for cards, **100px** for buttons. Organic, pill-like, safe for gloved fingers on mobile devices.
* **Spacing Density**: **Relaxed / Chunky**. The base unit is 12px. Cards have 24px chunky padding.
* **Nav Pattern**: **Persistent Thick Sidebar**. A heavy, 2px-bordered sidebar on the side, filled with organic icons (sprouts, droplets).
* **Silhouette**: Grounded, thick-bordered tactile tile.

## E. Concrete Component Example: Agriculture Sensor Card
```css
/* Ag cards are flat, heavily bordered, pill-rounded, and parchment-colored */
.ag-card {
  background-color: #F6F5F0;
  border: 2px solid #D6D2C4; /* Thick, tactile border */
  border-radius: 16px; /* Organic curves */
  padding: 24px; /* Chunky padding */
  box-shadow: none; /* Absolutely flat, grounded */
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ag-card-title {
  font-family: 'Readex Pro', sans-serif;
  font-weight: 500;
  font-size: 20px; /* Warm, medium size */
  color: #2D3D33; /* Earthy text */
}
```

## F. Iconography & Imagery
* **Icons**: 2px weight, heavily rounded terminals, depicting physical farm elements.
* **Imagery**: High-quality photography of soil, real crops, and sunlit greenhouses. Forms use thick `2px` borders and no background fills.
