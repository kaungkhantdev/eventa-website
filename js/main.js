/* Eventa marketing site: interactions and one-time entrance animations.
   Plain JS, no dependencies. Nothing loops; under prefers-reduced-motion every
   block is shown at once. */
(() => {
  "use strict";

  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const hasObserver = "IntersectionObserver" in window;

  // The <head> failsafe drops "js" when this script starts more than 3s late
  // (slow network). Put it back, and show every block at once.
  const late = !root.classList.contains("js");
  if (late) root.classList.add("js", "js-late");

  /* ---------- Scroll reveal ----------
     Wired first: if anything below throws, the page is still revealed. */
  const revealables = $$("[data-reveal]");
  const show = (el) => el.classList.add("is-visible");
  if (reduceMotion || !hasObserver || late) {
    revealables.forEach(show);
  } else {
    // The hero is the first screen: its blocks (the product window and its
    // toasts too, even when they start below the fold on a short screen) play
    // their entrance on load, staggered by --d, instead of waiting for a scroll.
    revealables.filter((el) => el.closest(".hero")).forEach(show);
    const reveal = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          show(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    revealables.filter((el) => !el.closest(".hero")).forEach((el) => reveal.observe(el));
  }
  // Tells the inline failsafe in <head> that reveals are under control.
  root.classList.add("js-ready");

  /* ---------- Nav: solid background once scrolled, and the current section ---------- */
  const nav = $("[data-nav]");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const navLinks = $$(".nav__links a");
  if (hasObserver) {
    // Every section is watched; one with no nav link (the hero, the closing
    // call to action) clears the highlight instead of leaving a stale one.
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) =>
            link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`),
          );
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    $$("main > section").forEach((section) => spy.observe(section));
  }

  /* ---------- Mobile menu ---------- */
  const toggle = $("[data-menu-toggle]");
  const menu = $("[data-menu]");
  const toggleIcon = $("use", toggle);
  const toggleLabel = $(".sr-only", toggle);

  function setMenu(open) {
    menu.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    toggleIcon.setAttribute("href", open ? "#i-close" : "#i-menu");
    toggleLabel.textContent = open ? "Close menu" : "Open menu";
  }

  toggle.addEventListener("click", () => setMenu(menu.hidden));
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) {
      setMenu(false);
      toggle.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!menu.hidden && !nav.contains(event.target)) setMenu(false);
  });
  // Tabbing out of the open menu closes it, so it never covers the next control.
  nav.addEventListener("focusout", (event) => {
    if (!menu.hidden && event.relatedTarget && !nav.contains(event.relatedTarget)) setMenu(false);
  });

  /* ---------- Pricing: monthly / yearly ---------- */
  const billing = $("[data-billing]");
  const billingWrap = billing && billing.closest(".billing");
  const priceEls = $$("[data-price], [data-price-note]");

  function setBilling(yearly) {
    if ((billing.getAttribute("aria-checked") === "true") === yearly) return;
    billing.setAttribute("aria-checked", String(yearly));
    billingWrap.classList.toggle("is-yearly", yearly);
    billingWrap.classList.toggle("is-monthly", !yearly);
    const boxes = new Set(priceEls.map((el) => el.closest(".plan__price")));
    boxes.forEach((box) => box.classList.add("is-swapping"));
    setTimeout(
      () => {
        priceEls.forEach((el) => (el.textContent = yearly ? el.dataset.yearly : el.dataset.monthly));
        boxes.forEach((box) => box.classList.remove("is-swapping"));
      },
      reduceMotion ? 0 : 220,
    );
  }

  if (billing) {
    billingWrap.classList.add("is-monthly");
    billing.addEventListener("click", () => setBilling(billing.getAttribute("aria-checked") !== "true"));
    // Clicking either label also sets the switch.
    $$(".billing span[id]").forEach((label) =>
      label.addEventListener("click", () => setBilling(label.id === "bill-yearly")),
    );
  }

  /* ---------- FAQ accordion: one answer open at a time ---------- */
  const accordion = $("[data-accordion]");
  if (accordion) {
    const items = $$(".acc", accordion);
    const setOpen = (item, open) => {
      item.classList.toggle("is-open", open);
      $("button", item).setAttribute("aria-expanded", String(open));
    };
    items.forEach((item) => {
      const button = $("button", item);
      setOpen(item, button.getAttribute("aria-expanded") === "true");
      button.addEventListener("click", () => {
        const opening = button.getAttribute("aria-expanded") !== "true";
        items.forEach((other) => setOpen(other, other === item ? opening : false));
      });
    });
  }

  /* ---------- Footer year ---------- */
  const year = $("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
})();
