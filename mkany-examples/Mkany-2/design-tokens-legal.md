# MKANY ERP: Legal Services Design Tokens

## A. Design Concept
The Legal domain is authoritative, rigid, and document-centric. It is the antithesis of a casual interface. It relies on absolute 0px sharp corners, rigid structural grid lines, zero shadows, and extremely tight data density to replicate the feel of reviewing a physical court file.

## B. Color Tokens (Light Mode Only)
Colors are drawn from ink, paper, steel filing cabinets, and official stamps.

| Token | Hex Value | Usage / Rationale |
|-------|-----------|-------------------|
| `legal-bg` | `#F3F4F6` | Cool Slate/Steel Gray. Represents filing cabinets and structure. |
| `legal-surface` | `#FFFFFF` | Pristine white for case files and documents. |
| `legal-primary` | `#0B1B2B` | MKANY Base Navy. Rooted, serious, institutional. |
| `legal-border` | `#9CA3AF` | Dark, visible, rigid gray for structural lines. |
| `legal-accent` | `#8B1E1E` | Sealing Wax Red / Crimson. Used strictly for critical deadlines and peremptory alerts. |
| `legal-text` | `#111827` | Near-black (Ink) for maximum readability in dense documents. |

## C. Typography Tokens
* **Font Pairing**: **Alexandria** (Arabic UI) / **Noto Naskh Arabic** (Arabic Documents).
* **Scale & Hierarchy**: Extremely tight hierarchy, regular weights, focusing on density rather than decoration.
  * `legal-title`: 18px (Alexandria SemiBold) - Case titles.
  * `legal-document`: 16px (Noto Naskh Arabic) - Line-height 1.8 for reading briefs.
  * `legal-ui`: 13px (Alexandria Regular) - Used for extremely dense tables.

## D. Structural & Layout Tokens (The Divergence)
* **Background/Surface**: Steel Gray vs Pure White.
* **Border Treatment**: **Strict & Rigid**. `1px solid #9CA3AF`. High-contrast borders are everywhere, forming strict grid lines and separating every piece of data.
* **Shadow/Elevation**: **None**. Paper flat. A lawyer wants to see a document, not a floating web element.
* **Radius Scale**: **0px**. Absolute sharp corners. Evokes cut paper, manila folders, and uncompromising rules.
* **Spacing Density**: **Extremely Tight**. The base unit is 4px. Card padding is just 8px or 12px. The interface maximizes data-per-pixel.
* **Nav Pattern**: **Dual Navigation**. A slim, utilitarian sidebar plus a top bar dedicated entirely to global case search and critical crimson deadline alerts.
* **Silhouette**: Sharp-cornered, heavily outlined, dense folder/document.

## E. Concrete Component Example: Legal Case Card
```css
/* Legal cards are completely flat, rigid, sharp, and highly compact */
.legal-card {
  background-color: #FFFFFF;
  border: 1px solid #9CA3AF; /* Rigid, visible border */
  border-radius: 0px; /* Absolute sharp corners */
  padding: 12px; /* Extremely tight padding */
  box-shadow: none; /* Paper flat */
  display: flex;
  flex-direction: column;
  gap: 8px; /* High data density */
}

.legal-card-title {
  font-family: 'Alexandria', sans-serif;
  font-weight: 600;
  font-size: 16px; /* Tight hierarchy, not massive */
  color: #111827; /* Ink black */
}
```

## F. Iconography & Imagery
* **Icons**: Solid, filled icons (20px). No thin, decorative lines. An icon of a document looks like a solid black, heavy document.
* **Imagery**: None. This domain is 100% text, tables, and documents. The only images are scanned evidence viewed inside a rigid modal.
