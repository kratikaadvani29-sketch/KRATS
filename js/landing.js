/* ============================================================
   landing.js — content + motion for landing.html
   Edit the SITE object to change what the page says.
   ============================================================ */

const SITE = {
  firstName: 'KRATIKA',
  lastName: 'ADVANI',
  logo: 'K–A',

  // The giant heading, split either side of the photo
  headingLeft: "HEY I'M",
  headingRight: 'KRATIKA',

  // Your photo for the centre card (shown in black & white).
  // portraitFocus is the crop inside the card: [x%, y%, zoom%]
  // portraitIntroY moves the photo up/down on the full-screen intro (higher % = face sits higher)
  portrait: 'images/portrait.jpg',
  portraitFocus: [52, 61, 200],
  portraitIntroY: 68,

  // Each entry is one line in the bottom-left block
  role: ['DIGITAL DESIGNER', 'BUILDING VISUAL SYSTEMS', 'FOR MODERN BRANDS'],
  location: 'LOCATION: YOUR CITY, COUNTRY',
  availability: 'AVAILABLE FOR FREELANCE:',
  email: 'HELLO@YOURDOMAIN.COM',

  // Hovering a service shows its image inside the last name.
  // `image` is optional: drop files into images/ and set e.g. 'images/work-1.jpg'.
  // Until then the gradient `fallback` is shown.
  services: [
    { label: 'ART DIRECTION',       image: '', fallback: 'linear-gradient(135deg,#e5402f 0 48%,#1f5fd6 48% 100%)' },
    { label: 'WEB DESIGN (UI/UX)',  image: '', fallback: 'linear-gradient(160deg,#f2e9d8 0%,#b9a27c 55%,#5a4a33 100%)' },
    { label: 'MOTION DESIGN',       image: '', fallback: 'linear-gradient(200deg,#2d7a4f 0%,#1d3b6e 60%,#f0b73c 100%)' },
    { label: 'WEBFLOW DEVELOPMENT', image: '', fallback: 'radial-gradient(circle at 30% 70%,#9fd4ff 0 18%,#2758c9 40%,#0b1a3d 80%)' },
  ],

  menu: [
    { label: 'HOME',       href: '#' },
    { label: 'ABOUT',      href: 'index.html#about' },
    { label: 'WORK',       href: 'index.html#work' },
    { label: "LET'S TALK", href: 'mailto:hello@yourdomain.com' },
  ],

  socials: [
    { name: 'X',         href: '#' },
    { name: 'Instagram', href: '#' },
    { name: 'LinkedIn',  href: '#' },
  ],
};

/* ---------------- helpers ---------------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const wait = (ms) => new Promise((res) => setTimeout(res, ms));
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const ICONS = {
  X: '<svg viewBox="0 0 24 24"><path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.3L5.3 21H2.2l7.2-8.3L2 3h6.4l4.4 5.8zm-1.1 16.2h1.7L7.4 4.7H5.6z"/></svg>',
  Instagram: '<svg viewBox="0 0 24 24"><path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm6-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM12 2c-2.7 0-3 0-4.1.1-3.7.2-5.6 2-5.8 5.8C2 9 2 9.3 2 12s0 3 .1 4.1c.2 3.7 2 5.6 5.8 5.8C9 22 9.3 22 12 22s3 0 4.1-.1c3.7-.2 5.6-2 5.8-5.8.1-1.1.1-1.4.1-4.1s0-3-.1-4.1c-.2-3.7-2-5.6-5.8-5.8C15 2 14.7 2 12 2zm0 1.8c2.7 0 3 0 4 .1 2.7.1 4 1.4 4.1 4.1.1 1 .1 1.3.1 4s0 3-.1 4c-.1 2.7-1.4 4-4.1 4.1-1 .1-1.3.1-4 .1s-3 0-4-.1c-2.7-.1-4-1.4-4.1-4.1-.1-1-.1-1.3-.1-4s0-3 .1-4C4 5.3 5.3 4 8 3.9c1-.1 1.3-.1 4-.1z"/></svg>',
  LinkedIn: '<svg viewBox="0 0 24 24"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.8h4V21H3zM9.5 9.8h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z"/></svg>',
};

/* ---------------- render content ---------------- */
function splitChars(el, text, baseDelay, step) {
  el.textContent = '';
  el.setAttribute('aria-label', text);
  [...text].forEach((ch, i) => {
    const mask = document.createElement('span');
    mask.className = 'lp-char';
    mask.setAttribute('aria-hidden', 'true');
    const inner = document.createElement('span');
    inner.textContent = ch === ' ' ? ' ' : ch;
    inner.style.setProperty('--d', `${baseDelay + i * step}ms`);
    mask.appendChild(inner);
    el.appendChild(mask);
  });
}

