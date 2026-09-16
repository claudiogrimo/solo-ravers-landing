# Solo Ravers Invite Landing Design

## Direction

Raw warehouse techno: a black-paper event poster with acidic green signals, dense display type, and red ticket accents. The page should feel like a night schedule pasted on a venue wall, not a generic event template.

## Visual system

- Canvas: near-black `#11110f`, warm paper `#f1eee4`, concrete gray `#b9b6ad`.
- Signal colors: acid `#d7ff00` for dates, dividers, and labels; red `#ff4b2b` for ticket calls-to-action.
- Type: `Arial Narrow`, `Impact`, and fallback sans-serif. Deliberately condensed display scale; body remains legible.
- Layout: dense editorial grid, hard borders, oversized type, short blocks, no rounded cards.
- Motion: CSS-only entrance/reveal and a subtle moving grid in the hero. Respect `prefers-reduced-motion`.

## Content behavior

- The two event parts remain visually distinct. The free pre-drinks pass must never be confused with access to the main party.
- Ticket links are external. No forms, account flows, CMS, SEO metadata, or client-side application state.

## Responsive behavior

- Mobile starts with essential date, title, and ticket paths.
- Grids collapse to one column; the program keeps a left-hand time rail where space permits.
