/* ============================================================
   Canvas Portfolio — content + behavior
   ------------------------------------------------------------
   ✏️  EDIT EVERYTHING IN THE `SITE` OBJECT BELOW.
       This is the only place you need to change to make the
       site yours — name, role, projects, skills, links, etc.
   ============================================================ */

const SITE = {
  // ---------- Identity ----------
  name: "YOUR NAME",              // big hero name (shown UPPERCASE)
  role: "PRODUCT DESIGNER",       // yellow pill badge
  location: "CITY, ST",           // pink location tag
  availability: "AVAILABLE FOR THOUGHTFUL PROJECTS",

  // sticky notes flanking the name
  badgeCurrent: "Currently at Company",
  badgePrevious: "Previously at Company",

  // hero headline (use * to emphasize a word, e.g. "*outstanding*")
  headline: "I design *outstanding* digital products.",

  // the two collaborator cursors that roam the canvas (initials)
  collaborators: ["EM", "PH"],

  // ---------- About ----------
  // use *word* to color a word pink
  about: "I'm YOUR NAME — a product designer who gets excited about making complicated things *simple*.",
  photo1Caption: "2026",
  photo2Caption: "my workspace",

  skills: [
    { label: "Interaction Design", icon: "▦" },
    { label: "Prototyping",        icon: "✳" },
    { label: "User Research",      icon: "◉" },
    { label: "Motion Design",      icon: "⣿" },
  ],

  // ---------- Featured work (stacked cards) ----------
  // color: blue | dark | yellow | pink  (drives the card theme)
  // subtags: optional small folder tags shown at the bottom-left
  projects: [
    {
      tab: "PROJECT 01", color: "blue",
      date: "JAN 2, 2025", name: "Project One",
      desc: "A short line about what this project did and who it helped.",
      link: "#", tag: "CATEGORY", count: "0 → 1", subtags: [],
    },
    {
      tab: "PROJECT 02", color: "dark",
      date: "MAR 14, 2025", name: "Project Two",
      desc: "Another one-liner describing the outcome of this work.",
      link: "#", tag: "CATEGORY", count: "1 → 10", subtags: [],
    },
    {
      tab: "PROJECT 03", color: "yellow",
      date: "AUG 9, 2025", name: "Project Three",
      desc: "What you shipped and the impact it made in one sentence.",
      link: "#", tag: "CATEGORY", count: "10 → 100", subtags: [],
    },
    {
      tab: "PROJECT 04", color: "pink",
      date: "NOV 20, 2025", name: "Project Four",
      desc: "A last highlight — the kind of work you want more of.",
      link: "#", tag: "CATEGORY", count: "∞", subtags: ["STRATEGY", "ENTERPRISE"],
    },
  ],

  // ---------- Let's talk / contact ----------
  talk: "I'm most energized by projects where I can dig into complex problems, collaborate with smart people, and ship things that genuinely improve someone's day.",
  openTo: "Open to contract work, full-time roles, and interesting conversations about hard design problems.",

  email: "you@example.com",
  socials: [
    { label: "Email",    href: "mailto:you@example.com" },
    { label: "LinkedIn", href: "#" },
    { label: "Twitter",  href: "#" },
    { label: "Dribbble", href: "#" },
  ],
};

/* ============================================================
   Rendering — no need to edit below this line
   ============================================================ */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// simple *emphasis* -> <span class="em">…</span>, escaped
function emphasize(str) {
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return esc(str).replace(/\*(.+?)\*/g, '<span class="em">$1</span>');
}
function initials(fullName) {
  return fullName.trim().split(/\s+/).slice(0, 2).map((w) => w[0] || "").join("").toUpperCase() || "•";
}

function render() {
  const S = SITE;

  const setText = (sel, val) => $$(sel).forEach((el) => (el.textContent = val));
  setText("[data-name]", S.name);
  setText("[data-name-inline]", S.name);
  setText("[data-footer-name]", S.name);
  setText("[data-role]", S.role);
  setText("[data-location]", S.location);
  setText("[data-availability]", S.availability);
  setText("[data-badge-current]", S.badgeCurrent);
  setText("[data-badge-previous]", S.badgePrevious);
  setText("[data-photo-1-cap]", S.photo1Caption);
  setText("[data-photo-2-cap]", S.photo2Caption);
  setText("[data-open-to]", S.openTo);

  $("[data-headline]").innerHTML = emphasize(S.headline);
  $("[data-about]").innerHTML = emphasize(S.about);
  $("[data-talk]").textContent = S.talk;

  const ini = initials(S.name);
  $$("[data-initials-1]").forEach((el) => (el.textContent = ini));
  $$("[data-initials-2]").forEach((el) => (el.textContent = ini.split("").reverse().join("")));

  $("[data-contact-link]").href = S.email ? `mailto:${S.email}` : "#";
  $("[data-social]").innerHTML = S.socials.map((s) => `<a href="${s.href}">${s.label}</a>`).join("");

  $("[data-skills]").innerHTML = S.skills
    .map((s) => `<li>${s.label}<span class="chip-ico">${s.icon || "•"}</span></li>`)
    .join("");

  renderProjects(S.projects);
}

