# AGENTS.md

Guidance for AI coding agents (Claude Code, Cursor, Codex, …) working in this
repository — the single source of truth; tool-specific files import it.

## What this is

**Eventa's public landing page** — one static page that tells event organizers what Eventa
does, shows the product, lists every feature, and answers common questions. Plain HTML, CSS and JavaScript: **no build
system, no package.json, no dependencies to install.** The only thing loaded from outside the repo
is the Inter font from Google Fonts; offline, the page falls back to the system font.

- `index.html` — the whole page. Sections in order: hero `#top`, `#features`, `#solutions` (use
  cases), `#platform` (every feature, one card each), `#faq`, `#get-started` (the closing call to
  action), then the footer. Every
  icon is a `<symbol>` in the one SVG sprite at the top of `<body>`, used as
  `<svg class="i"><use href="#i-name" /></svg>`.
- `css/styles.css` — design tokens on `:root`, then base and components, one block per section,
  scroll reveal, keyframes, the responsive `@media` blocks, reduced motion and print, in that order.
- `js/main.js` — one IIFE, no dependencies: scroll reveal, nav, mobile menu, the FAQ accordion
  and the footer year.
- `assets/shots/` — product screenshots as WebP, `@1x` and `@2x` (`hero-mobile` also `@3x`).

## Running / previewing

Open `index.html` directly, or serve the folder with `python3 -m http.server 4600` and open
http://localhost:4600. There are no tests, linter or build step, so before calling a change done:

- Run `node --check js/main.js`.
- Look at the page at 1440, 768, 390 and 320px wide: no horizontal scroll, no console errors, no
  clipped text.
- Load it with `prefers-reduced-motion: reduce`, and again with JavaScript off. Every block must
  show both times.

## Principles (non-negotiable)

1. **Say only what Eventa does.** Every feature, number and promise on the page must match
   eventa-docs, where the `US-*` stories in `01-requirements-and-features/` are the spec. Don't
   invent customers, testimonials, ratings, statistics or integrations. Where a decision does not
   exist yet (prices, plans, the contact channel, the sign-up URL), leave a
   `<!-- PLACEHOLDER … -->` comment in `index.html` rather than making one up.
2. **Product images are captures of eventa-ui-kit, never hand-drawn mock-ups.** See
   **Product screenshots** below. The footer says "Product screens show sample data"; keep it
   while that is true.
3. **No contact details in an image that could reach a real person.** Emails become
   `…@example.com` and phone numbers dummy ones such as `+66 81 234 5678`.
4. **The page collects nothing.** No form takes a card, a payment or account details (PCI SAQ-A
   holds here too): sign-up, log-in and checkout live in eventa-web. No PII or token in a URL. No
   analytics, tracking or third-party script without asking.
5. **Motion never hides content**, and nothing loops. See **How the page behaves**.
6. **Accessible by default.** Text keeps at least 4.5:1 contrast against its background, the
   deep-green surfaces included. Every control is reachable and visibly focused by keyboard.
7. **No new dependency, framework, CDN script or build step without asking.**
8. **Ask before architectural changes**, and don't refactor unrelated code while making a change.

## How the page behaves (keep these working)

- **Scroll reveal.** A block with `data-reveal` (optional `--d` delay) fades in once, when it
  scrolls into view; the hero's blocks reveal on load. Under `prefers-reduced-motion` every block
  shows at once.
- **The reveal can never leave the page blank.** The inline script in `<head>` adds `js`, which
  hides reveal blocks, and gives `main.js` 3 seconds to add `js-ready`. If it doesn't, the script
  removes `js` and everything shows. A `main.js` that arrives later adds `js js-late` and shows
  every block at once. Without JavaScript nothing is hidden.
- **Nothing loops.** No `infinite` animation and no timer-driven motion: a loop would need a pause
  control (WCAG 2.2.2). The page had one and dropped it when it stopped looping.
- **Beta notice.** A slim dark bar (`.beta-bar`) is fixed above the nav and says the site is a
  test version. Its height is `--bar-h`, which `--nav-h` (the whole fixed header) includes. At
  launch, remove the bar and set `--bar-h` to `0px`.
- **Nav.** It sits on the white page above the hero card, and turns into a solid bar
  (`.is-scrolled`) after 12px of scroll. Without JavaScript it is solid from the start. It highlights the link of the section in view.
