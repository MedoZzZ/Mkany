# Shell Composition

## The Parent Frame
The ERP Shell exists solely to provide shared DNA and navigation routing between the three distinct sub-applications. It **must not** dominate the visual space.

## Composition Rules
- **Height**: Strictly `48px` tall.
- **Background**: `navy-900` (#202124).
- **Injections**: The Shell does NOT inject sidebars, footers, or margin constraints into the sub-applications. It provides an `<Outlet />` that occupies `calc(100vh - 48px)` and `100%` width. The sub-applications are responsible for their own internal padding, sidebars, and constraints.
- **The Switcher**: The waffle menu dropdown is the only element that floats over the sub-application. It must close immediately upon selection.
