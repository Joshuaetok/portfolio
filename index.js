(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;

  /* ---------- Theme ---------- */
  const themeBtn = $("#themeBtn");
  const meta = $('meta[name="theme-color"]');
  const paintTheme = () => {
    const light = root.getAttribute("data-theme") === "light";
    themeBtn.innerHTML = `<i class="uil uil-${light ? "moon" : "sun"}"></i>`;
    if (meta) meta.content = light ? "#f5f7f3" : "#06080a";
  };
  themeBtn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("portfolio-theme-v2", next);
    } catch (e) {}
    paintTheme();
  });
  paintTheme();

  /* ---------- Scroll progress ---------- */
  const bar = $(".progress span");
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const max = root.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      ticking = false;
    });
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll (staggered per parent) ---------- */
  const revealEls = $$(".reveal");
  revealEls.forEach((el) => {
    const sibs = $$(":scope > .reveal", el.parentElement);
    el.style.setProperty("--d", `${Math.max(0, sibs.indexOf(el)) % 4 * 0.08}s`);
  });
  if ("IntersectionObserver" in window && !reduced) {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* ---------- Count-up stats ---------- */
  $$("[data-count]").forEach((el) => {
    const end = +el.dataset.count;
    const suffix = el.dataset.suffix || "";
    if (reduced) return;
    el.textContent = "0" + suffix;
    const run = () => {
      const t0 = performance.now();
      const dur = 1600;
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    new IntersectionObserver((es, o) => {
      if (es[0].isIntersecting) {
        run();
        o.disconnect();
      }
    }).observe(el);
  });

  /* ---------- Active nav link (scroll spy) ---------- */
  const links = $$("[data-spy]");
  const sections = links.map((l) => document.getElementById(l.dataset.spy)).filter(Boolean);
  const spy = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((l) => l.classList.toggle("is-active", l.dataset.spy === e.target.id));
      }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));

  /* ---------- Resume tabs (accessible) ---------- */
  const tabs = $$('[role="tab"]');
  const select = (tab, focus) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", on);
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute("aria-controls"));
      panel.hidden = !on;
      panel.classList.toggle("is-active", on);
    });
    if (focus) tab.focus();
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => select(tab));
    tab.addEventListener("keydown", (e) => {
      const k = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (k) {
        e.preventDefault();
        select(tabs[(i + k + tabs.length) % tabs.length], true);
      } else if (e.key === "Home") {
        e.preventDefault();
        select(tabs[0], true);
      } else if (e.key === "End") {
        e.preventDefault();
        select(tabs[tabs.length - 1], true);
      }
    });
  });

  /* ---------- Project filters (+ live counts) ---------- */
  const cards = $$(".project");
  const pills = $$(".pill");
  pills.forEach((p) => {
    const f = p.dataset.filter;
    p.querySelector("span").textContent =
      f === "all" ? cards.length : cards.filter((c) => c.dataset.cat === f).length;
    p.addEventListener("click", () => {
      pills.forEach((x) => x.classList.toggle("is-active", x === p));
      cards.forEach((c) => {
        const show = f === "all" || c.dataset.cat === f;
        if (show) {
          c.hidden = false;
          c.classList.add("in");
          requestAnimationFrame(() => c.classList.remove("is-leaving"));
        } else {
          c.classList.add("is-leaving");
          c.hidden = true;
        }
      });
    });
  });

  // Spotlight follows the pointer
  cards.forEach((c) =>
    c.addEventListener("pointermove", (e) => {
      const r = c.getBoundingClientRect();
      c.style.setProperty("--mx", `${e.clientX - r.left}px`);
      c.style.setProperty("--my", `${e.clientY - r.top}px`);
    })
  );

  /* ---------- Reviews carousel ---------- */
  const track = $("#reviewTrack");
  const step = () => {
    const first = track.firstElementChild;
    return first.getBoundingClientRect().width + 20;
  };
  $("#next").addEventListener("click", () => {
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    track.scrollBy({ left: atEnd ? -track.scrollWidth : step(), behavior: "smooth" });
  });
  $("#prev").addEventListener("click", () => {
    const atStart = track.scrollLeft <= 4;
    track.scrollBy({ left: atStart ? track.scrollWidth : -step(), behavior: "smooth" });
  });

  /* ---------- FAQ: only one open at a time ---------- */
  const faqs = $$(".faq details");
  faqs.forEach((d) =>
    d.addEventListener("toggle", () => {
      if (d.open) faqs.forEach((o) => o !== d && (o.open = false));
    })
  );

  /* ---------- Form success notice ---------- */
  if (new URLSearchParams(location.search).get("sent") === "1") {
    $("#formOk").hidden = false;
  }

  $("#year").textContent = new Date().getFullYear();
})();
