# Accessibility

Target: WCAG 2.2 AA

## Manual Checklist
- [x] Keyboard operation: All interactive elements are reachable and usable via Tab/Enter.
- [x] Focus states: Visible focus outline (3px solid #60a5fa).
- [x] Screen reader: Semantic landmarks (nav, main). Roles mapped to ARIA attributes.
- [x] Live regions: Streaming results use aria-live="polite".
- [x] Contrast: Colors checked to exceed 4.5:1.

## Known Gaps
- Mobile linear view for comparison table needs additional styling tweaks for screen magnification at 200%.
- PDF export may lack full tagging support on basic OS print-to-PDF drivers.
