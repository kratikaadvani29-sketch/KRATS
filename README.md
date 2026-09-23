# Canvas Portfolio

A single-page designer portfolio built on an interactive **design-canvas** layout
(grid background, live clock, floating collaborator cursors, selection handles,
sticky-note badges, folder-tab project cards, and a lightning-bolt contact banner).

Pure **HTML + CSS + vanilla JS** — no build step, no dependencies. Fonts load from
Google Fonts.

## Make it yours

Open **`js/main.js`** and edit the `SITE` object at the top. That single object
controls everything:

- `name`, `role`, `location`, `availability`
- `badgeCurrent` / `badgePrevious` — the sticky notes beside your name
- `headline` and `about` — wrap a word in `*asterisks*` to emphasize it
- `skills` — list of `{ label, icon }`
- `projects` — list of `{ tab, date, name, desc, link, tag, count }`
- `talk`, `openTo`, `email`, `socials`

No other file needs editing to change content.

## Run locally

It's fully static — open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Structure

```
index.html      # markup + section layout
css/styles.css  # all styling (canvas grid, sections, responsive)
js/main.js      # SITE content config + rendering, clock, cursor, scroll-spy
```

## Notes

- Photos/project images are CSS gradient placeholders. To use real images, add
  them under an `images/` folder and swap the relevant `background`/`<img>` in the
  markup or CSS.
- Layout is responsive down to phone width; decorative floating pieces hide on small screens.

## Bold-type home page (`landing.html`)

A separate page with its own intro animation: a full-screen portrait shrinks
into a tilted card, the name rises in letter by letter, and hovering a service
shows a project image inside the last name. It has a slide-in menu.

Edit the `SITE` object at the top of **`js/landing.js`** to change the name,
tagline, email, services, menu links, and socials. Set `portrait` and each
service's `image` to files under `images/` to replace the placeholders.
Styles live in `css/landing.css`.
