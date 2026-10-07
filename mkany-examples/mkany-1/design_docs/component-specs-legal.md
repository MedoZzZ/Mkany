# Component Specs: Legal

These specifications govern the application of the tokens defined in `design-tokens-legal.md`. The components strictly adhere to the AdminLTE (v2) and Classic Bootstrap 3 patterns (ca. 2014). **This theme is characterized by boxed layouts, high data density, visible grid lines, and functional utility over aesthetic flair. Do not round corners beyond 3px.**

---

## 1. Top Navbar

The global fixed header that anchors the AdminLTE layout.

*   **Structure:** Fixed at the top. Background `color-header-bg` (#001F3F).
*   **Typography/Icons:** All text and icons are `color-header-text` (#FFFFFF).
*   **Interactive Items (Search, Notifications, User Menu):** 
    *   **Default:** No background.
    *   **Hover/Active:** Background applies `color-header-hover` (rgba(0, 0, 0, 0.1)) to create a darker block effect without relying on a hardcoded hex.
*   **User Menu:** Clicking the user profile drops down a classic Bootstrap 3 menu with a `shadow-box` elevation and `border-radius-base`.

---

## 2. Sidebar Navigation

The classic fixed, dark left column for deep navigation.

*   **Structure:** Background `color-sidebar-bg` (#222D32).
*   **Default Item:** Text `color-sidebar-text` (#B8C7CE). Left padding 15px.
*   **Hover State:** Background turns slightly darker (`rgba(0,0,0,0.1)` equivalent). Text turns `color-header-text` (#FFFFFF).
*   **Active Item:** Background darkens. A 3px solid vertical line of `color-brand-primary` appears on the extreme left edge. Text turns `color-header-text` (#FFFFFF).
*   **Nested/Collapsible Items:** When a menu expands, the nested `<ul>` uses `color-sidebar-bg-nested` (#2C3B41) to differentiate it from the root level. Nested items have increased left padding (e.g., 25px) and use smaller SVG bullet icons instead of full icons.

---

## 3. Box/Panel Widgets (Case Workspace)

The entire layout is a dashboard of discrete widgets/panels, rather than floating cards.

*   **Structure:** Background `color-panel-bg` (#FFFFFF). Border: 1px solid `color-panel-border` (#D2D6DE). Radius: `border-radius-panel` (3px). Elevation: `shadow-box` (barely perceptible 1px drop).
*   **Header (The AdminLTE Signature):**
    *   Padding: 10px. Bottom border: 1px solid `color-panel-border`.
    *   **Top Border Accent:** The very top edge of the panel features `border-panel-top`. This border can be colored semantically (e.g., overriding `#D2D6DE` with `color-status-danger` for a critical widget).
    *   **Widget Tools:** Positioned absolute right. Small SVG icons (collapse `-`, remove `x`) colored `color-widget-tools` (#97A0B3). Hovering these icons darkens them to `color-text-main`.
*   **Body:** Padding `space-panel-padding` (10px). Extremely tight.

---

## 4. Buttons

Solid, gradient-free blocks of color.

*   **Primary Button:**
    *   **Default:** Background `color-brand-primary` (#3C8DBC). Text `#FFFFFF`. Border: 1px solid `color-brand-hover` (matching hover color to give a slight inset feel). Radius: `border-radius-base` (3px).
    *   **Hover/Active:** Background `color-brand-hover` (#367FA9).
    *   **Disabled:** Opacity 65%, cursor `not-allowed`.
*   **Danger Button:**
    *   **Default:** Background `color-status-danger` (#DD4B39). Text `#FFFFFF`.
    *   **Hover:** Filter: brightness(0.9) (10% darker per tokens).
*   **Secondary/Neutral Button:**
    *   **Default:** Background `#FFFFFF`. Border 1px solid `color-panel-border` (#D2D6DE). Text `color-text-main`.
    *   **Hover:** Background `color-table-hover` (#F5F5F5).

---

## 5. Data Tables (Grid)

The ultimate workhorse component for legal data. It must look like a structured grid, not a modern airy list.

*   **Borders & Grid Lines:** 1px solid `color-panel-border` for both rows *and* vertical column dividers. The table is fully boxed.
*   **Padding:** `space-table-cell` (8px). Very tight.
*   **Zebra Striping:** Active by default. Even rows have a background of `color-panel-bg`, odd rows have a background of `color-table-stripe` (#F9F9F9).
*   **Hover State:** Both striped and non-striped rows change their background to `color-table-hover` (#F5F5F5) when hovered. Cursor becomes pointer if the row is actionable.
*   **Header & Sorting:** Font is bolded (`font-weight: 600`), text is `color-text-main`. Bottom border is 2px solid `color-panel-border`. 
    *   **Sort Indicator:** A classic Bootstrap 3 double-arrow SVG (`v` and `^` stacked) floats right in the header cell, colored `color-widget-tools`. When actively sorted, the relevant arrow turns `color-text-main`.

---

## 6. Form Inputs

Inputs use the classic Bootstrap 3 styling, including strict validation patterns.

*   **Default State:** Background `color-panel-bg`. Border: 1px solid `color-input-border` (#CCCCCC). Radius: `border-radius-base` (3px). Height: 34px.
*   **Focus State:** The border turns `color-brand-primary`. The component applies the unmistakable Bootstrap glow: `shadow-input-focus`.
*   **Disabled State:** Background changes to `color-input-disabled` (#EEEEEE). Cursor: `not-allowed`.
*   **Error State (Validation Signature):** 
    *   Border turns `color-status-danger`. Text label turns `color-status-danger`.
    *   Focus applies `shadow-input-error`.
    *   **Icon:** A right-aligned Bootstrap-style SVG (e.g., a red `x` for error, green `check` for success) is absolutely positioned inside the right edge of the input.

---

## 7. Callouts (Deadlines & Alerts)

Instead of floating toasts, this era relied on structural boxes inserted into the layout to surface alerts.

*   **Structure:** No shadows. Radius: `border-radius-base` (3px). Padding: 15px.
*   **The Left Border:** A signature thick accent line on the left side: `border-left: var(--border-width-callout) solid var(--color-status-...)`.
*   **Background Tints:** The background is a very light tint of the semantic color:
    *   **Danger (Missed Deadline):** Border `color-status-danger`. Background `color-callout-bg-danger` (#F2DEDE).
    *   **Warning (Approaching):** Border `color-status-warning`. Background `color-callout-bg-warning` (#FCF8E3).
    *   **Info (Standard):** Border `color-status-info`. Background `color-callout-bg-info` (#D9EDF7).
*   **Icons:** A semantic SVG icon (e.g., alert triangle for warning) colored to match the border is placed to the left of the title.

---

## 8. Status Badges & Labels

*   **Labels (Bootstrap style):** Small, inline status indicators. Radius `border-radius-base` (3px). Background is the solid semantic color (e.g., `color-status-success`). Text is `#FFFFFF`. Padding: 2px 6px.
*   **Badges:** Same as above, but with a pill radius (`border-radius-badge`) typically used inside the sidebar or navbar to indicate unread counts.

---

## 9. Modals

*   **Backdrop:** Standard black (`color-overlay-scrim`).
*   **Container:** `color-panel-bg`, `border-radius-base` (3px). Heavy box-shadow (`shadow-modal`).
*   **Structure:** Header, Body, and Footer are strictly divided by 1px solid `color-panel-border` hairlines, not just spacing.
*   **Header Tool:** Features an `x` close button colored `color-widget-tools` in the top right.

---

## 10. Pagination & Breadcrumbs

*   **Pagination:** Classic Bootstrap 3 bordered control. A horizontal list of boxes. Background `color-panel-bg`, border 1px solid `color-panel-border`. Text `color-brand-primary`.
    *   **Hover:** Background `color-table-hover`.
    *   **Active Page:** Background `color-brand-primary`, border `color-brand-primary`, text `#FFFFFF`.
*   **Breadcrumbs:** Structural text list. Text is `color-brand-primary`. The separator is a standard `>` character or SVG chevron colored `color-widget-tools`. Background `color-table-stripe` (#F9F9F9) with `border-radius-base` (3px) and 8px 15px padding.
