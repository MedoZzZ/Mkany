# Real Estate Composition (SLDS 1.0)

## The Sales Pipeline
The Real Estate application is fundamentally a CRM. The core workflow involves moving a Property Unit or an Opportunity through a strict lifecycle pipeline.

## Composition Rules
- **Record Detail Layout**: The primary view is the Record Page (e.g., a specific Unit or Contract).
- **The Status Path**: The top of a Record Page must feature a prominent, chevron-based "Path" visualizing the pipeline (e.g., `Available > Reserved > Contracted > Sold`).
- **Background**: Soft gray canvas (`#F4F6F9`).
- **Stacked Metadata**: Avoid dense paragraphs. Present metadata as strict 2-column grids of stacked label-value pairs (Label: 12px uppercase; Value: 14px bold; 2px vertical gap).
- **Tabs for Related Lists**: Do not infinitely scroll related data (like Installments, Viewings, Documents). Organize them into explicit Tabs within the main content area.
- **Borders over Backgrounds**: Cards and panels have white backgrounds (`#FFFFFF`) with strict gray borders (`#DDDBDA`) and a `4px` radius. Use a `4px` thick colored left-border on inventory cards to instantly communicate status (e.g., Green = Available).
