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

  // ---------- Featured work ----------
  projects: [
    {
      tab: "PROJECT 01",
      date: "JAN 2, 2025",
      name: "Project One",
      desc: "A short line about what this project did and who it helped.",
      link: "#",
      tag: "CATEGORY",
      count: "0 → 1",
    },
    {
      tab: "PROJECT 02",
      date: "MAR 14, 2025",
      name: "Project Two",
      desc: "Another one-liner describing the outcome of this work.",
      link: "#",
      tag: "CATEGORY",
      count: "1 → 10",
    },
    {
      tab: "PROJECT 03",
      date: "AUG 9, 2025",
      name: "Project Three",
      desc: "What you shipped and the impact it made in one sentence.",
      link: "#",
      tag: "CATEGORY",
      count: "10 → 100",
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

  // text bindings
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

  // avatars / initials
  const ini = initials(S.name);
  $$("[data-initials-1]").forEach((el) => (el.textContent = ini));
  $$("[data-initials-2]").forEach((el) => (el.textContent = ini.split("").reverse().join("")));

  // contact link + socials
  $("[data-contact-link]").href = S.email ? `mailto:${S.email}` : "#";
  $("[data-social]").innerHTML = S.socials
    .map((s) => `<a href="${s.href}">${s.label}</a>`)
    .join("");

  // skills
  $("[data-skills]").innerHTML = S.skills
    .map((s) => `<li>${s.label}<span class="chip-ico">${s.icon || "•"}</span></li>`)
    .join("");

  // projects: tabs + panels
  const tabsEl = $("[data-project-tabs]");
  const bodyEl = $("[data-project-body]");
  tabsEl.innerHTML = S.projects
    .map(
      (p, i) => `<button class="folder__tab" role="tab" aria-selected="${i === 0}" data-idx="${i}">
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M4 20V9h5v11M9 20V4h6v16M15 20v-7h5v7" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linejoin="round"/></svg>
        ${p.tab}
      </button>`
    )
    .join("");
  bodyEl.innerHTML = S.projects
    .map(
      (p, i) => `<article class="project project--${(i % 3) + 1}" data-panel="${i}" ${i === 0 ? "" : "hidden"}>
        <div class="project__info">
          <span class="project__date">${p.date}</span>
          <h3 class="project__name">${p.name}</h3>
          <p class="project__desc">${p.desc}</p>
          <a class="project__link" href="${p.link}">VIEW PROJECT ↗</a>
          <div class="project__meta">
            <span class="project__folder">${p.tag}</span>
            <span class="project__folder">${p.count}</span>
          </div>
        </div>
        <div class="project__img">
          <span class="project__imgtag"><b>JPG</b> IMAGE.JPG</span>
        </div>
      </article>`
    )
    .join("");

  // tab switching
  tabsEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".folder__tab");
    if (!btn) return;
    const idx = btn.dataset.idx;
    $$(".folder__tab", tabsEl).forEach((b) => b.setAttribute("aria-selected", b === btn));
    $$("[data-panel]", bodyEl).forEach((p) => (p.hidden = p.dataset.panel !== idx));
  });
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

/* ---------- Follow cursor (the "YOU" label) ---------- */
function startCursor() {
  const cur = $(".cursor-you");
  if (!cur) return;
  window.addEventListener("mousemove", (e) => {
    cur.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
}

/* ---------- Nav active-tab on scroll ---------- */
function startScrollSpy() {
  const map = { home: "home", about: "about", work: "work", contact: "playground" };
  const sections = ["home", "about", "work", "contact"].map((id) => $("#" + id)).filter(Boolean);
  const tabs = $$(".tab");
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const key = map[en.target.id] || en.target.id;
        tabs.forEach((t) => t.classList.toggle("is-active", t.dataset.tab === key));
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => obs.observe(s));
}

document.addEventListener("DOMContentLoaded", () => {
  render();
  startClock();
  startCursor();
  startScrollSpy();
});
