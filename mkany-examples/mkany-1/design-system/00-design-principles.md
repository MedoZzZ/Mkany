# 00. Design Principles

**Mkani ERP is an Enterprise Operating System, not a SaaS dashboard.**

The primary objective of this design system is to apply rigorous 2010–2020 product design thinking to a 2026 engineering stack. We prioritize density, structural differentiation, and explicit workflows over aesthetic novelty.

## 1. Shared DNA, Distinct Dialects
The ERP Shell provides the global identity, application switcher, and cross-cutting concerns (authentication, language switching). However, the Shell **must not** enforce a global layout on its children. Agriculture, Legal, and Real Estate own their respective canvases entirely. 

## 2. Information Density Over Whitespace
Our users spend 6–8 hours a day in this system. They do not need onboarding flows or generous whitespace. They need maximum data density. If a component does not contribute to the operational workflow, it is removed.

## 3. Structural Differentiation
If all colors were removed, the three sub-applications must still be instantly recognizable. 
- **Agriculture**: Horizontal panoramic canvas (Operational Monitoring).
- **Legal**: Dense 3-pane digital dossier with heavy sidebar (Case Management).
- **Real Estate**: Record-centric layout with explicit pipeline/workflow paths (CRM).

## 4. No "Dashboard Drift"
We reject the modern trend of turning every application into a generic grid of floating white cards. A table is a table; it does not need to be wrapped in a card. A metric is a metric; it does not need a shadow.

## 5. Arabic First (RTL Native)
Arabic is not a translation layer; it is the primary operating language. Line heights, typography, and structural mirroring must be explicitly designed for RTL reading patterns, not just flipped via CSS.
