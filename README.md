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

## Product screenshots

Every product picture is a capture of
[eventa-ui-kit](https://github.com/kaungkhantdev/eventa-ui-kit), the visual source of
truth. They are not drawings of the app. The data in them is the kit's sample data, and
the footer says so.

| File in `assets/shots/` | Kit page and viewport | What it shows |
| --- | --- | --- |
| `hero` | `admin/dashboard.html` · 1280×800 | The Dashboard, with the icon rail |
| `hero-mobile` | `admin/dashboard.html` · 390×844, phone layout | The same Dashboard. The page uses it at 720px and below |
| `feature-sales` | `admin/tickets.html` · 1440×900 | Four ticket types with their sales progress |
| `feature-attendees` | `admin/attendees.html` · 1440×900 | Attendee tabs, search and the first five rows |
| `feature-messaging` | `admin/messaging-templates.html` · 760×900 | Four automated message templates |
| `solution-conferences` | `admin/event-detail.html` · 760×1100, Agenda tab | The Tech Summit 2026 agenda |
| `solution-concerts` | `portal/register.html` · 760×1100 | The buyer's seat picker with two seats picked |
| `solution-workshops` | `admin/registrations.html` · 1000×900, Pending tab | Five pending registrations with approve and decline |
| `solution-workshops-survey` | `admin/feedback-detail.html` · 1440×900 | The "Overall satisfaction" survey card |

When you refresh one, keep it consistent with the rest:

- **Light theme**, with fonts, icons and charts fully loaded. Animations are off, and there
  are no hover, caret or focus marks.
- **Render each density at that density** (device scale factor 1, 2 or 3). Never scale a 2x
  file down to make the 1x.
- **No real-looking personal data.** Before capture, change emails to `…@example.com` and
  phone numbers to dummy ones such as `+66 81 234 5678`. Change the page in the browser,
  not the kit's files.
- **Update the `<img>` too.** Its `width`, `height` and `srcset` follow the image's 1x size.

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