function render() {
  document.title = `${cap(SITE.firstName)} ${cap(SITE.lastName)} — Designer`;
  if (SITE.portrait) {
    const [x, y, zoom] = SITE.portraitFocus || [50, 50, 100];
    Object.assign($('.lp-portrait').style, {
      backgroundImage: `url('${SITE.portrait}')`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: `${zoom}% auto`,
    });
  }
  $('[data-logo]').innerHTML = `${SITE.logo}<sup>®</sup>`;

  splitChars($('[data-first]'), SITE.headingLeft, 0, 18);
  splitChars($('[data-last]'), SITE.headingRight, 200, 18);
  // Screen readers get the heading as one phrase
  $('[data-first]').setAttribute('aria-label', `${SITE.headingLeft} ${SITE.headingRight}`);
  $('[data-last]').setAttribute('aria-hidden', 'true');

  $('[data-role]').innerHTML = SITE.role
    .map((line) => `<span data-scramble>${line}</span>`)
    .join('<br />');
  $('[data-location]').textContent = SITE.location;
  const email = $('[data-email]');
  email.textContent = `${SITE.availability} ${SITE.email}`;
  email.href = `mailto:${SITE.email.toLowerCase()}`;

  $('[data-services]').innerHTML = SITE.services
    .map((s, i) => `<li data-service="${i}"><span data-scramble>${s.label}</span></li>`)
    .join('');

  $('[data-preview]').innerHTML = SITE.services
    .map((s) => {
      const bg = s.image ? `url('${s.image}') center / cover no-repeat, ${s.fallback}` : s.fallback;
      return `<span class="lp-preview__img" style="background:${bg}"></span>`;
    })
    .join('');

  $('[data-nav]').innerHTML = SITE.menu
    .map((m, i) => `<a href="${m.href}" style="--d:${120 + i * 70}ms"><span>${m.label}</span><small>0${i + 1}</small></a>`)
    .join('');

  $('[data-socials]').innerHTML = SITE.socials
    .map((s) => `<a href="${s.href}" aria-label="${s.name}" target="_blank" rel="noopener">${ICONS[s.name] || s.name[0]}</a>`)
    .join('');
  $('[data-copy]').textContent = `© ${new Date().getFullYear()} ${SITE.firstName} ${SITE.lastName}`;
}

function cap(w) { return w.charAt(0) + w.slice(1).toLowerCase(); }

/* ---------------- fit the giant name to the viewport ---------------- */
function fitName() {
  const first = $('[data-first]');
  const last = $('[data-last]');
  const slot = $('.lp-portrait-slot');
  const row = $('.lp-name-row');
  const W = row.clientWidth;
  const vh = window.innerHeight;

  // Measure both names at a known size
  first.style.fontSize = last.style.fontSize = '100px';
  const w1 = first.scrollWidth / 100;
  const w2 = last.scrollWidth / 100;

  if (window.innerWidth <= 760) {
    // Stacked: each name fills the width on its own line
    const fs = Math.min(W / Math.max(w1, w2), vh * 0.3);
    first.style.fontSize = last.style.fontSize = `${fs}px`;
    slot.style.removeProperty('--portrait');
    return;
  }

  // One row: [first] [portrait] [last]. The portrait scales with the type.
  const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
  const PORTRAIT = 0.95; // portrait width relative to font-size
  let fs = (W - gap * 2) / (w1 + w2 + PORTRAIT);
  fs = Math.min(fs, vh * 0.5, 420);
  first.style.fontSize = last.style.fontSize = `${fs}px`;
  // Spare width (short names) goes to the portrait, up to the template's 19vw
  const spare = W - gap * 2 - (w1 + w2) * fs;
  const portrait = Math.max(fs * PORTRAIT, Math.min(spare * 0.6, window.innerWidth * 0.19, fs * 1.1));
  slot.style.setProperty('--portrait', `${portrait}px`);
  $('[data-preview]').style.width = `${Math.max(64, fs * 0.38)}px`;
}

/* ---------------- text scramble ---------------- */
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+/<>';
function scramble(el, duration = 600) {
  const final = el.dataset.final || (el.dataset.final = el.textContent);
  if (reduceMotion) { el.textContent = final; return Promise.resolve(); }
  const start = performance.now();
  return new Promise((resolve) => {
    function frame(now) {
      const p = Math.min(1, (now - start) / duration);
      const revealed = Math.floor(p * final.length);
      let out = final.slice(0, revealed);
      for (let i = revealed; i < final.length; i++) {
        out += final[i] === ' ' ? ' ' : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      if (p < 1) requestAnimationFrame(frame);
      else { el.textContent = final; resolve(); }
    }
    requestAnimationFrame(frame);
  });
}

/* ---------------- intro sequence ---------------- */
function imageRatio(src) {
  if (!src) return Promise.resolve(1);
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img.naturalWidth / img.naturalHeight || 1);
    img.onerror = () => resolve(1);
    img.src = src;
  });
}

