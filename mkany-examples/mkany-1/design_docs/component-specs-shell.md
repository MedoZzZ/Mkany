# Component Specs: Mkani ERP Shell

These specifications rely entirely on the tokens defined in `design-tokens-shell.md`. The design language strictly adheres to the 2012–2014 "utility launcher" era (e.g., Google's 2013 Waffle update, Adobe CC 2014 Desktop App).

---

## 1. Top Bar (Core Persistent Chrome)

The top bar is the immovable anchor of the ERP. It remains strictly dark to blend with the initial landing page and anchor the varying light themes of the sub-apps.

*   **Height:** `height-shell-topbar` (48px).
*   **Background:** `color-shell-topbar-bg` (#202124).
*   **Border Bottom:** `border-bottom-topbar` (1px solid #3C4043).
*   **Spacing:** `space-shell-px` (16px) left and right padding.
*   **Layout (LTR Order):** Flexbox, `align-items: center`.
    1.  **Logo/Wordmark:** Far left. Font: `font-family-shell`, Size: `font-size-shell-title` (16px), Weight: 500, Color: White.
    2.  *(Flex Spacer)*
    3.  **Global Search:** Center-right.
    4.  **Waffle Icon:** Right side.
    5.  **Notification Bell:** Right side.
    6.  **Account/Profile:** Far right.
    *Note: Gap between right-side icons is `space-shell-px` (16px).*

---

## 2. Waffle Icon & Dropdown Switcher

The core mechanism for moving between Real Estate, Legal, and Agriculture.

*   **Icon (Default):** 3x3 grid SVG. Size: `size-shell-icon` (24px). Color: `color-shell-icon-on-dark` (#E8EAED).
*   **Icon (Hover/Active):** Color transitions instantly (no ease) to `color-shell-icon-hover` (#FFFFFF).
*   **Dropdown Panel:**
    *   **Width:** `width-switcher-dropdown` (320px).
    *   **Background:** `color-shell-switcher-bg` (#FFFFFF).
    *   **Radius:** `border-radius-shell-dropdown` (2px).
    *   **Elevation:** `shadow-shell-dropdown` (0 4px 16px rgba(0,0,0,0.15)).
    *   **Layout:** `display: grid; grid-template-columns: repeat(3, 1fr);`.
*   **Open/Close Animation:** Era-accurate (snappy, no spring). 150ms linear duration. Opacity `0 -> 1`, Transform `translateY(-5px) -> translateY(0)`.
*   **App Grid Items:**
    *   **Layout:** Flex column, icon centered above text.
    *   **Label:** `font-size-shell-app-label` (13px), color: dark gray.
    *   **Default State:** Icon is monochromatic gray using `color-shell-icon-on-light` (#5F6368).
    *   **Hover State:** Background becomes `color-shell-app-hover` (#F1F3F4). The icon immediately snaps from gray to the specific brand color defined in that app's token file:
        *   **Real Estate:** Snaps to `color-brand-primary` (#0070D2).
        *   **Legal:** Snaps to `color-header-bg` (#001F3F).
        *   **Agriculture:** Snaps to `color-tile-growth` (#8CBF26).

---

## 3. The Anchor Line (The Seam)

A 2px colored bar that provides absolute context of *where* the user is, without polluting the top bar.

*   **Position:** Absolute, `bottom: 0`, `left: 0`, `height: 2px`. It sits *on top* of the 1px `border-bottom-topbar`.
*   **Idle State (Pre-login / Landing):** `opacity: 0` or `width: 0`. It does not exist until an app is selected.
*   **Active State:** `width: 100%`. Background color matches the active app (e.g., `#001F3F` for Legal).
*   **Transition Behavior:** 
    *   When switching apps, the line does not slide; it performs a 200ms `ease-in-out` crossfade to the new color alongside the canvas unmounting.

---

## 4. Pre-Login / Landing Grid

The dark, focused screen acting as the Adobe CC-style desktop launcher before a user enters an app.

*   **Background:** `color-shell-bg-landing` (#202124).
*   **Layout:** Horizontal flex row, perfectly centered vertically and horizontally. Gap: 48px.
*   **Cards:** Large click targets representing the 3 apps.
*   **Hover State (Restraint Applied):** Following the shell's philosophy of extreme neutrality, these cards **do not** reveal their brand colors on hover. The shell stays fully monochromatic until a decision is made. Hovering merely brightens the card's border to `color-shell-icon-hover` (#FFFFFF) and slightly scales the icon (1.05x). Color is only revealed *after* the click, during the handoff.

---

## 5. Notification Panel & Account Menu

*   **Trigger:** Bell icon and Avatar, respectively.
*   **Panel Styling:** Identical to the Waffle Dropdown (White background, 2px radius, specific drop shadow).
*   **Item Hover:** List items use `color-shell-app-hover` (#F1F3F4) for hover backgrounds. No rounded corners on hover states (edge-to-edge highlights).

---

## 6. Global Search

*   **Position:** Sits in the top bar.
*   **Default State:** A restrained input box. Background is slightly darker than the top bar (e.g., `rgba(0,0,0,0.2)` or `#17181A`). No border. Text color is `color-shell-icon-on-dark`.
*   **Focus/Active State:** Era-accurate 2013 pattern. On focus, the input background transitions to pure white (`#FFFFFF`), text turns black, and it expands horizontally by ~40px to indicate active search context. The search results dropdown uses the exact same shadow/radius tokens as the waffle menu.

---

## 7. The Handoff (Empty / Loading State)

The most critical seam. What happens visually between clicking "Agriculture" in the waffle menu and the Metro UI appearing?

1.  **Click:** The waffle dropdown closes instantly (0ms).
2.  **Anchor Line:** The 2px line at the bottom of the top bar crossfades to the new app's color over 200ms.
3.  **Canvas Unmount:** The entire DOM below the top bar is wiped.
4.  **The Gap (Loading):** The body background defaults to a completely neutral off-white (e.g., `#F4F6F9`). **No skeleton screens** (they were exceedingly rare in 2013). Instead, a single, indeterminate horizontal progress bar (an era-accurate pattern popularized by early YouTube and Android) appears exactly *on top* of the 2px Anchor Line, using the same brand color. It races left-to-right.
5.  **Resolution:** The progress bar vanishes, and the new app's layout mounts instantly. No soft fade-ins. The transition is mechanical and deliberate.
