# MKANY ERP: Theme Structural Divergence

To guarantee the MKANY ERP themes do not degrade into a single UI with a color swap, this document proves structural divergence across all critical axes. If a developer attempts to build these using a single set of shared CSS variables with only the primary color overridden, the design will fail. Each theme requires its own fundamentally different layout, spacing, typography, and component geometry.

## The Proof of Divergence

| Characteristic | Agriculture (Grounded/Farm) | Real Estate (Editorial/Gallery) | Legal (Strict/Document) |
|---|---|---|---|
| **Background Color** | `#EBE8DF` (Earthy Sand/Burlap) | `#FDFBF7` (Gallery Off-white) | `#F3F4F6` (Cool Slate/Steel Gray) |
| **Surface Color** | `#F6F5F0` (Canvas/Parchment) | `#FFFFFF` (Pure White) | `#FFFFFF` (Pure White) |
| **Border Treatment** | Soft, thick, earthy (`2px solid #D6D2C4`) | Delicate, crisp (`1px solid #EAE6DF`) | Strict, rigid, dark (`1px solid #9CA3AF`) |
| **Shadow / Elevation**| **None**. Completely flat, relies on borders. | **Soft & Long**. `0 12px 40px rgba(0,0,0,0.04)`. | **None**. Paper-flat, relies on borders. |
| **Radius Scale** | **16px** (Organic, pill-like) | **4px** (Architectural, constructed) | **0px** (Absolute sharp corners) |
| **Type Pairing** | Readex Pro (Warm/Friendly) | Playfair Display + Tajawal (Editorial) | Alexandria + Noto Naskh (Authoritative) |
| **Type Hierarchy** | Medium weights, low contrast between sizes | Light weights, extreme contrast (massive titles) | Regular weights, extremely tight hierarchy |
| **Spacing Density** | **Relaxed** (12px base, chunky padding) | **Spacious** (8px base, massive 32px gaps) | **Extremely Tight** (4px base, 8px padding) |
| **Nav Pattern** | Persistent thick sidebar | Top Navbar with Mega-menu | Dual: Slim sidebar + Action top bar |
| **Silhouette** | Grounded, thick-bordered tactile tile | Floating, framed gallery artwork | Sharp-cornered, outlined folder/document |

## The Self-Check
If you hide the primary accent colors (Green, Copper, Crimson), you can still identify the UI instantly:
- If the cards have thick borders, no shadows, and massive 16px rounded corners on a sandy background, it's **Agriculture**.
- If the cards are floating on huge soft shadows, have sharp 4px corners, massive serif titles, and huge whitespace gaps, it's **Real Estate**.
- If the layout is a dense grid of 0px sharp corners, heavy 1px gray borders, no shadows, and extremely tight padding, it's **Legal**.