async function intro() {
  const body = document.body;
  const portrait = $('.lp-portrait');
  const slot = $('.lp-portrait-slot');

  if (reduceMotion) {
    portrait.classList.remove('is-intro');
    body.classList.add('names-in', 'info-in', 'show-header', 'notes-in');
    body.classList.remove('is-loading');
    return;
  }

  // Timeline (ms from page start), matched to the reference recording:
  //   0     photo fills the screen, still
  //   400   photo shrinks + tilts into its card (600ms)
  //   800   left word rises (whole word, ~250ms)
  //   1000  right word rises; photo has landed
  //   1650  bottom text scrambles in
  //   2100  logo + menu icon
  //   2400  hand-drawn notes
  const T = { shrink: 400, shrinkFor: 600, names: 800, info: 1650, header: 2100, notes: 2400 };
  const t0 = performance.now();
  const until = (ms) => wait(Math.max(0, ms - (performance.now() - t0)));

  // 1. Full-screen portrait (photo scaled to cover the screen)
  const [fx, fy, zoom] = SITE.portraitFocus || [50, 50, 100];
  const ratio = await imageRatio(SITE.portrait); // width / height
  const W = innerWidth, H = innerHeight;
  const startImgW = Math.max(W, H * ratio); // photo width that covers the screen
  const bgStart = { backgroundSize: `${startImgW}px auto`, backgroundPosition: `50% ${SITE.portraitIntroY ?? fy}%` };
  Object.assign(portrait.style, { top: '0px', left: '0px', width: `${W}px`, height: `${H}px` }, SITE.portrait ? bgStart : {});
  portrait.classList.add('is-intro');
  await until(T.shrink);

  // 2. Shrink + tilt into its slot. The photo is sized in px so it scales
  //    down together with the frame instead of zooming inside it.
  const r = slot.getBoundingClientRect();
  const tilt = getComputedStyle(document.documentElement).getPropertyValue('--tilt').trim() || '8deg';
  const bgEndPx = { backgroundSize: `${(zoom / 100) * r.width}px auto`, backgroundPosition: `${fx}% ${fy}%` };
  const bgEnd = { backgroundSize: `${zoom}% auto`, backgroundPosition: `${fx}% ${fy}%` };
  const anim = portrait.animate(
    [
      { top: '0px', left: '0px', width: `${W}px`, height: `${H}px`, borderRadius: '0px', transform: 'rotate(0deg)', ...(SITE.portrait ? bgStart : {}) },
      { top: `${r.top}px`, left: `${r.left}px`, width: `${r.width}px`, height: `${r.height}px`, borderRadius: '14px', transform: `rotate(${tilt})`, ...(SITE.portrait ? bgEndPx : {}) },
    ],
    { duration: T.shrinkFor, easing: 'cubic-bezier(.65,0,.35,1)', fill: 'forwards' }
  );

  // 3. Words rise while the portrait lands (right word is delayed via --d)
  await until(T.names);
  body.classList.add('names-in');
  await anim.finished;
  portrait.classList.remove('is-intro');
  ['top', 'left', 'width', 'height'].forEach((p) => portrait.style.removeProperty(p));
  if (SITE.portrait) Object.assign(portrait.style, bgEnd);
  anim.cancel();

  // 4. Bottom copy decodes in (both sides together), then header, then notes
  await until(T.info);
  body.classList.add('info-in');
  $$('.lp-info [data-scramble]').forEach((el, i) => setTimeout(() => scramble(el, 260), i * 15));
  await until(T.header);
  body.classList.add('show-header');
  await until(T.notes);
  body.classList.add('notes-in');
  body.classList.remove('is-loading');
}

/* ---------------- service hover → preview image ---------------- */
function bindServices() {
  const preview = $('[data-preview]');
  const imgs = $$('.lp-preview__img', preview);
  let current = -1;

  $$('[data-service]').forEach((li) => {
    const i = Number(li.dataset.service);
    li.addEventListener('mouseenter', () => {
      if (i === current) return;
      imgs.forEach((img) => img.classList.remove('is-leaving'));
      if (current > -1) {
        imgs[current].classList.remove('is-active');
        imgs[current].classList.add('is-leaving');
      }
      imgs[i].classList.add('is-active');
      current = i;
      preview.classList.add('is-on');
    });
  });

  $('[data-services]').addEventListener('mouseleave', () => {
    preview.classList.remove('is-on');
    setTimeout(() => {
      if (preview.classList.contains('is-on')) return;
      imgs.forEach((img) => img.classList.remove('is-active', 'is-leaving'));
      current = -1;
    }, 550);
  });
}

/* ---------------- menu ---------------- */
function bindMenu() {
  const body = document.body;
  const burger = $('.lp-burger');
  const menu = $('#lp-menu');

  const setOpen = (open) => {
    body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.setAttribute('aria-hidden', String(!open));
  };

  burger.addEventListener('click', () => setOpen(!body.classList.contains('menu-open')));
  $('[data-close]').addEventListener('click', () => setOpen(false));
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
}

/* ---------------- boot ---------------- */
render();
bindServices();
bindMenu();

(document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
  fitName();
  intro();
});

let resizeRaf;
window.addEventListener('resize', () => {
  cancelAnimationFrame(resizeRaf);
  resizeRaf = requestAnimationFrame(fitName);
});