- **Mobile menu** (960px and narrower). It closes on Escape (focus returns to the toggle), on a
  link, on a click outside the nav, and when focus tabs out. Without JavaScript the toggle cannot
  open it; the footer carries the same links.
- **FAQ.** One answer open at a time, the first open to start. Without JavaScript every answer
  shows; closed answers don't print.
- **Focus.** A dark ring by default and a white one on the dark-green hero card (`.hero__panel`). The skip link goes to `#main`.
- **Print** hides the nav and the skip link, and shows every reveal block.

## Product screenshots (`assets/shots/`)

Each one is a capture of a page in eventa-ui-kit, at the viewport given here:

| File | Kit page · viewport |
| --- | --- |
| `hero` | `admin/dashboard.html` · 1280×800 |
| `hero-mobile` | `admin/dashboard.html` · 390×844, phone layout |
| `feature-sales` | `admin/tickets.html` · 1440×900 |
| `feature-attendees` | `admin/attendees.html` · 1440×900 |
| `feature-messaging` | `admin/messaging-templates.html` · 760×900 |
| `solution-conferences` | `admin/event-detail.html` · 760×1100, Agenda tab |
| `solution-concerts` | `portal/register.html` · 760×1100, two seats picked |
| `solution-workshops` | `admin/registrations.html` · 1000×900, Pending tab |
| `solution-workshops-survey` | `admin/feedback-detail.html` · 1440×900 |

The capture script is not in this repo. A new capture has to match the others:

- Serve the kit over http (`python3 -m http.server 4599` in eventa-ui-kit). Over `file://`, Chrome
  blocks the kit's logo mask.
- Light theme: set localStorage `eventa-theme` to `light` and emulate
  `prefers-color-scheme: light`.
- Wait for Inter, the Hugeicons font, Tailwind and the charts. Turn off animations and transitions.
  Hide scrollbars, rail tooltips, the text caret and the kit's `?empty` pill; move the pointer away
  and clear focus.
- Capture each density at its own device scale factor (1, 2, 3). Never shrink a 2x file to make
  the 1x.
- Cut crops in the gaps between rows or cards, never through text, with up to 16px of the kit's
  grey around them.
- Swap emails and phone numbers (principle 3) in the browser before capturing. Never edit the
  kit's files.

When a file changes, update the markup that describes it:

- The `<img>`'s `width` and `height` are the 1x size, and its `srcset` lists the `@1x` and `@2x`
  files. `hero-mobile`'s size and its `@3x` file sit on the `<source media="(max-width: 720px)">`.
  `solution-concerts` lists `760w, 1520w` with a `sizes` list built on that width; update both.
- Tile crops carry `style="--w: <1x width>px"`, and `--top` where a crop is lifted so its cut falls
  between rows. The survey card's crop size is also written into `.spot-survey` in `styles.css`.
- Alt texts quote the figures in the shot. Rewrite them when the figures change.

## Design conventions to preserve

- **Tokens.** Use the `:root` variables, not new literal colours. Brand green `#00c066` and the ink
  colour follow eventa-web's `src/styles/tokens.css`.
- **One dark surface.** The deep greens (`--deep-900/800/700`, with the `--grain` noise over them)
  are for the hero card only; the rest of the page is light.
- **Product windows** use `--shadow-window` over the kit's grey (`--kit-canvas`); cards use the
  lighter `--shadow-*` steps.
- **Use-case shots sit in an app window** (`.spot-window`: a top bar with three dots and an empty
  address bar) inside a patterned frame. Keep the address bar empty: Eventa's domain is not
  decided, so never write a URL there.
- Font **Inter**. Currency **Thai Baht (฿)**.

## Contracts with sibling repos (no shared package)

- **eventa-ui-kit** is upstream for the product's look and the source of every screenshot. A kit
  change does not reach this page by itself; retake the affected shots.
- **eventa-web** is the app this page sends people to (log in and sign up are still placeholders),
  and the source of the brand tokens.
- **eventa-docs** decides what the page may claim. Each card in `#platform` follows a user story
  there; a new card needs one too. It defines no prices or plans yet, so the page shows none.
- **eventa-api**: none. The page calls no API and sends no data anywhere.
