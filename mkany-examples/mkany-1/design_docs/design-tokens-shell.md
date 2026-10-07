# Design Tokens: Mkani ERP Shell & Launcher

## Rationale & Inspiration
**Era / Style:** Early 2010s "Portal" and App Launchers (ca. 2012–2015)  
**Concrete References:** Google's "Waffle" App Launcher (2013), Adobe Creative Cloud Desktop App (2014), SAP NetWeaver Ajax Framework Page.

**Why this fits the ERP Shell:**  
The shell is the chassis. Its job is to house a persistent top bar, handle authentication, and launch the user into three highly opinionated sub-applications (Salesforce-style Real Estate, AdminLTE-style Legal, Metro-style Agriculture). If the shell has a loud personality, it will clash with at least one of those apps. Therefore, the shell draws from the era of "utility launchers"—like the early Adobe CC desktop app or Google's 2013 unified app menu. It is strictly neutral, employing muted colors, standard system typography, and utilitarian layout so that the "hero" is the sub-application you are switching into. 

---

## 🎨 Color Tokens (The Neutral Chassis)

The colors here must never compete with the vibrant Metro tiles or the "Lightning Blue" of the sub-apps. They are structural.

### Global Chrome
- `color-shell-bg-landing`: `#202124` (A very deep, neutral charcoal used for the initial pre-login/launcher landing page. Acts like a blank canvas).
- `color-shell-topbar-bg`: `#202124` (The global top bar uses the exact same dark charcoal. This creates a permanent, heavy anchor at the top of the screen that survives the transition into any app, preventing the "two different products" jarring effect).
- `color-shell-topbar-border`: `#3C4043` (A dark, subtle 1px structural line separating the dark shell chrome from the app content below).

### Launcher & Switcher UI
- `color-shell-icon-on-dark`: `#E8EAED` (A crisp, light gray for global icons like the waffle, notifications, and profile sitting on the dark top bar).
- `color-shell-icon-on-light`: `#5F6368` (A medium, un-opinionated gray for icons used inside the white dropdown menus, ensuring they are visible).
- `color-shell-icon-hover`: `#FFFFFF` (Icons brighten to pure white on hover).
- `color-shell-switcher-bg`: `#FFFFFF` (The background of the dropdown launcher menu).
- `color-shell-app-hover`: `#F1F3F4` (A very subtle, cool gray for hovering over an app icon in the launcher).

---

## 🔤 Typography Tokens (Restrained)

The shell typography is purely functional. It avoids stylistic choices so it doesn't fight with the strict typography of the sub-apps.

- `font-family-shell`: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` (Strictly relies on the OS default. No custom web fonts for the shell).
- `font-size-shell-title`: `16px` (`font-weight: 500`) - Used for the ERP logo text in the top left.
- `font-size-shell-app-label`: `13px` (`font-weight: 400`) - Used under the icons in the app switcher.
- `letter-spacing-shell`: `normal` (No tracking/kerning tricks here).

---

## 📏 Spacing & Layout Tokens

- `height-shell-topbar`: `48px` (Slim and out of the way. Modern apps often use 64px+, but a 48px bar maximizes vertical space for the dense apps below it).
- `space-shell-px`: `16px` (Standard horizontal padding for the top bar).
- `size-shell-icon`: `24px` (Standard touch-target size for top bar icons).
- `width-switcher-dropdown`: `320px` (Compact, containing a 3-column grid of apps).

---

## 📐 Elevation & Borders

- `border-radius-shell-dropdown`: `2px` (Just slightly softened, mirroring standard OS menus).
- `shadow-shell-dropdown`: `0 4px 16px rgba(0,0,0,0.15)` (The only place shadow is allowed in the shell is the dropdown launcher, to lift it cleanly off whichever sub-app is currently active beneath it).
- `border-bottom-topbar`: `1px solid var(--color-shell-topbar-border)` (A hard, structural line).

---

## 🧩 Switcher Component Philosophy

**The Pattern: The "Waffle" Dropdown + Initial Landing Grid**

1. **Pre-login / Landing:** When the user logs in, they don't immediately drop into an app. They land on a dark, focused screen (`#202124`) showing a horizontal row of large, monochromatic cards representing the three domains (Agriculture, Legal, Real Estate). It acts like the Adobe CC Desktop launcher.
2. **In-App Switching:** Once an app is selected, this landing page vanishes. Navigation between apps is now handled by a "Waffle" icon (a 3x3 grid of dots) in the top-right of the persistent 48px top bar (identical to Google's 2013 Apps implementation). 
3. **The Dropdown:** Clicking the waffle opens a clean white dropdown modal. Inside are the three app icons arranged in a grid. They use monochromatic gray icons (`#5F6368`) until hovered, at which point the icon snaps to the primary color of that specific app (e.g., Lightning Blue for Real Estate, Metro Green for Agriculture).

---

## 🔄 Handoff & Transition Philosophy (The Seam)

What happens when a user clicks "Agriculture" from the waffle menu while inside "Legal"?

1. **What Stays (The Chrome):** The 48px top bar is permanent. The waffle icon, the global search bar, the notification bell, and the user profile menu NEVER change position or style. They are the anchor.
2. **What Swaps (The Canvas):** Everything below the 1px bottom border of the top bar is completely unmounted and remounted. The entire `<body>` background color transitions (e.g., from the AdminLTE gray to the Metro black/white). 
3. **The Anchor Line:** To help ground the user in their new context, the top bar has a single, 2px colored line sitting exactly at the bottom of the 48px bar (overlapping the gray border). When the user switches to Legal, this line animates to AdminLTE Blue. When they switch to Real Estate, it becomes Lightning Blue. When they switch to Agriculture, it becomes Metro Green. This subtle accent is the *only* part of the shell that reacts to the active app, signaling the handoff without polluting the top bar's neutrality.
