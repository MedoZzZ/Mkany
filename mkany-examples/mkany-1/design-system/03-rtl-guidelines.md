# 03. RTL & Arabic Guidelines

Mkani ERP is an **Arabic-First** system. RTL is not an afterthought or a simple CSS `direction: rtl` toggle.

## 1. Typography
- **Primary Font**: `Cairo` for all Arabic UI text.
- **Line Height**: Arabic script requires more vertical space to prevent clipping of diacritics and ascenders/descenders. Ensure line-height is at least `1.7` (compared to 1.5 for English).
- **Minimum Size**: Do not use Arabic text smaller than `12px` (ideally `13px` for labels).

## 2. Numeric Alignment
- **Critical Rule**: All financial numbers, IDs, and dates MUST use a monospace font (e.g., `JetBrains Mono`) regardless of the UI language.
- **Alignment**: Financial numbers must remain **right-aligned** in table columns, even in an RTL layout, so that decimal points align vertically for easy visual scanning.

## 3. Structural Mirroring
- **Navigation**: The heavy left sidebar in Legal (LTR) must become a heavy right sidebar in RTL.
- **Icons**: Directional icons (chevrons, arrows, "next/previous" pagination) must be horizontally flipped.
- **Callouts**: The thick 5px semantic border on callouts (e.g., missed deadlines) must move from the left edge to the right edge.

## 4. Padding and Margins
- Do not use hardcoded `margin-left` or `padding-right`.
- Always use logical CSS properties: `margin-inline-start`, `margin-inline-end`, `padding-inline-start`, `padding-inline-end`.

## 5. Mixed Content
- When rendering English product names, emails, or LTR codes inside an Arabic interface, ensure the container wraps the text with `<span dir="ltr">` or uses the `unicode-bidi` CSS properties to prevent punctuation from jumping to the wrong side of the string.
