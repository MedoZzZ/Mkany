# Design Tokens: Legal (Classic Bootstrap / AdminLTE Era)

## Rationale & Inspiration
**Era / Style:** Classic Bootstrap 3 Admin Themes (ca. 2014–2015)  
**Concrete References:** AdminLTE (v2), Metronic (early versions), traditional desktop-ported web apps.

**Why this fits Legal:**  
Legal case management requires an authoritative, serious, and extremely high-density interface. A lawyer or office manager looking at a "Case Workspace" doesn't want playful gradients, rounded corners, or excessive whitespace—they want a digital dossier. The AdminLTE era of UI design perfected the "workhorse" dashboard: fixed headers, stark contrasts, rigid boxed panels, and zero wasted space. It feels like software meant for serious, confidential business where no deadlines can be missed.

---

## 🎨 Color Tokens

The palette is muted, traditional, and relies on high contrast between the layout "chrome" (headers/sidebars) and the actual working documents.

### Base & Layout
- `color-bg-body`: `#ECF0F5` (A slightly darker, cooler gray for the background to make white panels pop fiercely)
- `color-overlay-scrim`: `rgba(0, 0, 0, 0.5)` (Standard black 50% opacity backdrop for modals)
- `color-header-bg`: `#001F3F` (Traditional AdminLTE Navy. A deep, authoritative color that distinguishes it entirely from Real Estate's bright CRM blue)
- `color-header-hover`: `rgba(0, 0, 0, 0.1)` (Hover overlay for top navbar items)
- `color-header-text`: `#FFFFFF`
- `color-sidebar-bg`: `#222D32` (Deep charcoal, almost black. Grounds the application firmly)
- `color-sidebar-bg-nested`: `#2C3B41` (Darker background for nested collapsible menus)
- `color-sidebar-text`: `#B8C7CE` (Muted gray-blue for sidebar links)

### Surface & Borders
- `color-panel-bg`: `#FFFFFF`
- `color-panel-border`: `#D2D6DE` (A very solid, visible gray line)
- `color-table-stripe`: `#F9F9F9` (Classic zebra-striping is mandatory here)
- `color-table-hover`: `#F5F5F5` (Standard Bootstrap 3 row hover color)
- `color-input-border`: `#CCCCCC` (Standard Bootstrap 3 form border)
- `color-input-disabled`: `#EEEEEE` (Standard Bootstrap 3 disabled input background)

### Text, Brand & Status
- `color-text-main`: `#333333` (Traditional dark gray, highly readable)
- `color-brand-primary`: `#3C8DBC` (Classic AdminLTE primary blue for buttons and actions)
- `color-brand-hover`: `#367FA9` (10% darker for button hover states)
- `color-widget-tools`: `#97A0B3` (Muted gray for widget collapse/remove icons in headers)
- `color-status-danger`: `#DD4B39` (A sharp, urgent red—used for missed or critical deadlines. No pastel reds here)
- `color-status-warning`: `#F39C12` (A solid mustard yellow for approaching hearings)
- `color-status-success`: `#00A65A` (A classic, terminal-like green)
- `color-status-info`: `#00C0EF` (Cyan, used for informational badges)

### Callout Tints (Bootstrap 3 Alert Backgrounds)
- `color-callout-bg-danger`: `#F2DEDE`
- `color-callout-bg-warning`: `#FCF8E3`
- `color-callout-bg-success`: `#DFF0D8`
- `color-callout-bg-info`: `#D9EDF7`

---

## 🔤 Typography Tokens

Typography is standard, unpretentious, and designed for maximum density.

### Font Families
- `font-family-base`: `"Source Sans Pro", "Helvetica Neue", Helvetica, Arial, sans-serif` (A very standard, clean sans-serif that was the staple of this era)
- `font-family-serif`: `"Georgia", "Times New Roman", serif` (Can be used specifically for viewing generated legal documents/contracts to differentiate them from UI)

### Scale & Weight
- `font-size-base`: `14px` (The standard for high-density reading)
- `font-size-h1`: `24px` (`font-weight: 300` - The classic "thin" header popularized in this era)
- `font-size-sm`: `12px` (Used for timestamps and table metadata)
- `line-height-base`: `1.42857143` (The classic Bootstrap 3 exact line height, ensuring tight text packing)

---

## 📏 Spacing & Layout Tokens

Everything is tight. The goal is to fit 50 hearings and a full case history on a single 1080p screen without scrolling.

- `space-panel-padding`: `10px` (Extremely tight compared to modern 24px standards)
- `space-table-cell`: `8px` (Vertical padding in tables is minimal)
- `space-margin-bottom`: `15px` (Separation between discrete blocks)

**Layout Philosophy:** The "Boxed Layout". The sidebar is fixed and dark. The top nav is fixed and colored. The content sits in a rigid well. Case Workspaces are divided into strict visual panels (e.g., a "Hearings" panel, a "Documents" panel), often with colored top-borders to indicate the panel type.

---

## 📐 Elevation & Borders

Shadows are virtually non-existent, replaced by hard borders.

- `border-radius-base`: `3px` (Just barely rounded. Modern UI uses 8-16px; 3px gives a rigid, manufactured feel)
- `border-radius-panel`: `3px`
- `border-radius-badge`: `10px` (Classic pill shape for small unread counts)
- `border-panel-top`: `3px solid #D2D6DE` (A signature of this era: panels often have a thicker top border that can be colored, e.g., red for critical deadlines, blue for standard info)
- `border-width-callout`: `5px` (Thick left border for callouts)
- `shadow-box`: `0 1px 1px rgba(0,0,0,0.1)` (Barely perceptible, only to separate the white panel from the gray background)
- `shadow-modal`: `0 5px 15px rgba(0,0,0,0.5)` (Heavy shadow to pop the modal off the complex dashboard)
- `shadow-input-focus`: `inset 0 1px 1px rgba(0,0,0,0.075), 0 0 8px rgba(102, 175, 233, 0.6)` (The unmistakable Bootstrap 3 blue glow)
- `shadow-input-error`: `inset 0 1px 1px rgba(0,0,0,0.075), 0 0 6px #CE8483` (Bootstrap 3 red error glow)

---

## 🧩 Component Philosophy

- **Case Workspace:** Looks like a dashboard of widgets. One widget for "Client Info", a table widget for "Hearings", a list widget for "Deadlines". Each has a rigid header, often with minimize/expand icons in the corner (classic AdminLTE behavior).
- **Data Tables:** High contrast. **Zebra striping is on by default** (`bg-alt`) to help track lines horizontally across dense legal data. Columns have vertical borders (grid lines) which modern apps usually remove, but are necessary here for structural clarity.
- **Deadlines & Alerts:** Displayed as "Callouts" (stark boxes with a thick colored left border and a slightly tinted background, e.g., a red left border for a peremptory deadline).
- **Buttons:** Solid, gradient-free blocks of color with a 3px radius. Hover states simply darken the background color by 10%.