/* ---------- Featured work: scroll-stacked cards ---------- */
function renderProjects(projects) {
  const stack = $("[data-project-stack]");
  const n = projects.length;
  stack.innerHTML = projects
    .map((p, i) => {
      const tabsRow = projects
        .map((q, j) => `<span class="pcard__tab ${j === i ? "is-active" : ""} tab-${q.color}"
          style="left:${j * 172}px">
          <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M4 20V9h5v11M9 20V4h6v16M15 20v-7h5v7" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linejoin="round"/></svg>
          ${q.tab}</span>`)
        .join("");
      const subtags = (p.subtags || [])
        .map((t) => `<span class="pcard__subtag">${t}</span>`)
        .join("");
      return `<article class="pcard card-${p.color}" style="z-index:${i + 1}; top: calc(var(--nav-h) + ${18 + i * 8}px)">
        <div class="pcard__tabs">${tabsRow}</div>
        <div class="pcard__inner">
          <div class="pcard__info">
            <span class="pcard__date">${p.date}</span>
            <h3 class="pcard__name">${p.name}</h3>
            <p class="pcard__desc">${p.desc}</p>
            <a class="pcard__link" href="${p.link}">VIEW PROJECT ↗</a>
            <div class="pcard__meta">
              <span class="pcard__folder">${p.tag}</span>
              <span class="pcard__folder">${p.count}</span>
            </div>
            ${subtags ? `<div class="pcard__subtags">${subtags}</div>` : ""}
          </div>
          <div class="pcard__media" data-selectable>
            <span class="pcard__imgtag"><b>JPG</b> IMAGE.JPG</span>
            <span class="handle handle--tl"></span><span class="handle handle--tr"></span>
            <span class="handle handle--bl"></span><span class="handle handle--br"></span>
          </div>
        </div>
      </article>`;
    })
    .join("");
  // spacer so the last card can fully pin before the next section
  stack.style.setProperty("--stack-count", n);
}

/* ---------- Live clock ---------- */
function startClock() {
  const el = $("#clock");
  if (!el) return;
  const tick = () => {
    el.textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };
  tick();
  setInterval(tick, 1000);
}

/* ---------- The "YOU" cursor follows the real mouse ---------- */
function startCursor() {
  const cur = $(".cursor-you");
  if (!cur) return;
  let x = window.innerWidth / 2, y = window.innerHeight / 2, tx = x, ty = y;
  window.addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; });
  const loop = () => {
    x += (tx - x) * 0.18; y += (ty - y) * 0.18;
    cur.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(loop);
  };
  loop();
}

/* ---------- Autonomous collaborator cursors (EM / PH) ---------- */
function startCollaborators() {
  if (prefersReduced) return;
  const layer = $(".collab-cursors");
  if (!layer) return;
  const names = SITE.collaborators || ["EM", "PH"];
  const hues = ["#e6285e", "#7b61ff"];

  names.forEach((name, i) => {
    const el = document.createElement("div");
    el.className = "ccur";
    el.style.setProperty("--hue", hues[i % hues.length]);
    el.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M5 3l14 7-6 2-2 6z" fill="var(--hue)" stroke="#fff" stroke-width="1.2"/></svg><span class="ccur__label">${name}</span>`;
    layer.appendChild(el);

    const move = () => {
      const pad = 120;
      const x = pad + Math.random() * (window.innerWidth - pad * 2);
      const y = 120 + Math.random() * (window.innerHeight - 260);
      const dur = 2200 + Math.random() * 2200;
      el.style.transition = `transform ${dur}ms cubic-bezier(.5,.05,.2,1)`;
      el.style.transform = `translate(${x}px, ${y}px)`;
      setTimeout(move, dur + 600 + Math.random() * 1400);
    };
    // stagger start
    el.style.transform = `translate(${window.innerWidth * (0.2 + 0.5 * i)}px, ${window.innerHeight * 0.4}px)`;
    setTimeout(move, 600 + i * 900);
  });
}

/* ---------- Intro: "Hey there!!" load sequence ---------- */
function startIntro() {
  const intro = $(".intro");
  if (!intro) return;
  if (prefersReduced) { intro.remove(); return; }
  const txt = $(".intro__bubble span", intro);
  const full = "Hey there!!";
  let i = 0;
  const type = () => {
    txt.textContent = full.slice(0, i);
    if (i++ <= full.length) { setTimeout(type, 70); }
    else {
      setTimeout(() => {
        intro.classList.add("intro--collapse");
        setTimeout(() => intro.remove(), 650);
      }, 500);
    }
  };
  type();
}

/* ---------- Scroll reveals for below-the-fold sections ---------- */
function startReveals() {
  const items = $$("[data-reveal]");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const obs = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); obs.unobserve(e.target); } }),
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
  );
  items.forEach((el) => obs.observe(el));
}

/* ---------- Nav active-tab on scroll ---------- */
function startScrollSpy() {
  const map = { home: "home", about: "about", work: "work", contact: "playground" };
  const sections = ["home", "about", "work", "contact"].map((id) => $("#" + id)).filter(Boolean);
  const tabs = $$(".tab");
  const obs = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const key = map[en.target.id] || en.target.id;
      tabs.forEach((t) => t.classList.toggle("is-active", t.dataset.tab === key));
    }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => obs.observe(s));
}

document.addEventListener("DOMContentLoaded", () => {
  render();
  startClock();
  startCursor();
  startCollaborators();
  startIntro();
  startReveals();
  startScrollSpy();
});
