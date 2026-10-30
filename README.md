# eventa-website

The public landing page for **Eventa**: event registration and management for
organizers in Thailand. One page covers what Eventa does, real screens of the
product, pricing and an FAQ.

Plain HTML, CSS and JavaScript. There is no build step and no `package.json`, so there
is nothing to install.

## Run it

Open `index.html` in a browser, or serve the folder:


## What's here

```
.
├── index.html        # the whole page, with every icon in one SVG sprite at the top of <body>
├── css/styles.css    # tokens, layout, sections, breakpoints, reduced motion, print
├── js/main.js        # scroll reveal, nav, mobile menu, monthly/yearly prices, FAQ
└── assets/
    ├── logo-mark.svg, favicon.svg
    └── shots/        # product screenshots: WebP at 1x and 2x (the phone hero also 3x)
```

The sections, top to bottom:
- hero (`#top`)
- features (`#features`)
- use cases (`#solutions`)
- pricing (`#pricing`)
- FAQ (`#faq`)
- closing call to action (`#get-started`)
- footer


## How the page behaves

- **Nothing loops.** Each block fades in once when it scrolls into view. The hero plays on
  load.
- **Reduced motion:** with `prefers-reduced-motion`, everything shows at once.
- **The page never stays hidden:**
  - An inline script in `<head>` adds a `js` class, which hides blocks until they reveal.
  - If `main.js` has not set `js-ready` within 3 seconds, that script removes `js` again.
  - If `main.js` arrives late, it shows every block at once.
  - Without JavaScript, nothing is hidden.
- **Keyboard:**
  - A skip link goes to the content.
  - Focus rings turn white on the dark-green hero.
  - The mobile menu closes on Escape, on a click outside it, or when focus tabs out.
- **Print:** the nav, the skip link and the notifications are dropped, and every block
  prints.

## Before launch

These placeholders are marked `PLACEHOLDER` in `index.html`:

- **Links with no target yet:** `#login`, `#signup`, `#about`, `#careers`, `#contact`,
  `#privacy`, `#terms`, and the social profile links.
- **Pricing:** the plans, limits, trial length, yearly discount and prices are not defined
  in eventa-docs yet. The FAQ answer "Is there a free plan?" depends on them.
- **Contact:** "Contact our team" needs the real channel (email or LINE OA).

## License

Proprietary — all rights reserved. This repository is public so that it can be
read; it is not open-source software, and no right to use, copy, modify or run
it is granted. See [LICENSE](LICENSE).
