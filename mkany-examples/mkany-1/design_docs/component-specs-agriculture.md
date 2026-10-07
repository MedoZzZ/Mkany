# Component Specs: Agriculture

These specifications govern the application of the tokens defined in `design-tokens-agriculture.md`. The components strictly adhere to the Windows 8 Metro / Modern UI patterns (ca. 2012). **This theme relies entirely on flat color blocks, massive typography, and motion (scaling) to convey interactivity. Zero shadows, zero border radii.**

---

## 1. Live Tile (Core Component)

The fundamental building block of the greenhouse dashboard.

*   **Structure & Sizing:** A solid rectangular or square block (`border-radius-base` of 0px). Placed in a grid with exactly `space-grid-gap` (8px) between tiles.
*   **Typography Positioning:**
    *   **Metric (The huge number):** Uses `font-size-hero`. It is positioned flush left or center, taking up the majority of the tile's upper/center space.
    *   **Caption (The label):** Uses `font-size-caption`. It is always absolute-positioned at the bottom-left corner of the tile, with `space-tile-padding` (16px) margin from the edges.
*   **Default State:** Background color represents current semantic status (e.g., `color-tile-growth` for optimal, `color-tile-warning` for issues).
*   **Hover State:** The tile shrinks slightly (`transform: scale(var(--scale-hover))`) and a white flash overlay appears (`background-color: var(--color-overlay-hover)`). It does not raise or cast a shadow.
*   **Pressed/Active State:** The tile shrinks deeper (`transform: scale(var(--scale-pressed))`) and the overlay switches to `color-overlay-pressed` to simulate a physical push.
*   **Disabled/Offline State:** Background snaps to `color-tile-disabled`. Text dims to `color-text-secondary`.

---

## 2. Buttons

Metro buttons are unapologetically brutalist and flat.

*   **Solid Button (Primary Action):**
    *   **Default:** Rectangular block. Background `color-brand-action`. Text `color-text-primary`. No border, no radius.
    *   **Hover:** Applies `color-overlay-hover` over the background. Shrinks to `scale-hover`.
    *   **Pressed:** Applies `color-overlay-pressed`. Shrinks to `scale-pressed`.
    *   **Disabled:** Background `color-tile-disabled`. Text `color-text-secondary`.
*   **Text Button (Secondary Action):**
    *   **Default:** Raw text, `color-text-primary`.
    *   **Hover:** A thick underline appears (Border bottom: `border-width-thick` solid `color-brand-action`).
    *   **Pressed:** Text color changes to `color-brand-action`.

---

## 3. Data Table (Crop Cycles & Inventory)

Tables in Metro eschew spreadsheet-like grids in favor of extreme typographic alignment and negative space.

*   **Row Height:** Very generous. Minimum 56px to allow for touch targets.
*   **Headers:** `font-size-body`, uppercase, `color-text-secondary`. No borders on the header itself.
*   **Dividers:** No vertical lines ever. Rows are separated by a solid horizontal line of `color-tile-neutral` at the bottom of each row.
*   **Hover State:** Background colors *do not change* on hover (that ruins the stark black/white canvas). Instead, hovering a row changes the primary text color of that row to `color-brand-action`, and a `border-width-thick` vertical accent line appears on the far left edge of the row.
*   **Sorting:** Clicking a header applies `color-text-primary` to the active sorted column label, and a simple SVG arrow appears next to it.

---

## 4. Navigation (The Pivot / Hub)

This handles moving between Greenhouses, Crop Cycles, and Alerts.

*   **Pattern:** The Windows Phone "Pivot" style. A horizontal list of massive header text at the top of the screen.
*   **Default (Inactive Tab):** Text is `font-size-hero`, colored `color-text-secondary`.
*   **Active Tab:** Text is `font-size-hero`, colored `color-text-primary`.
*   **Transition:** Clicking a tab slides the entire content canvas horizontally to reveal the new section (standard Metro panorama behavior).

---

## 5. Horizontal Drill-Down Transition

When clicking a Live Tile (e.g., clicking the "Humidity" tile to see historical charts).

*   **Behavior:** It does not open a floating modal or a new tab. The current view rapidly slides off-screen to the left, while the new "Sensor Detail View" slides in from the right.
*   **Sensor Detail View Layout:** It completely takes over the screen. A massive `font-size-hero` header at the top left declares the context (e.g., "GREENHOUSE 4 HUMIDITY"). Below it is a full-width flat chart utilizing `color-tile-humidity`. A back arrow (`<-`) is placed in the top left above the header to trigger the reverse slide animation.

---

## 6. Form Inputs

Inputs minimize chrome to keep the layout flat. No boxes.

*   **Default State:** A raw text input sitting on the background. It features a bottom underline only: `border-width-thin` solid `color-text-secondary`. Text is `color-text-primary`.
*   **Hover:** Underline brightness increases (e.g., shifts to `color-text-primary`).
*   **Focus State:** The underline thickens to `border-width-thick` and turns `color-brand-action`.
*   **Checkbox/Radio:** Square inputs (`border-radius-base` of 0px). A `border-width-thin` square outline. When checked, the inside fills solidly with `color-brand-action` and a thick white checkmark appears.

---

## 7. Full-Width Alert Bar

Metro OS notifications are highly intrusive by design, demanding attention.

*   **Entrance:** Slides down from the absolute top of the screen, pushing all application content (including the Pivot headers and grids) down.
*   **Styling:** A full-width block of color (e.g., `color-tile-temp` for a critical heat warning). Text is white.
*   **Dismissal:** Users acknowledge it by clicking a flat "DISMISS" text button on the right edge. Once clicked, it slides back up, pulling the content back into place.

---

## 8. Tile-Level Status Indicator

If a specific sensor goes out of bounds but doesn't warrant a full-screen alert bar.

*   **Behavior:** The tile itself dynamically changes its background color. For example, a previously green (`color-tile-growth`) tile will snap to `color-tile-warning`.
*   **Animation:** Metro tiles update with a "flip" animation. The tile rotates 90 degrees on its X-axis (becoming a thin line), changes color and data, and rotates back to 0 degrees to reveal the warning state.
