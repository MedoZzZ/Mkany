# Component Specs: Real Estate

These specifications govern the application of the tokens defined in `design-tokens-real-estate.md`. The components strictly adhere to the Salesforce Lightning Design System (SLDS) 1.0 patterns (ca. 2015). **Do not apply modern "soft UI" paradigms (large radii, heavy drop shadows, borderless inputs) to these components.**

---

## 1. Buttons

Buttons in this era are highly structured, featuring hard 1px borders and slight 4px radii. No box-shadows.

*   **Primary Button:**
    *   **Default:** Background `color-brand-primary` (#0070D2). Text `color-bg-surface` (#FFFFFF). Border: 1px solid `color-brand-primary`. Radius: `border-radius-base` (4px).
    *   **Hover:** Background `color-brand-hover` (#005FB2).
    *   **Active (Pressed):** Background `color-brand-active` (#00396B).
    *   **Disabled:** Background `color-bg-disabled` (#C9C7C5), Text `#FFFFFF`. Cursor: `not-allowed`.
*   **Secondary / Neutral Button:**
    *   **Default:** Background `color-bg-surface` (#FFFFFF). Text `color-brand-primary` (#0070D2). Border: 1px solid `color-border-divider` (#DDDBDA).
    *   **Hover:** Background `color-bg-canvas` (#F4F6F9).
    *   **Active:** Background `#E5E5E5`.
*   **Destructive Button:**
    *   **Default:** Background `color-status-blocked-bg` (#C23934). Text `#FFFFFF`. Border 1px solid `#C23934`.
    *   **Hover:** Background `color-status-blocked-hover` (#A61A14).

---

## 2. Form Inputs

Input fields prioritize data entry efficiency over aesthetics. They are boxed and clearly bounded.

*   **Default State:** Background `color-bg-surface`. Border: 1px solid `color-border-input` (#B0ADAB). Radius: `border-radius-base` (4px). Height: 32px (SLDS 1.0 inputs were noticeably shorter than modern 40px+ inputs).
*   **Focus State:** The border color changes to `color-brand-primary` (#0070D2). SLDS also applies a crisp, hard box-shadow explicitly tied to focus: `shadow-focus`.
*   **Error State (SLDS Signature):** 
    *   Border turns `color-status-blocked-bg` (#C23934). 
    *   The label text also turns `#C23934`. 
    *   An inline error message appears exactly below the input (margin-top: 2px) in `#C23934` text, 12px size. It does not float or use a tooltip.
*   **Disabled State:** Background turns `color-bg-canvas` (#F4F6F9), text turns `color-text-placeholder`.

---

## 3. Data Tables

The workhorse of the Real Estate CRM. High density, no zebra striping, strict borders.

*   **Row Height:** 32px for compact, 48px for standard. (Tokens dictate density, stick to 32px-40px).
*   **Header Treatment:** Text is `color-text-label` (#3E3E3C), `font-size-label` (12px), uppercase, tracked out (`letter-spacing: 0.0625rem`). Border-bottom: `border-width-thick` solid `color-border-divider` (a slightly thicker line to separate headers from data). No vertical column borders.
*   **Data Rows:** Border-bottom: 1px solid `color-border-divider`.
*   **Hover Row:** Background changes to `color-bg-canvas` (#F4F6F9).
*   **Selected Row:** Row background remains `color-bg-canvas`. A checkbox on the far left is checked. (SLDS relies on the checkbox state rather than a heavy background color change).
*   **Column Sort Indicator:** An SVG chevron appears next to the column header text. Invisible by default, it appears in `color-border-input` on header hover, and turns `color-brand-primary` when actively sorted.
*   **Row-Hover Actions:** A signature SLDS pattern. The far-right column is reserved for an "Action Menu". It is empty by default. On row hover, a small secondary button with a downward chevron `[ v ]` appears in that column, allowing edit/delete actions without cluttering the resting table view.

---

## 4. Record Detail (Stacked Label-Value Pairs)

The defining layout pattern for viewing a Unit or Contract. It maximizes screen real estate and vertical scanning.

*   **The Component:** A wrapper `dl` or `div`. 
    *   **Label:** `color-text-label` (#3E3E3C), `font-size-label` (12px), uppercase, `letter-spacing: 0.0625rem`.
    *   **Value:** `color-text-default` (#080707), `font-size-body` (14px).
*   **Vertical Rhythm:** The gap between Label and Value is incredibly tight (`space-xxs` or 2px). The value hugs the label. The gap below the value (to the next pair) is `space-md` (16px).
*   **Grid Layout:** Displayed in a strict 2-column or 3-column CSS Grid. Column gap is `space-lg` (24px). Data is top-aligned across columns.

---

## 5. Unit Inventory Card

Used for visual pipeline and project viewing.

*   **Structure:** White background (`color-bg-surface`), 1px border (`color-border-divider`), 4px radius.
*   **The Status Bar Edge:** A signature SLDS visual indicator. The left edge of the card features a thick, solid color bar denoting status.
    *   Implementation: `border-left: 4px solid var(--status-color)`.
    *   If a unit is Sold, the card has a standard 1px gray border on top, right, and bottom, but a 4px `color-status-sold-bg` (#04844B) border on the left.
*   **Padding:** Inside the card, padding is `space-md` (16px).

---

## 6. Status Badge / Pill

Used in tables and card headers to clearly denote state.

*   **Design:** `border-radius-pill` (15rem). Background is a solid semantic color (e.g., `color-status-reserved-bg`). Text is pure white (`#FFFFFF`).
*   **Typography:** `font-size-label` (12px), uppercase, `font-weight: 700`.
*   **Padding:** `space-xs` vertically, `space-sm` horizontally. No borders.

---

## 7. Sidebar Navigation Item

Strictly structural, avoiding the "colored background blob" of modern UI.

*   **Default:** Text is `color-text-default`. No background.
*   **Hover:** Background becomes `color-bg-canvas` (#F4F6F9).
*   **Active:** Background remains white or canvas, but a 3px solid vertical line of `color-brand-primary` (#0070D2) appears flush on the absolute left edge of the item. Text and SVG icon change to `color-brand-primary`.

---

## 8. Modal / Dialog

A rigid, framed overlay for tasks like "Create Reservation".

*   **Overlay:** Dark, semi-transparent (`color-overlay-scrim`).
*   **Container:** `color-bg-surface`, `border-radius-base`, with the only shadow in the app: `0 2px 3px rgba(0,0,0,0.16)`.
*   **Header:** Features a 1px `color-border-divider` bottom border. Title is `font-size-heading-lg`.
*   **Footer:** Features a 1px top border. Background is often slightly off-white (`color-bg-canvas`). Actions (Buttons) are strictly right-aligned, with Primary on the far right, Secondary to its left.

---

## 9. Alert / Toast

SLDS 1.0 predates modern floating "toast" stacks. It utilizes structural banners.

*   **Placement:** A full-width rectangular banner sitting exactly below the top global chrome, pushing page content down. 
*   **Styling:** 0px border radius. Completely solid background color based on status (e.g., solid `#04844B` for a successful contract generation). Text is white.
*   **Icon:** A highly visible white SVG icon on the left; a white close `[x]` on the right.

---

## 10. Breadcrumbs & Pagination

*   **Breadcrumbs:** Text is `color-brand-primary` (clickable links). Separator is a simple `/` or SVG chevron in `color-text-placeholder`. No background pills, just raw text.
*   **Pagination (Table):** Standard secondary buttons (`[ < Previous ]` `[ Next > ]`) placed below the table, right-aligned or center-aligned. No soft rounded numbers. Page numbers (if shown) are displayed as raw text: "Page 1 of 12".
