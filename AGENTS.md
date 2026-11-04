# AGENTS.md

Instructions for AI coding agents in this repo. `CLAUDE.md` imports it; only Claude-specific lines go there.

- **Trust order.** `index.html`, `css/styles.css` and `js/main.js` say how the page works; the
  `US-*` stories in eventa-docs say what the page may claim. Both outrank this file: when they
  disagree with it, follow them and fix this file in the same change.
- **Don't guess.** Look up a name before you use it: file, script, env var, endpoint, table, story
  ID. If you can't find it, say so instead of inventing it.
- **Counts and lists go stale.** This file has none on purpose; run the command it gives instead.

## What this is

Eventa's public landing page for event organizers: static HTML, CSS and JavaScript, no build,
nothing to install. Its only outside request is the Inter font. It is not the app; sign-up, log-in
and checkout are eventa-web.

## Commands

```sh
python3 -m http.server 4600      # preview at http://localhost:4600
node --check js/main.js          # syntax only; no CI
grep -n PLACEHOLDER index.html   # undecided links, contact channel, beta notice
```

## Rules

1. **Say only what Eventa does.** Every claim, and every `#platform` card, needs a `US-*` story in
   [functional-requirements.md](../eventa-docs/01-requirements-and-features/functional-requirements.md).
   No invented customers, testimonials or statistics. Where a decision is missing
   (prices, contact channel, sign-up URL), leave a `<!-- PLACEHOLDER … -->` comment.
2. **Product images are eventa-ui-kit captures**, never mock-ups; keep the footer's "Product
   screens show sample data".
3. **No real contact details in an image:** emails become `…@example.com`, phone numbers dummies.
4. **The page collects nothing.** Never a card, payment or account form (PCI SAQ-A; those live in
   eventa-web). No other form, analytics or tracking without asking.
5. **Motion never hides content, and nothing loops:** no `infinite` animation or timer-driven
   motion (WCAG 2.2.2).
6. **Accessible** (light theme only; `NFR-UX-*` in
   [non-functional-requirements.md](../eventa-docs/01-requirements-and-features/non-functional-requirements.md)):
   4.5:1 text contrast, hero card included; every control keyboard-reachable with visible focus.
7. **Ask first** before adding a dependency, CDN script, build step or architectural change. Don't
   refactor what the task doesn't touch.
8. **Use the existing system:** `:root` tokens, not new colours; deep greens (`--deep-*`) only on
   the hero card; icons as a `<symbol>` in the sprite atop `<body>`.
9. **Check before done:** 1440, 768, 390 and 320px (no horizontal scroll, console error or
   clipped text), then reduced motion and JavaScript off: every block shows.

## Gotchas

- **Reveal fail-safe.** The `<head>` script adds `js`, which hides `[data-reveal]` blocks, and
  removes it unless `main.js` adds `js-ready` within 3 seconds. Keep the reveal wiring and
  `js-ready` at the top of `main.js`, before anything that can throw.
- **Hide what JavaScript reveals** (reveal blocks, closed FAQ answers) only under `.js` selectors,
  so JS-off and the fail-safe still show it. The mobile menu can't open without JS, so the footer
  keeps the section links.
- **Beta bar.** The height of `.beta-bar`, `--bar-h`, is part of `--nav-h`. At launch, remove the
  bar and set `--bar-h` to `0px`.
- **Leave the `.spot-window` address bar empty:** no domain is decided.

## Product screenshots

`ls assets/shots` lists the shots (`<name>@1x.webp` and `@2x`). Each one's kit page is in the
`index.html` comment before it; the hero's is `admin/home.html`. No repo holds the capture
script, so record each shot's viewport here: hero 1280×835; feature-sales, feature-attendees,
solution-workshops-survey 1440×900; feature-messaging 760×900; solution-conferences,
solution-concerts 760×1100; solution-workshops 1000×900.

To match them, serve the kit over http (`python3 -m http.server 4599` in eventa-ui-kit;
`file://` breaks its logo mask) with localStorage `eventa-theme` set to `light` and
`prefers-color-scheme: light`. Wait for fonts, Tailwind and charts; turn off animations; hide
scrollbars, tooltips, caret, pointer and focus. Capture each density at its own device scale
factor; never shrink the 2x. Crop between rows, never through text, with up to 16px of kit
grey. Swap contact details in the browser, never in the kit's files.

When a shot changes, update in `index.html` its 1x `width`/`height`, `srcset` (and `sizes` on
`hero` and `solution-concerts`), the crop's `--w`/`--top`, and the alt text, which quotes the
shot's figures (prices in ฿). Crop sizes are also built into CSS:
`grep -nE 'hero-overlap|hero-fade:|spot-shot--|--pair|spot-survey' css/styles.css`.

## Where things are

- `css/styles.css`: one commented block per section; breakpoints only in the shared `@media`
  blocks at the end.

## Sibling repos

- **eventa-ui-kit:** source of every shot; a kit change means retaking the affected shots.
- **eventa-web:** the app the log-in and sign-up links will target (`src/app/routes.tsx`). Brand
  colours follow its `src/index.css` and `src/styles/tokens.css`.
- **eventa-docs:** the source of claims (rule 1). It defines no organizer plans or subscription
  prices yet.
- **eventa-api:** none; the page calls no API.

## Editing this file

Add a line only for something an agent got wrong that the code could not have told it. No counts,
inventories, version lists or history of past mistakes: point to the file or command instead. Keep
it under 800 words.
