# MKANY ERP: Hub Design Tokens

## A. Design Concept
The Hub is the enterprise front door. It needs to feel like a premium command center—calm, confident, and neutral—allowing the user to launch into structurally distinct applications. It uses massive, soft floating cards over a warm stone background.

## B. Color Tokens (Light Mode Only)
The Hub relies on the lightest, most premium tones of the Obsidian Gold palette.

| Token | Hex Value | Usage / Rationale |
|-------|-----------|-------------------|
| `hub-bg` | `#F4F5F0` | A soft, warm stone/off-white that feels expansive and premium. |
| `hub-surface` | `#FFFFFF` | Pure white for the domain selector cards, lifting them cleanly off the background. |
| `hub-text-primary` | `#0B1B2B` | The MKANY base Navy for main greetings and maximum authority. |
| `hub-text-muted` | `#5A6B7C` | Subtitles ("Select your workspace"). |
| `hub-accent` | `#E6AC00` | MKANY Gold, used strictly for the user profile indicator. |

## C. Typography Tokens
* **Font Pairing**: **Cairo** (Arabic Primary UI) / **Syne** (Latin Display).
* **Scale**:
  * `hub-title`: 48px (Syne/Cairo Bold) - Massive, architectural greeting.
  * `hub-subtitle`: 18px (Cairo Regular)
  * `hub-card-title`: 24px (Cairo SemiBold)
* **Spacing**: Letter-spacing on titles is slightly tight (-0.02em) to give a solid, logo-like feel to the greeting.

## D. Structural & Layout Tokens (The Divergence)
* **Background/Surface**: Stone vs White.
* **Border Treatment**: **None**. The Hub relies entirely on elevation and shadow, never borders.
* **Shadow/Elevation**: `0 24px 48px rgba(11, 27, 43, 0.08)`. A massive, highly diffuse, elegant shadow.
* **Radius Scale**: **24px**. Extremely soft, welcoming, and tactile.
* **Spacing Density**: **Airy**. The base unit is 16px. Cards have 48px internal padding. The grid itself has 64px gaps between cards.
* **Nav Pattern**: **None / Centered Layout**. A completely empty top bar (just the logo and profile). The cards sit dead center on the screen.
* **Silhouette**: Soft, floating pill/rectangle.

## E. Concrete Component Example: Hub Domain Card
```css
/* Hub cards are massive, floating, borderless, and very rounded */
.hub-card {
  background-color: #FFFFFF;
  border: none;
  border-radius: 24px;
  padding: 48px;
  box-shadow: 0 24px 48px rgba(11, 27, 43, 0.08);
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: transform 0.3s ease;
}

.hub-card-title {
  font-family: 'Cairo', sans-serif;
  font-weight: 600;
  font-size: 24px;
  color: #0B1B2B;
}
```

## F. Project-Switcher Component (In-Domain)
Inside the actual projects, the Hub switcher lives in the top corner as the MKANY logo. Clicking it drops down a crisp, light, frosted-glass menu (`backdrop-filter: blur(20px)`) that mimics the Hub's 24px rounded, borderless floating aesthetic.
