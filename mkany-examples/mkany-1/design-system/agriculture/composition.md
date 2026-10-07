# Agriculture Composition (Metro)

## Operational Control Surface
The Agriculture application is a monitoring and operational tool. The primary user is checking the health of crop cycles, greenhouse environments, and inventory. It must feel like an operational workspace, not a tile catalog.

## Composition Rules
- **No Bounding Boxes**: Do not use `max-width: 1200px` containers. The UI is a panoramic, edge-to-edge canvas.
- **Typography as Structure**: Use typography, not boxes, to define structure. Let large data points stand on their own without borders.
- **Background**: The canvas itself is dark (`#111111` or deep charcoal).
- **Semantic Color & Live State**: Color should only be used to communicate semantic exceptions or live state. Do not create colorful tiles just for decoration.
- **Spatial Grouping**: Group related operational data tightly without explicit chrome or borders. Use larger horizontal gaps to separate major sections.
- **Direct Manipulation**: Actions should be immediate and in context, minimizing multi-step modals for rapid operational checks.
- **Asymmetry**: Embrace asymmetric layouts based on data importance rather than forcing everything into a uniform grid.
