# 01. Design Archaeology

This document catalogs the historical 2010–2020 enterprise software references that form the basis for the Mkani ERP sub-applications.

## Agriculture: The Operational Canvas
**Reference Era**: Windows 8 Metro / Modern UI (2012) & SAP Fiori (2014)

### What they did and why
In 2012, Metro introduced "typography as structure" and "content over chrome". Designers stripped away borders, gradients, and shadows, relying entirely on spatial grouping, severe grid alignment, and edge-to-edge canvases. 

**Why it matters for Agriculture**: A greenhouse manager needs **glanceable operational monitoring**. They don't need a list of records; they need to know if the temperature in Zone 4 is critical. Metro's Live Tiles were not just "big colored squares"—they were live surfaces that pushed exceptions to the forefront.

### What we borrow
- Horizontal, edge-to-edge panoramic composition.
- Color as semantic exception indicator (not decoration).
- Typography as the primary structural element (massive numbers, precise grid alignment).

### What we reject
- The rigid, non-responsive fixed grids of early Windows 8. We adapt the panoramic concept to responsive flex/grid layouts.

---

## Legal: The Digital Dossier
**Reference Era**: AdminLTE / Classic Atlassian Jira (2014)

### What they did and why
Heavy enterprise systems of the mid-2010s relied on deep, persistent sidebars and rigid boxed panels. They did this because users needed immediate access to deeply nested hierarchies (Clients -> Cases -> Hearings -> Documents) without losing their place.

**Why it matters for Legal**: Case management requires moving between massive amounts of related data. A generic "card grid" fails here. The interface needs the authority and structure of a physical filing cabinet.

### What we borrow
- The heavy, persistent dark sidebar for deep contextual navigation.
- The 3-pane layout logic (Context -> List -> Dossier).
- Aggressively packed tables with strict vertical grid lines and zebra striping.
- Explicit, heavy borders to divide distinct functional areas.

### What we reject
- The cluttered, non-hierarchical "kitchen sink" approach of early AdminLTE templates. We maintain the structural density but enforce a strict hierarchy.

---

## Real Estate: The Sales Pipeline
**Reference Era**: Salesforce Lightning 1.0 (2015)

### What they did and why
Salesforce transitioned from Classic to Lightning to focus the UI entirely on the **lifecycle of a record**. They introduced the "Path" (a chevron-based progress bar) to visualize exactly where an opportunity was in the sales pipeline.

**Why it matters for Real Estate**: Mkani Real Estate *is* a CRM. The core workflow is moving a Unit from `Available` to `Sold`. The interface must be entirely organized around this pipeline.

### What we borrow
- The "Record Detail" page structure.
- The explicit Sales Path (chevrons) at the top of the record.
- Structured, 2-column stacked label-value pairs for metadata.
- Heavy use of Tabs to organize related lists (Installments, Viewings, Documents) rather than stacking them infinitely.

### What we reject
- The slow, heavy, overly-nested DOM structure of early Lightning. We use the layout logic but implement it with clean, modern CSS grid/flexbox.
